class Weather {
    constructor(day, temperature, urlIcon, description) {
        this.day = day;
        this.temperature = temperature;
        this.urlIcon = urlIcon;
        this.description = description;
    }
}
class Locality {
    constructor(inquiry) {
        this.inquiry = inquiry;
        this.title = '';
        this.name = '';
        this.coordinates;
        this.coordinatesname = ['Latitude:', 'Longitude:'];
        this.currentweather = new Weather();
        this.forecast3day = [new Weather(), new Weather(), new Weather()];
        this.date = new Date();
        this.day = '';
        this.urlimgs = [];
        this.description = '';
    }
    async LocalityLoding(temperature) {
        try {
            let city = this.inquiry;
            let place = await getgeocode(city);
            this.title = place.results[0].formatted;
            this.name = place.results[0].components.city;
            this.coordinates = place.results[0].geometry;
            let currenwez = await getcurrentweather(city);
            this.currentweather = new Weather('', currenwez.current.temp_c, currenwez.current.condition.icon, currenwez.current.condition.text +
                ' ощущается как: ' + currenwez.current.feelslike_c + '°C Ветер: ' + Math.round(currenwez.current.wind_kph / 3.6) + 'm/c Влажность: ' + currenwez.current.humidity + '%');
            this.date = new Date(currenwez.location.localtime);
            this.description = this.currentweather.description;
            this.day = this.date.toLocaleString('En', { weekday: 'long' });
            let wez3days = await getforecast3(city);
            this.urlimgs = await getbackgroundimage(this.date, this.currentweather);
            this.forecast3day.forEach((currentValue, index) => {
                let temp = wez3days.forecast.forecastday[index];
                currentValue.day = new Date(temp.date).toLocaleString('En', { weekday: 'long' });
                currentValue.temperature = temp.day.avgtemp_c;
                currentValue.urlIcon = temp.day.condition.icon, '';
                currentValue.description = '';

            });

            switchimg(emperature);
        } catch { search_input.value = 'Error'; return -1 }
    }
    adddom(temperature) {
        document.querySelector('.city').innerHTML = this.title;
        let time = new Date();
        this.date.setMinutes(time.getMinutes());
        datetime = this.date;
        document.querySelector('.date').innerHTML = '0' + this.date.getDate() + '.0' + (this.date.getMonth() + 1) + '.' + this.date.getFullYear();
        document.querySelector('.temperature_big').innerHTML = temperatureChange(this.currentweather.temperature, temperature);
        document.querySelector('.iconweather-big').src = 'http://' + this.currentweather.urlIcon.substr(2);
        document.querySelector('.weather-text').innerHTML = this.description;
        document.querySelectorAll('.forecast__element').forEach((el, index) => {
            el.querySelector('.forecast__day').innerHTML = this.forecast3day[index].day;
            el.querySelector('.forecast__icon').src = 'http://' + this.forecast3day[index].urlIcon.substr(2);
            el.querySelector('.forecast__t ').innerHTML = temperatureChange(this.forecast3day[index].temperature, temperature);
        })
        mapfly(this.coordinates.lng, this.coordinates.lat);
    }


}

function temperatureChange(t, temperature) {
    if (temperature == '°F') return Math.round(+t * 1.8 + 32) + ' ' + temperature;
    else return Math.round(t) + ' ' + temperature;
}