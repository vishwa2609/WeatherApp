// Function to fetch weather data
async function getWeather() {
  const city = document.getElementById('city').value; // Get the city name from input
  if (city.trim() === '') {
    alert('Please enter a city name');
    return;
  }

  const url = `https://open-weather13.p.rapidapi.com/city/${city}/EN`; // Use dynamic city name in the URL
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': 'eae0c1686fmsh5f451c3c103b1b6p117f2cjsnbbac050904e0', // Replace with your API key
      'x-rapidapi-host': 'open-weather13.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(url, options); // Fetch data from the API
    if (response.ok) {
      const result = await response.json(); // Parse the JSON response
      console.log(result); // Log the entire response to inspect the structure
      displayWeather(result); // Call the function to display the weather data
    } else {
      console.error('Failed to fetch weather data', response.status);
      document.getElementById('weatherInfo').innerHTML = 'Error fetching weather data';
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    document.getElementById('weatherInfo').innerHTML = 'Network error occurred';
  }
}

// Function to display the weather data
function displayWeather(data) {
  // Log the data to see its structure
  console.log('Weather Data:', data);

  // Check if the structure contains the data we're interested in
  if (data && data.main) {
    document.getElementById('weatherInfo').style.display = 'block'; // Show the weather info div
    document.getElementById('weatherInfo').innerHTML = `
      <h3>Weather in ${data.name}</h3> <!-- Display city name -->
      <p>Temperature: ${data.main.temp}°F</p> <!-- Access temp in main -->
      <p>Humidity: ${data.main.humidity}%</p> <!-- Access humidity in main -->
      <p>Wind Speed: ${data.wind.speed} mph</p> <!-- Access wind speed in wind -->
    `;
  } else {
    document.getElementById('weatherInfo').innerHTML = 'No weather data available';
  }
}

// Event listener for the button
document.getElementById('getWeather').addEventListener('click', getWeather); // Attach the event listener to the button
