async function getGeolocation() {
    const url = 'https://ipinfo.io/json?token=a4e3d03cb961c6';
    const res = await fetch(url);
    const data = await res.json();
    return data;
}
async function getforecast3(city) {
    const url = `https://api.weatherapi.com/v1/forecast.json?key=2dee1407f7574557a4f172646203005&q=${city}&days=3`;
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
    return data;
}
async function getcurrentweather(city) {
    const url = `https://api.weatherapi.com/v1/current.json?key=2dee1407f7574557a4f172646203005&q=${city}`;
    const res = await fetch(url);
    const data = await res.json();
    return data;
}
async function getbackgroundimage(datas = new Date(), weather = new Weather()) {
    let timeOfDay = Math.floor(datas.getHours() / 5);
    var arr = new Map([
        [1, 'morning'],
        [2, 'noon'],
        [3, 'evening'],
        [0, 'night'],
        [4, 'night'],
    ]);
    const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=0f15ff623f1198a1f7f52550f8c36057&tags=${arr.get(timeOfDay),weatheranalysis(weather.description)},weather&tag_mode=all&extras=url_h&format=json&nojsoncallback=1`;
    console.log(arr.get(timeOfDay), weatheranalysis(weather.description));
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
    return data;
}
async function getgeocode(city) {

    const url = `https://api.opencagedata.com/geocode/v1/json?q=${city}&key=c6b6da0f80f24b299e08ee1075f81aa5&pretty=1&no_annotations=1`;
    const res = await fetch(url);
    const data = await res.json();
    return data;

}
async function translation(str, l1, l2) {
    const url = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200514T045835Z.62def7e35ebc8937.ddbe63185a35d26ed37e6ec58ec99e5ad4edf91b&text=${str}&lang=${l1}-${l2}`;
    let res = await fetch(url);
    let data = await res.json();
    return data;
}

function weatheranalysis(str) {
    if (str.indexOf('cloudy') != -1) return 'cloudy';
    if (str.indexOf('rain') != -1) return 'rain';
    if (str.indexOf('sun') != -1) return 'sun';
    if (str.indexOf('storm') != -1) return 'storm';
    if (str.indexOf('fog') != -1) return 'fog';
    if (str.indexOf('wind') != -1) return 'wind';
    if (str.indexOf('Overcast') != -1) return 'wOvercast';
    return "nature";

}