
// Local Data Display
let localTimezone = moment.tz.guess();
let localLocationElement = document.querySelector("#local-city");
let localTimeElement = document.querySelector("#local-time");
let localDateElement = document.querySelector("#local-date");

localLocationElement.innerHTML = `${localTimezone}`;
localTimeElement.innerHTML = `${moment().format("h:m A")}`;
localDateElement.innerHTML = `${moment().format("MMMM Do YYYY")}`;

// Selected City Data Display

function updateCity(cityTimeZone) {
    let selectElement = document.querySelector("#city");
    cityTimeZone = selectElement.value;
  
    let cityName = cityTimeZone.replace("_", " ").split("/")[1];
    let cityTime = moment().tz(cityTimeZone);

    let cityLocationElement = document.querySelector("#selected-city-name");
    let cityTimeElement = document.querySelector("#selected-city-time");
    let cityDateElement = document.querySelector("#selected-city-date");

    cityLocationElement.innerHTML = cityName;
    cityTimeElement.innerHTML = cityTime.format("h:mm:ss A");
    cityDateElement.innerHTML = cityTime.format("MMMM Do YYYY");
}

let citiesSelectElement = document.querySelector("#city");
citiesSelectElement.addEventListener("change", (event) => {
  updateCity(event.target.value);
});

updateCity();
setInterval(() => {
  updateCity();
}, 1000);

// Fact Display

// Passport MiniGame
