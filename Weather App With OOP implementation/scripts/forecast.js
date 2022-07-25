class Forecast {
    constructor() {
        this.key = 'Wj4VCvgjSvdi2oBG4kl8NO2kGgi5Uinh';
        this.weatherURI = 'http://dataservice.accuweather.com/currentconditions/v1/';
        this.cityURI = 'http://dataservice.accuweather.com/locations/v1/cities/search';

    }
    async updateLocation(city) {
        const cityDets = await this.citySearch(city);
        const cityId = await this.weatherCondition(cityDets.Key);
        return {
            cityDets,
            cityId
        };
    }
    async weatherCondition(id) {
        const query = `${id}?apikey=${this.key}`;
        const response = await fetch(this.weatherURI + query);
        const data = await response.json();
        return data[0];
    }
    async citySearch(city) {
        const query = `?apikey=${this.key}&q=${city}`;
        const response = await fetch(this.cityURI + query);
        const data = await response.json();
        return data[0];
    }
}

//Weahter Condition 

// citySearch('manchester')
//     .then(data => {
//         return weatherCondition(data.Key);
//     })
//     .then(data => console.log(data))
//     .catch(err => console.log(err));

// weatherCondition("329260");