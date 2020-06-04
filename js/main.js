let temperature = localStorage.getItem('temperature') || '°C';
document.querySelectorAll('.button_temperature').forEach((el) => {
    if (el.innerHTML == temperature) el.classList.add('active');
});
let language = localStorage.getItem('language') || 'en';
document.querySelector('.select').value = language;
let buttontemperature = document.querySelectorAll('.button_temperature');

let locat = new Locality();
async function start() {
    let geolocation = await getGeolocation();
    locat = new Locality(geolocation.city);
    await locat.LocalityLoding(temperature, language);
    setTimeout(() => {
        document.querySelector('.wrapper').style.opacity = 1;
        document.querySelector('.loding').style.display = 'none';
    }, 1000);

}


start();
document.querySelector('.search-icon').addEventListener('click', search);
document.querySelector('.select').addEventListener("change", () => {
    locat.switchlanguage(temperature, event.target.value);
    language = event.target.value;
});
buttontemperature.forEach((el) => el.addEventListener('click', () => {
    localStorage.setItem('temperature', el.innerHTML);
    buttontemperature.forEach((element) => element.classList.remove('active'));
    el.classList.add('active');
    temperature = el.innerHTML;
    locat.adddom(temperature);
}));
document.addEventListener('keydown', (event) => {
    if (event.code == 'Enter') search();
});