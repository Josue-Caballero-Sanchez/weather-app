async function getInfo(place){
    if(place === ""){
        return;
    }

    try{
        const url = "https://api.weatherapi.com/v1/current.json?key=4898db37fe76477fa74211558232212&q=" + place;
        const response = await fetch(url);

        if (!response.ok) {
            if (response.status === 400 || response.status === 404) {
                throw new Error('Bad Request: Invalid place');
              } 
              else {
                throw new Error('Network response was not ok');
              }
        }
    

        const info = await response.json();
        
        const city = info.location.name; 
        const region = info.location.region;
        const localTime = info.location.localtime;
        const split = localTime.split(" ");
        const date = split[0];
        const time = split[1];
        const temp = info.current.temp_f;
        const text = info.current.condition.text;
        const imageUrl = "https:" + info.current.condition.icon;
        const feelsLike = info.current.feelslike_f
        const humidity = info.current.humidity;
        const cloudCoverage = info.current.cloud;
        const windSpeed = info.current.wind_mph;
        const precipitation = info.current.precip_in;
        const pressure = info.current.pressure_in;

        printLocation(city, region);
        printDate(date);
        printTime(time);
        printDegrees(temp)
        printCondition(text);
        printImage(imageUrl);
        printFeelsLike(feelsLike);
        printHumidity(humidity);
        printCloud(cloudCoverage);
        printwind(windSpeed);
        printPrecipitation(precipitation);
        printPressure(pressure);

        console.log(feelsLike);
        console.log(temp);
        console.log(info);
    }
    catch(error){
        showErrorMessage();
    }
}


function showErrorMessage(){
    const errorMessage = document.querySelector(".error-message");
    errorMessage.style.display = "block";
}   

function clearErrorMessage(){
    const errorMessage = document.querySelector(".error-message");
    errorMessage.style.display = "none";
}

const main = (() =>{
    function searchCityEnter(e){
        if(e.keyCode === 13){
            clearErrorMessage();
            const searchBox = document.querySelector(".search-box");
            const place = searchBox.value;

            getInfo(place);
        }
    }

    function searchCityClick(){
        clearErrorMessage();
        const searchBox = document.querySelector(".search-box");
        const place = searchBox.value;

        getInfo(place);
    }

    const searchBox = document.querySelector(".search-box");
    const searchIcon = document.querySelector(".search-icon");

    searchBox.addEventListener("keypress", searchCityEnter);
    searchBox.addEventListener("input", filter);
    searchIcon.addEventListener("click", searchCityClick);


    getInfo("Glendale");
})();

function filter(e){
    let inputValue = e.target.value;
    let sanitizedValue = inputValue.replace(/[^a-zA-Z\s]/g, '');
    e.target.value = sanitizedValue;
}

function printLocation(city, region){
    const name = document.querySelector(".name");
    name.innerHTML = city + ", " + region;
}

function printDate(date){
    const dateBox = document.querySelector(".date");
    dateBox.innerHTML = date;
}

function printTime(time){
    const timeBox = document.querySelector(".time");
    timeBox.innerHTML = time;
}

function printDegrees(degrees){
    const degreesBox = document.querySelector(".temp");
    degreesBox.innerHTML = degrees + " &degF";
}

function printCondition(text){
    const conditionBox = document.querySelector(".condition");
    conditionBox.innerHTML = text;
}

function printImage(url){
    const image = document.querySelector(".condition-image");
    image.src = url;
}

function printFeelsLike(temp){
    const feelsLikeBox = document.querySelector(".feels-like");
    feelsLikeBox.innerHTML = temp + " &degF";
}

function printHumidity(humidity){
    const humidityBox = document.querySelector(".humidity");
    humidityBox.innerHTML = humidity + "%";
}

function printCloud(coverage){
    const cloudBox = document.querySelector(".cloud");
    cloudBox.innerHTML = coverage + "%";
}

function printwind(windSpeed){
    const windBox = document.querySelector(".wind");
    windBox.innerHTML = windSpeed + " mph";
}

function printPrecipitation(precipitation){
    const precipitationBox = document.querySelector(".precipitation");
    precipitationBox.innerHTML = precipitation;
}

function printPressure(pressure){
    const pressureBox = document.querySelector(".pressure");
    pressureBox.innerHTML = pressure;
}