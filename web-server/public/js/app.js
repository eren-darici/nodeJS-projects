console.log('Client side javascript file loaded!');

// Messages
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

// Image div
const imageDiv = document.querySelector('#image-div');

// Weather Form
const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    messageTwo.textContent = "Loading...";

    const location = search.value;
    

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) =>{
            if (data.error) {
                console.log(data.error)
                messageTwo.textContent = data.error;
                messageOne.textContent = "";
                imageDiv.innerHTML = "";
            } else {
                messageOne.textContent =  data.location

                messageTwo.textContent = data.forecast.temperature + " degrees and " + data.forecast.description + ". There is " + data.forecast.pcip * 100 + " % chance of rain.";
                console.log(data.weather_icon)
                
                imageDiv.innerHTML = `<img src="${data.weather_icon}" alt="Weather Icon" class="weather_icon">`
            }
        })
    })
})

