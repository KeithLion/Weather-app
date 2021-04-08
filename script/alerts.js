function formatDate(timestamp) {
  let date = new Date(timestamp);
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    `Monday`,
    `Tuesday`,
    `Wednesday`,
    `Thursday`,
    `Friday`,
    `Saturday`,
    `Sunday`
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function cityInput(bar) {
  bar.preventDefault();
  console.log(bar.data);
  let input = document.querySelector("#city-input");
  let h3 = document.querySelector("h3");
  h3.innerHTML = `${input.value}`;
  let apiKey = "0c9f5772c0f4bd1cd99a1c942c3d0c32";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(getWeather);
}
let form = document.querySelector("form");
form.addEventListener("submit", cityInput);

function getWeather(output) {
  console.log(output.data);
  let currentTemp = Math.round(output.data.main.temp);
  let temperature = document.querySelector(".temp");
  temperature.innerHTML = `${currentTemp}°`;
  let decsription = document.querySelector(".descrip");
  decsription.innerHTML = output.data.weather[0].description;
  let humid = document.querySelector(".humidity");
  humid.innerHTML = output.data.main.humidity;
  let windSpeed = document.querySelector(".wind");
  windSpeed.innerHTML = Math.round(output.data.wind.speed);
  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatDate(output.data.dt * 1000);
    let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${output.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", output.data.weather[0].description);
}
}
