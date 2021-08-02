const CleanCSS = require('clean-css');
const MarkdownIt = require('markdown-it');
const MarkdownItAnchor = require('markdown-it-anchor');
const MarkdownLib = MarkdownIt({ html: true, linkify: true }).use(MarkdownItAnchor);
const lazyImagesPlugin = require('eleventy-plugin-lazyimages');
const sizeOf = require('image-size');

module.exports = function(eleventyConfig) {

    eleventyConfig.addFilter('imagewidth', function (img) {
        try {
            return sizeOf('./public' + img).width;
        } catch (e) {
            return 0;
        }
    });

    eleventyConfig.addFilter('imageheight', function (img) {
        try {
            return sizeOf('./public' + img).height;
        } catch (e) {
            return 0;
        }
    });

    eleventyConfig.addFilter('imagetype', function (img) {
        if (/png$/.test(img)) {
            return 'image/png';
        }
        return 'image/jpeg';
    });

    eleventyConfig.addFilter('cssmin', function(code) {
        return new CleanCSS({}).minify(code).styles;
    });

    eleventyConfig.addWatchTarget("./data/pages/css/imports/");

    eleventyConfig.addShortcode('youtube', function(id) {
        return `<div class="embed"><div class="embed__facade embed__facade--youtube" data-video-id="${id}"><img src="https://img.youtube.com/vi/${id}/maxresdefault.jpg" alt="youtube" /></div></div>`;
    });

    eleventyConfig.addPairedShortcode('pancake', function(contents) {
        return `<div class="pancake">${contents}</div>`;
    });

    eleventyConfig.addPairedShortcode('slice', function(contents) {
        return `<div class="pancake__slice">${contents}</div>`;
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
        let b = (url !== undefined && url !== 'undefined' && cta !== undefined && cta !== 'undefined') ? `<a href="${url}" class="button button--funnel">${cta}</a>` : '';
        return `<div class="card">${i}${t}${p}${b}</div>`;
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

    eleventyConfig.setLibrary('md', MarkdownLib);

    return {
        dir: {
            input: "data/pages",
            output: "public",
            layouts: "../../layouts",
            data: "../config"
        }
    };
};
