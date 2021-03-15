const CleanCSS = require('clean-css');
const MarkdownIt = require('markdown-it');
const lazyImagesPlugin = require('eleventy-plugin-lazyimages');

module.exports = function(eleventyConfig) {

    eleventyConfig.addFilter('cssmin', function(code) {
        return new CleanCSS({}).minify(code).styles;
    });

    eleventyConfig.addWatchTarget("./data/pages/css/imports/");

    eleventyConfig.addShortcode('youtube', function(id) {
        return `<div iframe="responsive"><iframe width="560" height="315" src="https://www.youtube.com/embed/${id}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen title="Youtube video"></iframe></div>`;
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

    eleventyConfig.addPairedShortcode('card', function(description, image, title, url, cta) {
        let a = (url !== undefined && url !== 'undefined') ? `<a href="${url}">` : '';
        let ae = (url !== undefined && url !== 'undefined') ? `</a>` : '';
        let t = (title !== undefined && title !== 'undefined') ? title : '';
        let i = (image !== undefined && image !== 'undefined') ? `${a}<img src="${image}" alt="${t}" loading="lazy" />${ae}` : '';
        t = (title !== undefined && title !== 'undefined') ? `<strong>${a}${t}${ae}</strong>` : '';
        let p = (description !== undefined && description !== 'undefined') ? `<p>${description}</p>` : '';
        let b = (url !== undefined && url !== 'undefined' && cta !== undefined && cta !== 'undefined') ? `<a href="${url}" button="funnel">${cta}</a>` : '';
        return `<div card="true">${i}${t}${p}${b}</div>`;
    });

    eleventyConfig.addPlugin(lazyImagesPlugin, {
        imgSelector: 'main img, footer img',
        appendInitScript: false,
        preferNativeLazyLoad: true,
        transformImgPath: (imgPath) => imgPath.replace('/media/', './public/media/')
    });

    eleventyConfig.addFilter('blogdateformat', function(value) {
        return value.toLocaleDateString('en', {year: 'numeric', month: 'long', day: 'numeric'});
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
