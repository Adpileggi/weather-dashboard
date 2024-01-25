var citySearchEl = document.querySelector('#city-input')

var searchBtn = document.querySelector('#search-btn')



searchBtn.addEventListener('click', getSearchWeather);


function getSearchWeather(event) {
    var findCity = citySearchEl.value.trim();
    var makeUrl = 'api.openweathermap.org/data/2.5/forecast?q=' + findCity + '&appid=ac772410ddc838ce4708a6abf9efd783';
    console.log(makeUrl);
}