var citySearchEl = document.querySelector('#city-input')

var searchBtn = document.querySelector('#search-btn')

var apiUrl;

searchBtn.addEventListener('click', getSearchHandler);

function getSearchHandler(event) {
    // find a way to remove all spaces?
    var findCity = citySearchEl.value.trim();
    apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + findCity + '&appid=ac772410ddc838ce4708a6abf9efd783&units=imperial';
    console.log(apiUrl);

    getWeather();
};

function getWeather() {
    fetch(apiUrl)
        .then(function(responce){
            return responce.json();
        })
        .then(function (data) {
            console.log(data);
            for (var i = 0; i < data.list.length; i+=7){
                console.log(data.list[i].main.temp);
            }
        });
};