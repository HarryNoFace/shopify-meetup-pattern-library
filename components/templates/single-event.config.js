"use strict";

const faker = require("faker");
const eventsCount = 3;
const events = [];

for (var i = 0; i < eventsCount; i++) {
	events.push({
		contentTitle: "Shopify " + faker.address.city()
	});
}

module.exports = {
	context: {
		eventsData: events,
		heroTitle: "Shopify Meetups",
		updateTitle: "Shopify Dropshipping: A complete guide"
	}
};
