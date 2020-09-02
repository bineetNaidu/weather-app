const APIKEY = ____YOUR___API___KEY____;

const form = document.querySelector("#form");
const title = document.querySelector("#title");
const grid = document.querySelector("#grid");
const select = document.getElementById("select");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  // http://openweathermap.org/img/wn/10d@2x.png
  const query = e.target[0].value;
  let days = select.value;
  if (days === "0") {
    alert("Please enter the number of days");
    return;
  }
  const { cod, list, city } = await getWeather(query, days);
  const { name, country, population, timezome, sunrise, sunset } = city;
  addHTML(name, country, list);
});
async function getWeather(cityName, days) {
  const URL = `http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=celcius&cnt=${days}&APPID=${APIKEY}`;
  const res = await axios.get(URL);
  const data = res.data;
  return data;
}

function addHTML(name, country, list) {
  title.textContent = `${name}, ${country}`;
  const html = list
    .map((l) => {
      return `
<div class="max-w-sm rounded overflow-hidden shadow-lg text-center bg-green-600">
      <div class="px-6 py-4 text-center">
        <div class="font-bold text-xl mb-2 m-auto">
          <img
            class="m-auto"
            src=" http://openweathermap.org/img/wn/${l.weather[0].icon}.png"
            alt="Sunset in the mountains"
          />
        </div>
        <p class="text-white text-base text-2xl">
          ${l.weather[0].description}
        </p>
        <div class="px-6 pt-4 pb-2">
          <span
            class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
            >#MAX- ${l.main.temp}</span
          >
          <span
            class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
            >#MIN- ${l.main.temp_min}</span
          >
          <span
            class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
            >#PRESURE- ${l.main.temp_max}</span
          >
          <span
            class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
            >#HUMIDITY- ${l.main.humidity}</span
          >
        </div>
      </div>
    </div>
    `;
    })
    .join("");
  grid.innerHTML = html;
}
