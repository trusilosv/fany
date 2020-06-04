let body = document.body;
let buttonUpdateimg = document.querySelector('.updateimg-icon');
buttonUpdateimg.addEventListener('click', switchimg);

function switchimg() {
    buttonUpdateimg.style.background = 'red';
    if (locat.urlimgs.photos.photo.length != 0) {
        let lengtharr = locat.urlimgs.photos.photo.length;
        let img = new Image();
        img.src = locat.urlimgs.photos.photo[Math.floor(Math.random() * lengtharr)].url_h;
        img.onload = () => {
            body.style.backgroundImage = `url(${img.src})`
            buttonUpdateimg.style.background = 'transparent';
            buttonUpdateimg.style.backgroundImage = 'url(img/update-button.svg)';
        };
    }
}