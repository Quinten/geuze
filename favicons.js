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
        android: true,
        appleIcon: true,
        appleStartup: false,
        coast: false,
        favicons: true,
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
    //console.log(response.images);   // Array of { name: string, contents: <buffer> }
    //console.log(response.files);    // Array of { name: string, contents: <string> }
    //console.log(response.html);     // Array of strings (html elements)
    response.images.forEach((file) => {
        fs.writeFile('public/' + file.name, file.contents, error => {if (error !== null) { console.log(error); }});
    });
    response.files.forEach((file) => {
        fs.writeFile('public/' + file.name, file.contents, error => {if (error !== null) { console.log(error); }});
    });
    fs.writeFile('data/config/faviconmeta.json', JSON.stringify(response.html), error => {if (error !== null) { console.log(error); }});
};

favicons(source, configuration, callback);
