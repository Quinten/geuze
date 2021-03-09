if (document.querySelector('[card]')) {
    let cssId = 'card-css';
    if (!document.getElementById(cssId)) {
        let head  = document.getElementsByTagName('head')[0];
        let link  = document.createElement('link');
        link.id   = cssId;
        link.rel  = 'stylesheet';
        link.href = '/css/card.css';
        head.appendChild(link);
    }
}
