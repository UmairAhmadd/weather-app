const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const weatherCard = document.getElementById('weatherCard');
const placeholder = document.getElementById('placeholder');
const errorMessage = document.getElementById('errorMessage');

const API_KEY = '5115f2c72d8e767fc05a437772c18abd';
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

searchBtn.addEventListener('click', searchWeather);
cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchWeather();
    }
});

async function searchWeather() {
    const city = cityInput.value.trim();
    
    if (!city) {
        showError('Please enter a city name');
        return;
    }

    try {
        const response = await fetch(
            `${API_URL}?q=${city}&appid=${API_KEY}&units=metric`
        );

        if (!response.ok) {
            throw new Error('City not found');
        }

        const data = await response.json();

        displayWeather({
            city: `${data.name}, ${data.sys.country}`,
            temperature: Math.round(data.main.temp),
            description: data.weather[0].main,
            humidity: data.main.humidity,
            windSpeed: Math.round(data.wind.speed)
        });
    } catch (error) {
        showError('City not found. Please try again.');
        console.error('Error fetching weather:', error);
    }
}

function displayWeather(data) {
    document.getElementById('cityName').textContent = data.city;
    document.getElementById('temperature').textContent = `${data.temperature}°C`;
    document.getElementById('description').textContent = data.description;
    document.getElementById('humidity').textContent = `${data.humidity}%`;
    document.getElementById('windSpeed').textContent = `${data.windSpeed} km/h`;

    placeholder.style.display = 'none';
    weatherCard.classList.add('active');
    errorMessage.classList.remove('active');
}

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.add('active');
    weatherCard.classList.remove('active');
    placeholder.style.display = 'block';
}
