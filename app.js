// Set your Mapbox access token here
mapboxgl.accessToken = 'sk.eyJ1IjoiYWxpbWVsdmkiLCJhIjoiY202YzRhZml0MGZoaDJsc2Yzb3drZnJpayJ9.oNKyV5cm_YOdbmwIWP5JOQ';

let map;

// Function to load the Google Sheets API client
function loadGoogleSheetsAPI() {
  gapi.load('client:auth2', initClient);
}

// Initialize the Google API client with your credentials
function initClient() {
  gapi.client.init({
    apiKey: 'AIzaSyBRFUhSP9PVFJgBo6UMuc77zbyLwvf1y6E',
    clientId: '170168704135-rk92esom7nv61kt2m5rea62b4ba53b2u.apps.googleusercontent.com',
    discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
    scope: 'https://www.googleapis.com/auth/spreadsheets.readonly',
  }).then(() => {
    // Load the data from your Google Sheet
    fetchSheetData();
  });
}

// Function to fetch data from Google Sheets
function fetchSheetData() {
  const spreadsheetId = '1VAambj9aG9EqZ9HG6MG-xocYfxKaOt6EDmYyPdiaXYQ'; // Replace with your Sheet ID
  const range = 'Sheet1!A2:A, G2:H'; // Data starts from row 2: Address in A, Latitude and Longitude in G and H

  gapi.client.sheets.spreadsheets.values.get({
    spreadsheetId: spreadsheetId,
    range: range,
  }).then(response => {
    const data = response.result.values;
    if (data.length > 0) {
      console.log(data);
      initializeMap(data);
    } else {
      console.log('No data found.');
    }
  });
}

// Function to initialize the Mapbox map
function initializeMap(data) {
  // Initialize Mapbox map
  map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11', // Change to your preferred style
    center: [0, 0],  // Default center of the map
    zoom: 2,         // Zoom level
  });

  // Add markers based on the fetched data
  data.forEach(location => {
    const [name, lat, lng] = location;
    if (lat && lng) {
      new mapboxgl.Marker()
        .setLngLat([parseFloat(lng), parseFloat(lat)]) // Convert to float for proper coordinates
        .setPopup(new mapboxgl.Popup().setText(name)) // Popup with the address name
        .addTo(map);
    }
  });
}

// Load the Google Sheets API after the page is loaded
window.onload = loadGoogleSheetsAPI;
