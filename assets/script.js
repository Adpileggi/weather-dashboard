var citySearchEl = document.querySelector('#city-input');

var searchBtn = document.querySelector('#search-btn');

var HistoryBtnEl = document.querySelector('#search-history-btn');

var currentWeatherEl = document.querySelector('.current-weather-el');
var futureWeatherEl = document.querySelector('.future-weather-el');

var apiUrl;

displaySearchHistory()
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
        renderSearchHistory();
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
                console.log(data.list[i].dt_txt);

                var forcastDiv = document.createElement('div');
                forcastDiv.classList = 'forcast-card'
                var ul = document.createElement('ul')
                var forcastDate = document.createElement('li');
                forcastDate.textContent = (data.list[i].dt_txt);
                var forcastTemp = document.createElement('li');
                forcastTemp.textContent = ('Tempature: ' + data.list[i].main.temp);

                forcastDiv.appendChild(ul)

                ul.appendChild(forcastDate);
                
                ul.appendChild(forcastTemp);

                futureWeatherEl.appendChild(forcastDiv);

            };
        });

};

function renderSearchHistory() {
    var history = citySearchEl.value.trim();
     console.log(history)

    var lastSearch = JSON.parse(localStorage.getItem('searchHistory'))
    if (lastSearch === null) {
        lastSearch = [];
        lastSearch.push(history);
    } else {
        lastSearch.push(history);
    }

    localStorage.setItem('searchHistory', JSON.stringify(lastSearch));

    displaySearchHistory();
};

function displaySearchHistory() {
    var lastSearch = JSON.parse(localStorage.getItem('searchHistory'))

    for (var i = 0; i < lastSearch.length; i++) {
        var displaySearch = []
        displaySearch = lastSearch[i];

        var lastSearchBtn = document.createElement('button')
        lastSearchBtn.classList = 'history-btn'
        lastSearchBtn.textContent = displaySearch

        HistoryBtnEl.appendChild(lastSearchBtn);

    }
}