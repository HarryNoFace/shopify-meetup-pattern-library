"use strict";

const gulp = require("gulp");
const fractal = require("./fractal.js");
const logger = fractal.cli.console;
const sass = require("gulp-sass");
const sassGlob = require("gulp-sass-glob");
const plumber = require("gulp-plumber");
const notify = require("gulp-notify");
const cleanCSS = require("gulp-clean-css");
const autoprefixer = require("gulp-autoprefixer");
const concat = require("gulp-concat");
const path = require("path");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");

gulp.task("sass", function() {
	return gulp
		.src("dev/scss/**/*.scss")
		.pipe(customPlumber("Error running Sass"))
		.pipe(sassGlob())
		.pipe(sass())
		.pipe(autoprefixer({ browsers: ["last 2 versions"], cascade: false }))
		.pipe(
			cleanCSS({ debug: true }, details => {
				console.log(`${details.name}: ${details.stats.originalSize}`);
				console.log(`${details.name}: ${details.stats.minifiedSize}`);
			})
		)
		.pipe(gulp.dest("public/css"));
});

gulp.task("watch", ["sass"], function() {
	gulp.watch(["components/**/*.scss", "dev/scss/**/*.scss"], ["sass"]);
});

function customPlumber(errTitle) {
	return plumber({
		errorHandler: notify.onError({
			title: errTitle || "Error running Gulp",
			message: "Error: <%= error.message %>"
		})
	});
}

gulp.task("fractal:start", function() {
	const server = fractal.web.server({
		sync: true
	});
	server.on("error", err => logger.error(err.message));
	return server.start().then(() => {
		logger.success(`Fractal server is now running at ${server.url}`);
	});
});

gulp.task("default", ["fractal:start", "sass", "watch"]);
