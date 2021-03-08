const CleanCSS = require('clean-css');
const MarkdownIt = require('markdown-it');

module.exports = function(eleventyConfig) {

    eleventyConfig.addFilter('cssmin', function(code) {
        return new CleanCSS({}).minify(code).styles;
    });

    eleventyConfig.addWatchTarget("./data/pages/css/imports/");

    eleventyConfig.addShortcode('youtube', function(id) {
        return `<div iframe="responsive"><iframe width="560" height="315" src="https://www.youtube.com/embed/${id}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>`;
    });

    eleventyConfig.addPairedShortcode('pancake', function(contents) {
        return `<div pancake="deconstructed">${contents}</div>`;
    });

    eleventyConfig.addPairedShortcode('slice', function(contents) {
        return `<div>${contents}</div>`;
    });

    eleventyConfig.addPairedShortcode('markdown', function(content) {
        return new MarkdownIt({html: true}).render(content);
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
