/* Global Variables */
// API variables
let APIUrl = 'https://api.openweathermap.org/data/2.5/weather?zip=';
let APIKey = '&appid=9ed668acd45eacfbaf23b34e584a7448';
// DOM variables
let generateBtn = document.querySelector('#generate'),
    zipValue = document.querySelector('#zip'),
    feelingsValue = document.querySelector('#feelings'),
    dateDiv = document.querySelector('#date'),
    tempDiv = document.querySelector('#temp'),
    contentDiv = document.querySelector('#content');

// Create a new date instance dynamically with JS
let d = new Date();
let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let newDate = days[d.getDay()] + ' ' + d.getDate() + ' ' + months[d.getMonth()] + ' ' + d.getFullYear() + ' ' + d.getHours() + ':' + d.getMinutes();


// Add event to Generate button
generateBtn.addEventListener('click', (e) => {
    const newZip = zipValue.value;
    const newFeelings = feelingsValue.value;

    // Function to get weather
    getWeather(APIUrl, newZip, APIKey) // Send data to server from API

        // After data comes
        .then(function (data) {
            console.log(data);
            // Send data to server by using POSt
            let cityName = '',
                newTemp = '';
            if (data.cod === 200) {
                console.log('Request found');
                cityName = data.name;
                newTemp = data.main.temp;
            } else {
                console.log(data.message);
                newTemp = data.message;
                cityName = data.message;
            }
            
            postData('http://localhost:3030/add', { temperature: cityName + ' ' + newTemp, date: newDate, userResponse: newFeelings });
            
            // Show data on UI
            updateUi()
        })
    // test it
    console.log(newZip + ' ' + newFeelings + ' ' + d);
});

/// Function to get weather from API
const getWeather = async (APIUrl, newZip, APIKey) => {
    const req = await fetch (APIUrl + newZip + APIKey);
    try {
        const reqData = await req.json();
        return reqData;
    }catch(error) {
        console.log("error", error);
    }
    console.log("Done!");
}

// Function to POST data {} to server
const postData = async (url = '', data = {}) => {
    console.log('Posted data');
    console.log(data);
    const res = await fetch(url, {
        // * GET, DELETE, PUT, POST ... ect
        method: 'POST',
        // Include -same-origin-
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        // Body data type must match "Content-Type" header
        body: JSON.stringify(data),
    });

    try {
        const resData = await res.json();
        return resData;
    }catch(error) {
        console.log("error", error);
    }
}

// That's where we ask GET request
const updateUi = async () => {
    const request = await fetch('http://localhost:3030/gets');
    try {
        const allData = await request.json();
        console.log('Geted data');
        console.log(allData);
        // put data in its containers
        dateDiv.innerHTML = 'Date : ' + '<span>' + allData.date + '</span>';
        tempDiv.innerHTML = 'Temperature : ' + '<span>' + allData.temperature + '</span>';
        contentDiv.innerHTML = 'Feelings : ' + '<span>' + allData.userResponse + '</span>';

    } catch(error) {
        console.log('error', error);
    }
}
