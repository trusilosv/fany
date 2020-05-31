var datetime = new Date();
setInterval(function() {
    datetime = new Date(Date.parse(datetime.toString()) + 1000);
    let h = datetime.getHours(),
        m = datetime.getMinutes(),
        s = datetime.getSeconds();
    h = (h < 10) ? '0' + h : h;
    m = (m < 10) ? '0' + m : m;
    s = (s < 10) ? '0' + s : s;
    document.querySelector('.time').innerHTML = h + ':' + m + ':' + s;
}, 1000);