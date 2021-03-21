let flashmessage = (message, error) => {
    let el = document.createElement('div');
    el.innerText = message;
    let hiddenClass = 'message';
    let flashClass = hiddenClass + ' message--flash';
    if (error !== undefined) {
        hiddenClass += ' message--error';
        flashClass += ' message--error';
    }
    el.setAttribute('class', hiddenClass);
    document.querySelector('body').appendChild(el);
    setTimeout(() => {
        el.setAttribute('class', flashClass);
        setTimeout(() => {
            el.setAttribute('class', hiddenClass);
            setTimeout(() => {
                el.remove();
            }, 2000);
        }, 6000);
    }, 500);
};

export default flashmessage;
