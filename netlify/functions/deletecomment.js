let https = require('https');

let deleteCall = (url) => {
    return new Promise((resFunc, rejFunc) => {
        https.request(url, {method: 'DELETE'}, res => {
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
            body: JSON.stringify({})
        };
    }

    if (process.env.SITE_ID === undefined) {
        return {
            statusCode: 200,
            body: JSON.stringify({})
        };
    }

    let {user} = context.clientContext;
    if (user === undefined) {
        return {
            statusCode: 200,
            body: JSON.stringify({})
        };
    }

    let {id} = event.queryStringParameters;
    if (id === undefined) {
        return {
            statusCode: 200,
            body: JSON.stringify({})
        };
    }

    let response = await deleteCall(`https://api.netlify.com/api/v1/submissions/${id}?access_token=${process.env.NETLIFY_ACCESS_TOKEN}`);

    return {
        statusCode: 200,
        body: JSON.stringify({success: true})
    };
};

exports.handler = handler;
