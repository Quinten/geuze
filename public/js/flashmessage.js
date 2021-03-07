let flashmessage = (message) => {
    let el = document.createElement('div');
    el.innerText = message;
    el.setAttribute('message', 'hidden');
    document.querySelector('body').appendChild(el);
    setTimeout(() => {
        el.setAttribute('message', 'flash');
        setTimeout(() => {
            el.setAttribute('message', 'hidden');
            setTimeout(() => {
                el.remove();
            }, 2000);
        }, 6000);
    }, 500);
};

export default flashmessage;
