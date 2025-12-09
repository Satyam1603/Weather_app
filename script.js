// api.openweathermap.org/data/2.5/weather?q={city name}&appid={your api key}

const weatherApi = {
    key: "bab281d79e5f1e9755a68d754cc313e7",
    baseUrl: "https://api.openweathermap.org/data/2.5/weather", 
}
const cityApi = {
    key: "zHxmc-pEj4xoReqUJPvatW8D2mEZjaGRh67QlDdJg7Q",
    baseUrl : "https://api.unsplash.com/search/photos"
}

const searchInputBox = document.getElementById('input-box');

// Event Listener Function on keypress
searchInputBox.addEventListener('keypress', (event) => {
    
    if(event.keyCode == 13) {
        console.log(searchInputBox.value);
        getWeatherReport(searchInputBox.value);
        document.querySelector('.weather-body').style.display = "block";
    }

});

// Get Weather Report
function getWeatherReport(city) {
    fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`)
    .then(weather => {
        return weather.json();
    }).then(showWeatherReport);
}
// Function to fetch a single Unsplash image based on a query
async function fetchUnsplashImage(query) {
    const accessKey = "zHxmc-pEj4xoReqUJPvatW8D2mEZjaGRh67QlDdJg7Q"; // Your Unsplash Access Key
    const baseUrl = "https://api.unsplash.com/search/photos";

    try {
        const response = await fetch(`${baseUrl}?query=${query}&page=1&per_page=1&client_id=${accessKey}`);
        if (!response.ok) throw new Error(`Unsplash API error: ${response.status}`);

        const data = await response.json();
        if (data.results.length > 0) {
            return data.results[0].urls.full; // First image URL
        }
        return null; // No image found
    } catch (error) {
        console.error("Error fetching Unsplash image:", error);
        return null;
    }
}


// Show Weather Report
function showWeatherReport(weather){
    console.log(weather);

    let city = document.getElementById('city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let temperature = document.getElementById('temp');
    temperature.innerHTML = `${Math.round(weather.main.temp)}&deg;C`;

    let minMaxTemp = document.getElementById('min-max');
    minMaxTemp.innerHTML = `${Math.floor(weather.main.temp_min)}&deg;C (min)/ ${Math.ceil(weather.main.temp_max)}&deg;C (max) `;

    let weatherType = document.getElementById('weather');
    weatherType.innerText = `${weather.weather[0].main}`;

    let date = document.getElementById('date');
    let todayDate = new Date();
    date.innerText = dateManage(todayDate);

    
    // if(weatherType.textContent == 'Clear') {
    //     document.body.style.backgroundImage = "url('https://source.unsplash.com/random/1920x1080/?clear weather')";
        
    // } else if(weatherType.textContent == 'Clouds') {

    //     document.body.style.backgroundImage = "url('https://source.unsplash.com/random/1920x1080/?cloudy weather')";
        
    // } else if(weatherType.textContent == 'Haze') {

    //     document.body.style.backgroundImage = "url('https://source.unsplash.com/random/1920x1080/?haze weather')";
        
    // }     else if(weatherType.textContent == 'Rain') {
        
    //     document.body.style.backgroundImage = "url('https://source.unsplash.com/random/1920x1080/?rain weather')";
        
    // } else if(weatherType.textContent == 'Snow') {
        
    //     document.body.style.backgroundImage = "url('https://source.unsplash.com/random/1920x1080/?snow weather')";
    
    // } else if(weatherType.textCon    tent == 'Thunderstorm') {
    
    //     document.body.style.backgroundImage = "url('https://source.unsplash.com/random/1920x1080/?thunderstorm weather')";
        
    // } 

    // Fetch Unsplash image dynamically based on weather type
const query = weatherType.textContent.toLowerCase() + "weather.name"; // e.g., "clear,weather"
fetchUnsplashImage(query).then(url => {
    if(url) {
        document.body.style.backgroundImage = `url('${url}')`;
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundPosition = 'center';
    } else {
        // fallback image if Unsplash fails
        document.body.style.backgroundImage = 'url("https://source.unsplash.com/random/1920x1080")';
    }
});

}

// Date manage
function dateManage(dateArg) {

    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    let year = dateArg.getFullYear();
    let month = months[dateArg.getMonth()];
    let date = dateArg.getDate();
    let day = days[dateArg.getDay()];

    return `${date} ${month} (${day}), ${year}`;
}


