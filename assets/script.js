var citySearchEl = document.querySelector('#city-imput')

var searchBtn = document.querySelector('#search-btn')
var startUrl = 'api.openweathermap.org/data/2.5/forecast?'
var apiKey = 'ac772410ddc838ce4708a6abf9efd783'


searchBtn.addEventListener('click', getWeather);

function getWeather(event) {
    event.preventDefault();
    
    var findCity = citySearchEl.value.trim();
    var makeUrl = 'api.openweathermap.org/data/2.5/forecast?q=' + findCity + '&appid=ac772410ddc838ce4708a6abf9efd783';
    console.log(makeUrl);
}