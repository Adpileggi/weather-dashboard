var citySearchEl = document.querySelector('#city-input');

var searchBtn = document.querySelector('#search-btn');

var HistoryBtnEl = document.querySelector('#search-history-btn');


var currentWeatherEl = document.querySelector('#current-weather-el');
var futureWeatherEl = document.querySelector('#future-weather-el');


var apiUrl;
var currentCity;

// event listiner for search button
searchBtn.addEventListener('click', getSearchHandler);

// creates weather api from search value
function getSearchHandler(event) {
    var findCity = citySearchEl.value.trim();
    apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + findCity + '&appid=ac772410ddc838ce4708a6abf9efd783&units=imperial';
    console.log(apiUrl);

    getCurrentWeather();
};

// calls information from api
function getCurrentWeather() {
    fetch(apiUrl)
        .then(function(responce){
            // Display error if api call does not suceed
                if (responce.status > 399){
                alert('Error: ' + responce.statusText)
                return;
            }
            return responce.json();
        })
        .then(function (data) {
        
            console.log(data);
            // clear any existing html
            currentWeatherEl.innerHTML = "";

            // append weather data to html
            var divCard = document.createElement('div');
            divCard.classList = 'card'

            var currentWeatherDiv = document.createElement('div');
            currentWeatherDiv.classList = 'card-body'

            var currentIcon = document.createElement('img')
            currentIcon.classList ='card-title'
            currentIcon.setAttribute('src', 'https://openweathermap.org/img/wn/' + data.list[0].weather[0].icon + '.png');
            currentIcon.setAttribute('height', '50px')
            currentIcon.setAttribute('width', '50px')

            var h2 = document.createElement('h2')
            h2.classList ='card-title' 
            h2.textContent = (data.city.name + ' -- ' + dayjs(data.list[0].dt_txt).format('MMM-D'));
            
            var pTemp = document.createElement('p')
            pTemp.classList= 'card-text'
            pTemp.textContent = ('Tempature: ' + data.list[0].main.temp)

            var pHumidity = document.createElement('p')
            pHumidity.classList= 'card-text'
            pHumidity.textContent = ('Humidity: ' + data.list[0].main.humidity)

            var pWind = document.createElement('p')
            pWind.classList= 'card-text'
            pWind.textContent = ('Windspeed: ' + data.list[0].wind.speed)
           
            currentWeatherDiv.append(currentIcon, h2, pTemp, pHumidity, pWind)

            divCard.appendChild(currentWeatherDiv)

            currentWeatherEl.appendChild(divCard)

        })
        getForcastWeather();
        renderSearchHistory();
        
};

// use api to create 5 day forcast
function getForcastWeather() {
    fetch(apiUrl)
        // Display error if api call does not suceed
        .then(function(responce){
            if (responce.status > 399){
                alert('Error: ' + responce.statusText)
                return;
            }
            return responce.json();
        })
        .then(function (data) {
            // clear any existing html
            futureWeatherEl.innerHTML = '';
            // use loop for future weather and append to html
            for (var i = 7; i < data.list.length; i+=8) {
                console.log(data.list[i].main.temp);
                console.log(data.list[i].dt_txt);

                // append new html elements
                var divCard = document.createElement('div');
                divCard.classList = 'card'

                var forcastDiv = document.createElement('div');
                forcastDiv.classList = 'card-body'

                var forcastIcon = document.createElement('img')
                forcastIcon.classList = "card-title"
                forcastIcon.setAttribute('src', 'https://openweathermap.org/img/wn/' + data.list[i].weather[0].icon + '.png');
                forcastIcon.setAttribute('height', '50px')
                forcastIcon.setAttribute('width', '50px')

                forcastIcon.textContent = data.list[i].weather.icon
                                
                var forcastDate = document.createElement('h3');
                forcastDate.classList= 'card-title'
                forcastDate.textContent = dayjs(data.list[i].dt_txt).format('MMM-D');
                
                var forcastTemp = document.createElement('p');
                forcastTemp.classList= 'card-text'
                forcastTemp.textContent = ('Tempature: ' + data.list[i].main.temp);

                var forcastHumidity = document.createElement('p')
                forcastHumidity.textContent = ('Humidity: ' + data.list[i].main.humidity)

                var forcastWind = document.createElement('p')
                forcastWind.textContent = ('Windspeed: ' + data.list[i].wind.speed)

                forcastDiv.append(forcastIcon, forcastDate, forcastTemp, forcastHumidity, forcastWind);

                divCard.appendChild(forcastDiv);

                futureWeatherEl.appendChild(divCard);

            };
        });

};

function renderSearchHistory(data) {
    // render items into local storage
        var history = citySearchEl.value.trim()
        console.log(history)
    // make lastsearch an array, check to see that all values are unique, then add to the array
        var lastSearch = JSON.parse(localStorage.getItem('searchHistory'))
        if (lastSearch === null) {
            lastSearch = [];
        } else if (history === '' || lastSearch.includes(history)) { 
            console.log()
        }
        else {
            lastSearch.push(history);
        }

        localStorage.setItem('searchHistory', JSON.stringify(lastSearch));

        displaySearchHistory();
    }

function displaySearchHistory() {
    var lastSearch = JSON.parse(localStorage.getItem('searchHistory'))
    HistoryBtnEl.innerHTML = '';
    // if the last seach array is empty do not contiune to run the function
    if (lastSearch === null) {
        return;
    }

    for (var i = 0; i < lastSearch.length; i++) {
        var displaySearch = []
        displaySearch = lastSearch[i];

// append previous searchs as buttons to hml
        var lastSearchBtn = document.createElement('button')
        lastSearchBtn.classList = 'history-btn btn btn-secondary'
        lastSearchBtn.textContent = displaySearch

        HistoryBtnEl.appendChild(lastSearchBtn);

    }
}

// event listiner for when a history button is clicked
function historySearch(event) { 
    var getCity = event.target.textContent
        apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + getCity + '&appid=ac772410ddc838ce4708a6abf9efd783&units=imperial';
        console.log(apiUrl);
    
        getCurrentWeather();
};

// event listener for history buttons
HistoryBtnEl.addEventListener('click', historySearch);
console.log(HistoryBtnEl);
// display information from local storage upon loading
displaySearchHistory();