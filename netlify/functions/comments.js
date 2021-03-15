let https = require('https');

let getJson = (url) => {
    return new Promise((resFunc, rejFunc) => {
        https.get(url, res => {
            res.setEncoding('utf8');
            let body = '';
            res.on('data', data => {
                body += data;
            });
            res.on('end', () => {
                body = JSON.parse(body);
                resFunc(body);
            });
        });
    });
};

let handler = async (event, context) => {

    if (process.env.NETLIFY_ACCESS_TOKEN === undefined) {
        return {
            statusCode: 200,
            body: JSON.stringify([])
        };
    }

    if (process.env.SITE_ID === undefined) {
        return {
            statusCode: 200,
            body: JSON.stringify([])
        };
    }

    let {slug} = event.queryStringParameters;
    if (slug === undefined) {
        return {
            statusCode: 200,
            body: JSON.stringify([])
        };
    }

    let forms = await getJson(`https://api.netlify.com/api/v1/sites/${process.env.SITE_ID}/forms?access_token=${process.env.NETLIFY_ACCESS_TOKEN}`);

    let form_id = undefined;
    forms.forEach(form => {
        if (form.name === 'comments-' + slug) {
            form_id = form.id;
        }
    });
    if (form_id === undefined) {
        return {
            statusCode: 200,
            body: JSON.stringify([])
        };
    }

    let comments = await getJson(`https://api.netlify.com/api/v1/forms/${form_id}/submissions?access_token=${process.env.NETLIFY_ACCESS_TOKEN}`);
    return {
        statusCode: 200,
        body: JSON.stringify(comments)
    };
};

exports.handler = handler;
