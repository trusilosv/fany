let recognizer = new webkitSpeechRecognition();
let search_input = document.querySelector('.search-input');
let container = document.querySelector('.search-wrapper');
let buttom_mic = document.querySelector('.mic-icon');
let buttom_search = document.querySelector('.search-icon')
recognizer.lang = 'en-En';
recognizer.onresult = (event) => {
    let result = event.results[event.resultIndex];
    search_input.value = result[0].transcript;
    buttom_mic.classList.remove('active');
    speechSynthesis.speak(
        new SpeechSynthesisUtterance(`Ищу погоду в  ${result[0].transcript} `)
    );
    search();
}
recognizer.onend = (event) => {
    if (search_input.value == '') {
        speechSynthesis.speak(new SpeechSynthesisUtterance(`Не удалось распознать речь попробуй еще `));
        buttom_mic.classList.remove('active');
    }
}
recognizer.onerror = () => { speechSynthesis.speak(new SpeechSynthesisUtterance(`Ошибка распознования `)); };
buttom_search.addEventListener('click', () => {});

buttom_mic.addEventListener('click', () => {
    search_input.value = '';
    recognizer.start();
    buttom_mic.classList.add('active');
});
search_input.addEventListener('click', () => search_input.value = '');
async function search() {
    let mes = 'Invalid request! Repeat';
    let input = document.querySelector('.search-input');
    if (input.value.lenght < 2)
        input.value = mes;
    let temp = new Locality(input.value);
    let d = await temp.LocalityLoding(temperature);
    if (d != -1)
        locat = temp;
    temp.adddom(temperature);
}