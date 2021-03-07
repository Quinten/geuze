const CleanCSS = require('clean-css');

module.exports = function(eleventyConfig) {

    eleventyConfig.addFilter('cssmin', function(code) {
        return new CleanCSS({}).minify(code).styles;
    });

    eleventyConfig.addWatchTarget("./data/pages/css/imports/");

    eleventyConfig.addShortcode('youtube', function(id) {
        return `<img src="http://img.youtube.com/vi/${id}/maxresdefault.jpg" alt="Youtube Video"/>`;
    });

    return {
        dir: {
            input: "data/pages",
            output: "public",
            layouts: "../../layouts",
            data: "../config"
        }
    };
};
