const cityForm = document.querySelector('form');
const UI = document.querySelector('.card');
const details = document.querySelector('.details');
const image = document.querySelector('img.time');
const icon = document.querySelector('.icon img');
const forecast = new Forecast();

//Update UI functions
const updateUi = (data) => {
    //     const cityDets = data.cityDets;
    //     const cityId = data.cityId;

    //desturctureing in js 
    const { cityDets, cityId } = data;
    console.log(data);


    details.innerHTML = `
        <h5 class="my-3">${cityDets.EnglishName}</h5>
        <div class="my-3">${cityId.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${cityId.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div>
    `;

    //check if its day or night
    let timeSrc = null;
    if (cityId.IsDayTime) {
        timeSrc = "img/day.svg";
    } else {
        timeSrc = "img/night.svg";
    }
    image.setAttribute('src', timeSrc);

    //input icon image 
    const setIcon = `img/icons/${cityId.WeatherIcon}.svg`;
    icon.setAttribute('src', setIcon);

    //check if it's not already created

    if (UI.classList.contains('d-none')) {
        UI.classList.remove('d-none');
    }


};
cityForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const city = cityForm.city.value.trim();
    cityForm.reset();

    forecast.updateLocation(city)
        .then(data => updateUi(data))
        .catch(err => console.log(err));

    //set local storage
    localStorage.setItem('city', city);

});

if (localStorage.getItem('city')) {
    forecast.updateLocation(localStorage.getItem('city'))
        .then(data => updateUi(data))
        .catch(err => console.log(err));

}