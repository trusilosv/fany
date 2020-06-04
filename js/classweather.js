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
        this.language = 'en';
        this.description = '';
    }
    async LocalityLoding(temperature, language) {
        try {
            let city = await translation(this.inquiry, 'ru', 'en');
            let place = await getgeocode(city.text[0]);
            let title = await translation(place.results[0].formatted, 'ru', 'en');
            this.title = title.text[0];
            this.name = place.results[0].components.city;
            this.coordinates = place.results[0].geometry;
            let currenwez = await getcurrentweather(this.title);
            this.currentweather = new Weather('', currenwez.current.temp_c, currenwez.current.condition.icon, currenwez.current.condition.text +
                ' FEEL LIKE: ' + currenwez.current.feelslike_c + ' WIND: ' + Math.round(currenwez.current.wind_kph / 3.6) + 'm/c HUMIDITY: ' + currenwez.current.humidity + '%');
            this.date = new Date(currenwez.location.localtime);
            this.description = this.currentweather.description;
            this.day = this.date.toLocaleString('En', { weekday: 'long' });
            let wez3days = await getforecast3(this.title);
            this.urlimgs = await getbackgroundimage(this.date, this.currentweather);
            this.forecast3day.forEach((currentValue, index) => {
                let temp = wez3days.forecast.forecastday[index];
                currentValue.day = new Date(temp.date).toLocaleString('En', { weekday: 'long' });
                currentValue.temperature = temp.day.avgtemp_c;
                currentValue.urlIcon = temp.day.condition.icon, '';
                currentValue.description = '';

            });
            await this.switchlanguage(temperature, language);
            switchimg();
        } catch { search_input.value = 'Error'; return -1 }
    }
    async switchlanguage(temperature, language) {
        let title = await translation(this.title, this.language, language);
        this.title = title.text[0];
        localStorage.setItem('language', language);
        for (let item of this.forecast3day) {
            let temp = await translation(item.day, this.language, language);
            item.day = temp.text[0];
        }
        let lat = await translation(this.coordinatesname[0], 'en', language);
        let long = await translation(this.coordinatesname[1], 'en', language);
        document.querySelector('.Lat').innerHTML = lat.text[0] + Math.floor(this.coordinates.lat) + '°' + Math.floor((this.coordinates.lat % 1) * 100) + '\'';
        document.querySelector('.Longi').innerHTML = long.text[0] + Math.floor(this.coordinates.lng) + '°' + Math.floor((this.coordinates.lng % 1) * 100) + '\'';
        let description = await translation(this.currentweather.description, 'en', language);
        this.description = description.text[0];
        let day = await translation(this.day, this.language, language);
        this.day = day.text[0];
        this.language = language;
        this.adddom(temperature);
    }
    adddom(temperature) {
        document.querySelector('.city').innerHTML = this.title;
        let time = new Date();

        this.date.setMinutes(time.getMinutes());
        datetime = this.date;
        document.querySelector('.date').innerHTML = '0' + this.date.getDate() + '.0' + (this.date.getMonth() + 1) + '.' + this.date.getFullYear();
        document.querySelector('.temperature_big').innerHTML = temperatureChange(this.currentweather.temperature, temperature);
        document.querySelector('.iconweather-big').src = this.currentweather.urlIcon;
        document.querySelector('.weather-text').innerHTML = this.description;
        document.querySelectorAll('.forecast__element').forEach((el, index) => {
            el.querySelector('.forecast__day').innerHTML = this.forecast3day[index].day;
            el.querySelector('.forecast__icon').src = this.forecast3day[index].urlIcon;
            el.querySelector('.forecast__t ').innerHTML = temperatureChange(this.forecast3day[index].temperature, temperature);
        })
        mapfly(this.coordinates.lng, this.coordinates.lat);
    }


}

function temperatureChange(t, temperature) {
    if (temperature == '°F') return Math.round(+t * 1.8 + 32) + ' ' + temperature;
    else return Math.round(t) + ' ' + temperature;
}