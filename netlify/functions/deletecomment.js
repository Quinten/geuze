let https = require('https');

let deleteCall = (url) => {
    return new Promise((resFunc, rejFunc) => {
        let rq = https.request(url, {method: 'DELETE'}, res => {
            res.setEncoding('utf8');
            let body = '';
            res.on('data', data => {
                body += data;
            });
            res.on('end', () => {
                resFunc(body);
            });
        });
        rq.on('error', rejFunc);
        rq.end();
    });
};

let handler = async (event, context) => {

    if (process.env.NETLIFY_ACCESS_TOKEN === undefined) {
        return {
            statusCode: 200,
            body: JSON.stringify({error: 'No NETLIFY_ACCESS_TOKEN set in environment'})
        };
    }

    if (process.env.SITE_ID === undefined) {
        return {
            statusCode: 200,
            body: JSON.stringify({error: 'No SITE_ID set in environment'})
        };
    }

    let {user} = context.clientContext;
    if (user === undefined) {
        return {
            statusCode: 200,
            body: JSON.stringify({error: 'User is undefined. Try logging in again.'})
        };
    }

    let {id} = event.queryStringParameters;
    if (id === undefined) {
        return {
            statusCode: 200,
            body: JSON.stringify({error: 'id is undefined'})
        };
    }

    let response = await deleteCall(`https://api.netlify.com/api/v1/submissions/${id}?access_token=${process.env.NETLIFY_ACCESS_TOKEN}`);

    return {
        statusCode: 200,
        body: JSON.stringify({success: true, response})
    };
};

exports.handler = handler;
