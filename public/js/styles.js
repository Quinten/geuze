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
