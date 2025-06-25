
function updateLocalCity() {
let localTimezone = moment.tz.guess();
let localLocationElement = document.querySelector("#local-city");
let localTimeElement = document.querySelector("#local-time");
let localDateElement = document.querySelector("#local-date");

localLocationElement.innerHTML = `${localTimezone}`;
localTimeElement.innerHTML = `${moment().format("h:mm:ss A")}`;
localDateElement.innerHTML = `${moment().format("MMMM Do YYYY")}`;
}

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

      if (cityTimeZone && !collectedStamps.has(cityTimeZone)) {
            collectedStamps.add(cityTimeZone);
            
            localStorage.setItem("collectedStamps", JSON.stringify(Array.from(collectedStamps)));
            updatePassportProgress();
            displayCollectedStamps();
        }
    }
}

let citiesSelectElement = document.querySelector("#city");
citiesSelectElement.addEventListener("change", (event) => {
  updateSelectedCity(event.target.value);
});

document.querySelector("#scroll-arrow-left").addEventListener("click", () => {
    if (currentStampDisplayIndex > 0) {
        currentStampDisplayIndex--;
        displayCollectedStamps();
    }
});

document.querySelector("#scroll-arrow-right").addEventListener("click", () => {
    if (currentStampDisplayIndex + stampsPerPage < collectedStamps.size) {
        currentStampDisplayIndex++;
        displayCollectedStamps();
    }
});


let collectedStamps = new Set();
const totalStamps = 24;

let currentStampDisplayIndex = 0;
const stampsPerPage = 3;

const stampImages = {
    "Pacific/Honolulu": "honolulu.png",
    "America/Anchorage": "anchorage.png",
    "America/Los_Angeles": "los-angeles.png",
    "America/Mexico_City": "mexico.png",
    "America/New_York": "new-york-city.png",
    "America/Bogota": "bogota.png",
    "America/La_Paz": "la-paz.png",
    "America/Sao_Paulo": "sao-paulo.png",
    "Atlantic/Azores": "azores.png",
    "Atlantic/Reykjavik": "reykjavik.png",
    "Europe/London": "london.png",
    "Europe/Paris": "paris.png",
    "Europe/Athens": "athens.png",
    "Europe/Moscow": "moscow.png",
    "Africa/Cairo": "cairo.png",
    "Africa/Johannesburg": "johannesburg.png",
    "Africa/Nairobi": "nairobi.png",
    "Asia/Dubai": "dubai.png",
    "Asia/Kolkata": "delhi.png",
    "Asia/Shanghai": "beijing.png",
    "Asia/Tokyo": "tokyo.png",
    "Australia/Sydney": "sydney.png",
    "Pacific/Auckland": "auckland.png",
    "America/Nassau": "nassau.png",
    "default": "stamp-face-image.png"
};

function updatePassportProgress() {
    let progressAmountElement = document.querySelector("#progress-amount");
    let progressBarFillElement = document.querySelector("#progress-fill");
    let passportContainer = document.querySelector(".passport-container");

    let currentStamps = collectedStamps.size;
    progressAmountElement.innerHTML = `${String(currentStamps).padStart(2, '0')}/${String(totalStamps).padStart(2, '0')}`;

    let percentage = (currentStamps / totalStamps) * 100;
    progressBarFillElement.style.width = `${percentage}%`;
    progressBarFillElement.style.transition = "width 0.5s ease-in-out";

    // --- Logic for showing/hiding celebration overlay ---
    if (currentStamps === totalStamps) {
        celebrationOverlay.classList.add("active"); // Show the overlay
        // Hide the regular passport content when the overlay is active
        document.querySelector(".passport-game-intro").style.display = "none";
        document.querySelector(".stamp-collection").style.display = "none";
        document.querySelector(".progress-container").style.display = "none";
    } else {
        celebrationOverlay.classList.remove("active"); // Hide the overlay
        // Make sure the regular passport content is visible when the overlay is not active
        document.querySelector(".passport-game-intro").style.display = ""; // Reset to default
        document.querySelector(".stamp-collection").style.display = "";
        document.querySelector(".progress-container").style.display = "";
    }
}

function displayCollectedStamps() {
    let stampCollectionContainer = document.querySelector(".stamp-collection");
    let scrollArrowLeft = document.querySelector("#scroll-arrow-left");
    let scrollArrowRight = document.querySelector("#scroll-arrow-right");

    let dynamicStamps = stampCollectionContainer.querySelectorAll(".stamp:not(#scroll-arrow-left):not(#scroll-arrow-right)");
    dynamicStamps.forEach(stamp => stamp.remove());

    let collectedCityArray = Array.from(collectedStamps).sort();

    if (!stampCollectionContainer.contains(scrollArrowLeft)) {
        stampCollectionContainer.prepend(scrollArrowLeft);
    }
    if (!stampCollectionContainer.contains(scrollArrowRight)) {
        stampCollectionContainer.appendChild(scrollArrowRight);
    }

    for (let i = 0; i < stampsPerPage; i++) {
        let stampIndex = currentStampDisplayIndex + i;
        let img = document.createElement("img");
        img.classList.add("stamp");

        if (stampIndex < collectedCityArray.length) {
            let cityTimeZone = collectedCityArray[stampIndex];
            let stampFileName = stampImages[cityTimeZone] || stampImages["default"];
            img.src = `./images/${stampFileName}`;
            img.alt = `${cityTimeZone} Stamp`;
        } else {
            img.src = `./images/${stampImages["default"]}`;
            img.alt = "Empty Stamp Slot";
        }
        stampCollectionContainer.insertBefore(img, scrollArrowRight);
    }

    scrollArrowLeft.style.visibility = (currentStampDisplayIndex > 0) ? "visible" : "hidden";
    scrollArrowRight.style.visibility = (currentStampDisplayIndex + stampsPerPage < collectedCityArray.length) ? "visible" : "hidden";
}

function loadPassportProgress() {
    let savedStamps = localStorage.getItem("collectedStamps");
    if (savedStamps) {
        collectedStamps = new Set(JSON.parse(savedStamps));
    }
    updatePassportProgress();
    displayCollectedStamps();
}

document.addEventListener("DOMContentLoaded", function() {
    let closeCelebrationButton = document.querySelector("#closeCelebration");
    let passportGameIntro = document.querySelector(".passport-game-intro");
    let stampCollection = document.querySelector(".stamp-collection");
    let progressContainer = document.querySelector(".progress-container");

    if (closeCelebrationButton && celebrationOverlay) {
        closeCelebrationButton.addEventListener("click", () => {
            celebrationOverlay.classList.remove("active");

            passportGameIntro.style.display = "";
            stampCollection.style.display = "";
            progressContainer.style.display = "";
        });
    }

    loadPassportProgress();
    updateLocalCity();
    updateSelectedCity();

    setInterval(updateLocalCity, 1000);
    setInterval(updateSelectedCity, 1000);
});