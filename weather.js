function getWeather()
{
    const apiKey = 'a80edc4dbb9289a90283e639fd345c7e';
    const city = document.getElementById('input').value;    
    if(!city)
    {
        alert("please Enter Location");
        return; 
    }
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

    fetch(currentWeatherUrl)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            alert('Error fetching weather data. Please try again later.');
        });

    fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {
            displayHourlyForecast(data.list);
        })
        .catch(error => {
            console.error('There was a problem with the fetch Hourly Forecast Data:', error);
            alert('Error fetching Hourly Forecast Data. Please try again later.');
        });
}

function displayWeather(data) {
    const tempInfo = document.getElementById('temp');
    const weatherInfo = document.getElementById('weather');
    const weatherIcon = document.getElementById('icon');
    const hourForecast = document.getElementById('forecast');
    tempInfo.innerHTML = '';
    weatherInfo.innerHTML = '';
    hourForecast.innerHTML = '';
    if(data.cod === '404'){
        weatherInfo.innerHTML = `<p>${data.message}</p>`;
    }
    else{
        const cityName = data.name;
        const temperature = Math.round(data.main.temp - 273.15);
        const description = data.weather[0].description;
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

        const temperatureHTML = `<p>${temperature}°C</p>`;
        const weatherHTML = `<p>${cityName}</p><p>${description}</p>`;

        tempInfo.innerHTML = temperatureHTML;
        weatherInfo.innerHTML = weatherHTML;
        weatherIcon.src = iconUrl
        weatherIcon.alt = description;

        showImage();
    }
}

function displayHourlyForecast(hourlyData){
    const hourlyForecast =  document.getElementById('forecast');
    const next24Hours = hourlyData.slice(0, 8);

    next24Hours.forEach(item => {
        const dateTime = new Date(item.dt * 1000);
        const hour = dateTime.getHours();
        const temperature = Math.round(item.main.temp - 273.15);
        const iconCode = item.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

        const hourlyItemHTML = `
        <div class="hourly">
            <span>${hour}:00</span>
            <img src="${iconUrl}" alt="Hourly Weather Icon">
            <span>${temperature}°C</span>
        </div>`;

        hourlyForecast.innerHTML += hourlyItemHTML;
    });
}

function showImage(){
    const weatherIcon = document.getElementById('icon');
    weatherIcon.style.display = 'block';
}