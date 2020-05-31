class Weatther {
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
        this.currentweatther = new Weatther();
        this.forecast3day = [new Weatther(), new Weatther(), new Weatther()];
        this.date = new Date();
        this.day = '';
        this.urlimgs = [];
        this.language = 'en';
        this.description = '';
    }
    async LocalityLoding() {
        let city = await translation(this.inquiry, 'ru', 'en');
        let place = await getgeocode(city.text[0]);
        if (place.results.length === 0) {
            let text = await translation('no location', 'en', this.language)
            speechSynthesis.speak(
                new SpeechSynthesisUtterance(text.text[0])
            );

            return new Error('could not find coordinates ' + this.inquiry);
        }
        let title = await translation(place.results[0].formatted, 'ru', 'en');
        this.title = title.text[0];
        this.name = place.results[0].components.city;
        this.coordinates = place.results[0].geometry;
        let currenwez = await getcurrentweather(this.title);
        this.currentweatther = new Weatther('', currenwez.current.temp_c, currenwez.current.condition.icon, currenwez.current.condition.text +
            ' FEEL LIKE: ' + currenwez.current.feelslike_c + ' WIND: ' + Math.round(currenwez.current.wind_kph / 3.6) + 'm/c HUMIDITY: ' + currenwez.current.humidity + '%');
        this.date = new Date(currenwez.location.localtime);
        this.description = this.currentweatther.description;
        this.day = this.date.toLocaleString('En', { weekday: 'long' });
        let wez3days = await getforecast3(this.title);
        this.forecast3day.forEach((currentValue, index) => {
            let temp = wez3days.forecast.forecastday[index];
            currentValue.day = new Date(temp.date).toLocaleString('En', { weekday: 'long' });
            currentValue.temperature = temp.day.avgtemp_c;
            currentValue.urlIcon = temp.day.condition.icon, '';
            currentValue.description = '';
            this.adddom();
        });

    }
    async switchlanguage(language) {
        let title = await translation(this.title, this.language, language);
        this.title = title.text[0];
        for (let item of this.forecast3day) {
            let temp = await translation(item.day, this.language, language);
            item.day = temp.text[0];
        }
        let description = await translation(this.currentweatther.description, 'en', language);
        this.description = description.text[0];
        let day = await translation(this.day, this.language, language);
        this.day = day.text[0];
        this.language = language;
        this.adddom();
    }
    adddom() {
        document.querySelector('.city').innerHTML = this.title;
        document.querySelector('.date').innerHTML = this.date.getDate() + '.' + (this.date.getMonth() + 1) + '.' + this.date.getFullYear();
        let time = new Date();
        this.date.setMinutes(time.getMinutes());
        datetime = this.date;
        document.querySelector('.temperature_big').innerHTML = this.currentweatther.temperature + '°';
        document.querySelector('.iconweather-big').src = this.currentweatther.urlIcon;
        document.querySelector('.weather-text').innerHTML = this.description;
        document.querySelectorAll('.forecast__element').forEach((el, index) => {
            el.querySelector('.forecast__day').innerHTML = this.forecast3day[index].day;
            el.querySelector('.forecast__icon').src = this.forecast3day[index].urlIcon;
            el.querySelector('.forecast__t ').innerHTML = this.forecast3day[index].temperature;
        })

        mapfly(this.coordinates.lng, this.coordinates.lat);
    }


}