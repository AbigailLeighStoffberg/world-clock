
// Local Data Display

function updateLocalCity() {
let localTimezone = moment.tz.guess();
let localLocationElement = document.querySelector("#local-city");
let localTimeElement = document.querySelector("#local-time");
let localDateElement = document.querySelector("#local-date");

localLocationElement.innerHTML = `${localTimezone}`;
localTimeElement.innerHTML = `${moment().format("h:mm:ss A")}`;
localDateElement.innerHTML = `${moment().format("MMMM Do YYYY")}`;
}

// Selected City Data Display

function updateSelectedCity(cityTimeZone) {
    let selectElement = document.querySelector("#city");
    cityTimeZone = selectElement.value;

    let container = document.querySelector(".selected-city-data-container");

    if (cityTimeZone === "Select a City" || cityTimeZone === "") {
        container.classList.add("no-selection");
    } else {
        container.classList.remove("no-selection");
    }

    if (!container.classList.contains("no-selection")) {
      let cityName = cityTimeZone.replace("_", " ").split("/")[1];
      let cityTime = moment().tz(cityTimeZone);

      let cityLocationElement = document.querySelector("#selected-city-name");
      let cityTimeElement = document.querySelector("#selected-city-time");
      let cityDateElement = document.querySelector("#selected-city-date");

      cityLocationElement.innerHTML = cityName;
      cityTimeElement.innerHTML = cityTime.format("h:mm:ss A");
      cityDateElement.innerHTML = cityTime.format("MMMM Do YYYY");
    }
}

let citiesSelectElement = document.querySelector("#city");
citiesSelectElement.addEventListener("change", (event) => {
  updateSelectedCity(event.target.value);
});

updateSelectedCity();
setInterval(() => {
  updateSelectedCity();
}, 1000);

updateLocalCity();
setInterval(() => {
  updateLocalCity();
}, 1000);

// Fact Display

// Passport MiniGame
