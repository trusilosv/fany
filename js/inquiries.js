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
    return data;
}
async function getcurrentweather(city) {
    const url = `http://api.weatherapi.com/v1/current.json?key=2dee1407f7574557a4f172646203005&q=${city}`;
    const res = await fetch(url);
    const data = await res.json();
    return data;
}
async function getbackgroundimage(...item) {
    console.log(Array.from(item).join(','));
    const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=0f15ff623f1198a1f7f52550f8c36057&tags=${Array.from(item).join(',')}&tag_mode=all&extras=url_h&format=json&nojsoncallback=1`;
    const res = await fetch(url);
    const data = await res.json();
    return data;
}
async function getgeocode(city) {

    const url = `https://api.opencagedata.com/geocode/v1/json?q=${city}&key=a7bd35cae1db46af916787d7feb46ca5&pretty=1&no_annotations=1`;
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