document.addEventListener("DOMContentLoaded", () => {

    const weatherForm = document.getElementById("weather-form");
    const cityInput = document.getElementById("city-input");

    const weatherResult = document.getElementById("weather-result");
    const currentCity = document.getElementById("current-city-name");
    const tempDisplay = document.getElementById("temp-display");
    const discDisplay = document.getElementById("disc-display");

    const API_KEY = "5f56d525d1619d0a2cd2eac4ce55588e";

    weatherForm.addEventListener("submit", (e)=>{
        e.preventDefault();

        const city = cityInput.value.trim()

        if(!city){
            return
        }

        FetchApiData(city)       

    })

    const FetchApiData = async (city) => {

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

        try {

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            const result = await response.json();

            console.log(result);

            currentCity.textContent = result.name;
            tempDisplay.textContent = `${Math.round(result.main.temp)}°C`;
            discDisplay.textContent = result.weather[0].description;

            weatherResult.style.display = "block";

        } catch (error) {

            console.error("Weather API Error:", error);

            currentCity.textContent = "City not found";
            tempDisplay.textContent = "";
            discDisplay.textContent = "";

        }
    };

});