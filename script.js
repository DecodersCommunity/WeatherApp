const apiKey = "16e36321361746ed257d94b46b97895e";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";
const search = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const weather = document.querySelector(".weather");
const dets = document.querySelector(".details");
let flag=0;
async function check(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`); // Added "&" before "appid"
    const data = await response.json();
    if(data.name==undefined)
    {    
    document.querySelector(".city").innerHTML = "Please enter a valid city!";
    document.querySelector(".temp").innerHTML = "-" + "°C";
    document.querySelector(".humidity").innerHTML = "-" + "%";
    document.querySelector(".wind").innerHTML = "-"+ "Km/h";
    flag=1;
    
    }
    else{
    console.log(data);
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + "Km/h";
    }
    if(flag==0){
    if (data.weather[0].main == "Clouds") {
        weatherIcon.src = "./Images/clouds.png";
    } else if (data.weather[0].main == "Clear") {
        weatherIcon.src = "./Images/clear.png";
    } else if (data.weather[0].main == "Mist") {
        weatherIcon.src = "./Images/mist.png";
    } else if (data.weather[0].main == "Rain") {
        weatherIcon.src = "./Images/rain.png";
    } else if (data.weather[0].main == "Drizzle") {
        weatherIcon.src = "./Images/drizzle.png";
    } else if (data.weather[0].main == "Snow") {
        weatherIcon.src = "./Images/snow.png";
    }}
    weather.style.display = "block";
    dets.style.display = "flex";
    
    search.value = data.name;
    if(flag==1){
        weatherIcon.src = "";
        search.value = "";
    }
    flag=0;

}

searchBtn.addEventListener("click", () => {
    check(search.value);
});

search.addEventListener("keydown", (event) => {
    if (event.keyCode === 13) {
        check(search.value);
    }
});