(function () {
    if (document.querySelector('[card]')) {
        var head  = document.getElementsByTagName('head')[0];
        var link  = document.createElement('link');
        link.rel  = 'stylesheet';
        link.href = '/css/card.css';
        head.appendChild(link);
    }
})();

(function (selector, src, preferNativeLazyLoad) {
    var images = document.querySelectorAll(selector);
    var numImages = images.length;

    if (numImages > 0) {
        if (preferNativeLazyLoad && 'loading' in HTMLImageElement.prototype) {
            for (var i = 0; i < numImages; i++) {
                var keys = ['src', 'srcset'];

                for (var j = 0; j < keys.length; j++) {
                    if (images[i].hasAttribute('data-' + keys[j])) {
                        var value = images[i].getAttribute('data-' + keys[j]);
                        images[i].setAttribute(keys[j], value);
                    }
                }
            }
            return;
        }
        var script = document.createElement('script');
        script.async = true;
        script.src = src;
        document.body.appendChild(script);
    }
})('main img, footer img', 'https://cdn.jsdelivr.net/npm/lazysizes@5/lazysizes.min.js', true);

(function () {
    var links = document.querySelectorAll('nav a')
    for (var i = 0; i < links.length; i++) {
        var link = links[i];
        var href = link.getAttribute('href');
        if (href.indexOf('#') > -1 && href.indexOf(window.location.pathname) > -1) {
            link.addEventListener('click', function (e) {
                document.querySelector('body').setAttribute('menu', false);
            });
        }
    }
})();

(function () {
    var facades = document.querySelectorAll('[facade]')
    for (var i = 0; i < facades.length; i++) {
        var facade = facades[i];
        var id = facade.id;
        facade.addEventListener('click', function () {
            facade.parentElement.innerHTML = `<div iframe="responsive"><iframe width="480" height="360" src="https://www.youtube.com/embed/${id}?autoplay=1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen title="Youtube video"></iframe></div>`;
        });
    }
})();
