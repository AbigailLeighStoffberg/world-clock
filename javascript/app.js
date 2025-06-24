
// Local Data Display

let localTimezone = moment.tz.guess();
let localLocationElement = document.querySelector("#local-city");
let localTimeElement = document.querySelector("#local-time");
let localDateElement = document.querySelector("#local-date");

localLocationElement.innerHTML = `${localTimezone}`;
localTimeElement.innerHTML = `${moment().format("h:m A")}`;
localDateElement.innerHTML = `${moment().format("MMMM Do YYYY")}`;

// Selected City Data Display

let selectedLocationElement = document.querySelector("#selected-city-name");
let selectedTimeElement = document.querySelector("#selected-city-time");
let selectedDateElement = document.querySelector("#selected-city-date");

selectedLocationElement.innerHTML = `${Timezone}`;
selectedTimeElement.innerHTML = `${moment().format("h:m A")}`;
selectedDateElement.innerHTML = `${moment().format("MMMM Do YYYY")}`;

// Fact Display

// Passport MiniGame

