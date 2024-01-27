var citySearchEl = document.querySelector('#city-input');

var searchBtn = document.querySelector('#search-btn');

var currentWeatherEl = document.querySelector('.current-weather-el');
var futureWeatherEl = document.querySelector('future-weather-el');

var apiUrl;

searchBtn.addEventListener('click', getSearchHandler);

function getSearchHandler(event) {
    // find a way to remove all spaces?
    var findCity = citySearchEl.value.trim();
    apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + findCity + '&appid=ac772410ddc838ce4708a6abf9efd783&units=imperial';
    console.log(apiUrl);

    getCurrentWeather();
};

function getCurrentWeather() {
    fetch(apiUrl)
        .then(function(responce){
            return responce.json();
        })
        .then(function (data) {
            console.log(data);

            var h2 = document.createElement('h2') 
            h2.textContent = (citySearchEl.value.trim() + ' -- ' + data.list[0].dt_txt)
            var p = document.createElement('p')
            p.textContent = ('Tempature: ' + data.list[0].main.temp)
           
            h2.appendChild(p)

            currentWeatherEl.appendChild(h2)

        })
        getForcastWeather();
};

function getForcastWeather() {
    fetch(apiUrl)
        .then(function(responce){
            return responce.json();
        })
        .then(function (data) {
            // use loop for future weather
            for (var i = 7; i < data.list.length; i+=8) {
                console.log(data.list[i].main.temp);
                console.log(data.list[i].dt_txt)
            };
        });

};
