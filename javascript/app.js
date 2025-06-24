
let localTimezone = moment.tz.guess();
let localElement = document.querySelector("#local-time-zone");
localElement.innerHTML = `Your current time zone is ${localTimezone} and the current time is ${moment().format(
  "h:m A"
)}`;