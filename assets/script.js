var citySearchEl = document.querySelector('#city-input');

var searchBtn = document.querySelector('#search-btn');

var HistoryBtnEl = document.querySelector('#search-history-btn');
var historyBtn = document.querySelector('.history-btn')

var currentWeatherEl = document.querySelector('#current-weather-el');
var futureWeatherEl = document.querySelector('#future-weather-el');

var apiUrl;
var currentCity;

// displaySearchHistory()
searchBtn.addEventListener('click', getSearchHandler);
// historyBtn.addEventListener('click', getSearchHandler);

function getSearchHandler(event) {
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
            
            // currentCity = data.city.name
            var h2 = document.createElement('h2') 
            h2.textContent = (data.city.name + ' -- ' + dayjs(data.list[0].dt_txt).format('MMM-D'));
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

                var divCard = document.createElement('div');
                divCard.classList = 'card'

                var forcastDiv = document.createElement('div');
                forcastDiv.classList = 'card-body'
                                
                var forcastDate = document.createElement('h2');
                forcastDate.classList= 'card-title'
                forcastDate.textContent = dayjs(data.list[i].dt_txt).format('MMM-D');
                
                var forcastTemp = document.createElement('p');
                forcastTemp.classList= 'card-text'
                forcastTemp.textContent = ('Tempature: ' + data.list[i].main.temp);

                forcastDiv.appendChild(forcastDate);
                
                forcastDiv.appendChild(forcastTemp);

                divCard.appendChild(forcastDiv);

                futureWeatherEl.appendChild(divCard);

            };
        });

};

function renderSearchHistory(data) {
    
        var history = citySearchEl.value.trim()
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
    }

function displaySearchHistory() {
    var lastSearch = JSON.parse(localStorage.getItem('searchHistory'))

    for (var i = 0; i < lastSearch.length; i++) {
        var displaySearch = []
        displaySearch = lastSearch[i];

        var lastSearchBtn = document.createElement('button')
        lastSearchBtn.classList = 'history-btn btn btn-secondary'
        lastSearchBtn.textContent = displaySearch

        HistoryBtnEl.appendChild(lastSearchBtn);

    }
}