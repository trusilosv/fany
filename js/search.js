let recognizer = new webkitSpeechRecognition();
let search_input = document.querySelector('.search-input');
let container = document.querySelector('.search-wrapper');
let buttom_mic = document.querySelector('.mic-icon');
let buttom_search = document.querySelector('.search-icon')
recognizer.lang = 'ru-Ru';
recognizer.onresult = (event) => {
    let result = event.results[event.resultIndex];
    search_input.value = result[0].transcript;
    buttom_mic.classList.remove('active');
    speechSynthesis.speak(
        new SpeechSynthesisUtterance(`Ищу погоду в  ${result[0].transcript} `)
    );
    let loc = new Locality(result[0].transcript);
    loc.LocalityLoding();

}
recognizer.onend = (event) => {
    if (search_input.value == '') {
        speechSynthesis.speak(new SpeechSynthesisUtterance(`Не удалось распознать речь попробуй еще `));
        buttom_mic.classList.remove('active');
    }
}
recognizer.onerror = () => { speechSynthesis.speak(new SpeechSynthesisUtterance(`Ошибка`)); };
buttom_search.addEventListener('click', () => {});

buttom_mic.addEventListener('click', () => {
    search_input.value = '';
    recognizer.start();
});