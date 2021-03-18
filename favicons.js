let fs = require('fs');
let favicons = require('favicons');
let theming = require('./data/config/theming.json');
let source = 'public' + theming.favicon;
let configuration = {
    path: "/",
    appName: theming.manifest.name,
    appShortName: theming.manifest.short_name,
    appDescription: theming.manifest.description,
    developerName: null,
    developerURL: null,
    background: theming.colors['body-bg'],
    theme_color: theming.colors['body-bg'],
    appleStatusBarStyle: 'black-translucent',
    display: 'browser',
    orientation: 'any',
    scope: '/',
    start_url: '/',
    icons: {
        android: ["android-chrome-192x192.png"],
        appleIcon: ["apple-touch-icon-152x152.png", "apple-touch-icon-167x167.png", "apple-touch-icon-180x180.png"],
        appleStartup: false,
        coast: false,
        favicons: ["favicon-32x32.png", "favicon.ico"],
        firefox: false,
        windows: false,
        yandex: false
    }
};

let callback = (error, response) => {
    if (error) {
        console.log(error.message); // Error description e.g. "An unknown error has occurred"
        return;
    }
    response.images.forEach((file) => {
        fs.writeFile('public/' + file.name, file.contents, error => {if (error !== null) { console.log(error); }});
    });
    response.files.forEach((file) => {
        let contents = JSON.parse(file.contents);
        if (contents && contents.icons) {
            let toRemove = [];
            contents.icons.forEach(icon => {
                if (icon.sizes !== '192x192') {
                    toRemove.push(icon);
                }
            });
            toRemove.forEach(icon => {
                contents.icons.splice(contents.icons.indexOf(icon), 1);
            });
        }
        fs.writeFile('public/' + file.name, JSON.stringify(contents), error => {if (error !== null) { console.log(error); }});
    });
    fs.writeFile('data/config/faviconmeta.json', JSON.stringify(response.html), error => {if (error !== null) { console.log(error); }});
};

favicons(source, configuration, callback);
