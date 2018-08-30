"use strict";

const faker = require("faker");
const eventsCount = 6;
const events = [];

for (var i = 0; i < eventsCount; i++) {
	events.push({
		contentTitle: "Shopify " + faker.address.city()
	});
}

module.exports = {
	context: {
		eventsData: events,
		heroTitle: "Meetups",
		updateTitle: "Shopify Dropshipping: A complete guide"
	}
};
