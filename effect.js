"use strict";
// get input element

const searchInput = document.querySelector(".searchBtn");
const suggestionCon = document.querySelector(".suggestionList");
const displayField = document.querySelector(".displayField");

// Event handlers
searchInput.addEventListener("change", displayMatches);
searchInput.addEventListener("keyup", displayMatches);

// get API
const citiesStates = [];

// api "https://gist.githubusercontent.com/Zion44719/3cab67fd551c3ac80e88826cf3d1d933/raw/d8a4656ef4edffe913d7623bce3c234fdfb00805/Cities_database.json"

async function fetchAPi() {
  const res = await fetch("Cities_database.json");
  const data = await res.json();
  citiesStates.push(...data);
}

// To find match word typed
function findMatches(wordToMatch, citiesStates) {
  return citiesStates.filter((searchName) => {
    const regX = new RegExp(wordToMatch, "gi");
    return searchName.city.match(regX) || searchName.admin_name.match(regX);
  });
}

// Display Matches Function
function displayMatches() {
  const findArray = findMatches(this.value, citiesStates);

  const matchEl = findArray
    .map((place) => {
      const regX = new RegExp(this.value, "gi");
      const cityName = place.city.replace(
        regX,
        `<span class="highlight">${this.value}</span>`
      );

      const stateName = place.admin_name.replace(
        regX,
        `<span class="highlight">${this.value}</span>`
      );
      return `<li class="name" onclick="displayCityInfo(this)" id="${place.city}">${cityName}, ${stateName}</li>`;
    })
    .join("");
  suggestionCon.innerHTML = matchEl;
}

// Display The Selected State or City
function displayCityInfo(cityField) {
  let city = cityField.id;
  const place = citiesStates.find((place) => place.city === city);
  displayField.innerHTML = `
  <ul>
  <h2>Details</h2>
  <li><b>Country:</b> ${place.country}</li>
  <li><b>State:</b> ${place.admin_name}</li>
  <li><b>City:</b> ${place.city}</li>
  <li><b>Latitude:</b> ${place.lat}</li>
  <li><b>Longitude:</b> ${place.lng}</li>
  <li><b>Population:</b> ${place.population}</li>
  </ul>
  `;
  console.log(place);
}

fetchAPi();
