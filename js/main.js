let locat = new Locality();
async function start() {
    let geolocation = await getGeolocation();
    locat = new Locality(geolocation.city);
    await locat.LocalityLoding();
    setTimeout(() => {
        document.querySelector('.wrapper').style.opacity = 1;
        document.querySelector('.loding').style.display = 'none';
    }, 1000);

}
start();
document.querySelector('.search-icon').addEventListener('click', () => {
    let input = document.querySelector('.search-input');
    locat = new Locality(input.value);
    locat.LocalityLoding();
});
document.querySelector('.select').addEventListener("change", () => {
    locat.switchlanguage(event.target.value);
})