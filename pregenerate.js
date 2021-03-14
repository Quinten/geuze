let NetlifyAPI = require('netlify');
let fs = require('fs');

let compareDates = (a, b) => Date.parse(a) < Date.parse(b);

let pregenerate = async () => {

    if (process.env.NETLIFY_ACCESS_TOKEN === undefined) {
        console.warn('NETLIFY_ACCESS_TOKEN not set');
        console.log('To see the comments in the admin section set an environment variable called NETLIFY_ACCESS_TOKEN');
        return;
    }
    let client = new NetlifyAPI(process.env.NETLIFY_ACCESS_TOKEN);

    if (process.env.SITE_ID === undefined) {
        console.warn('SITE_ID not set');
        return;
    }
    let forms = await client.listSiteForms({site_id: process.env.SITE_ID});

    let form_id = undefined;
    forms.forEach(form => {
        if (form.name === 'comments') {
            form_id = form.id;
        }
    });
    if (form_id === undefined) {
        console.log('No comments form present in Netlify for this site.');
        return;
    }

    // load existing json files
    let commentFiles = {};
    let files = fs.readdirSync('data/config/comments');
    files.forEach(file => {
        if (/\.json$/.test(file)) {
            let storedComments = JSON.parse(fs.readFileSync('data/config/comments/' + file));
            commentFiles[storedComments.page] = storedComments;
        }
    });

    let formComments = await client.listFormSubmissions({form_id});
    formComments.reverse();
    for (let c = 0; c < formComments.length; c++) {
        let comment = formComments[c];
        if (commentFiles[comment.data.page] === undefined) {
           commentFiles[comment.data.page] = {
               title: comment.data.page,
               page: comment.data.page,
               updated_at: '1970-01-01T00:00:00.000Z',
               commentslist: []
           };
        }
        let containsComment = false;
        let toRemove = [];
        commentFiles[comment.data.page].commentslist.forEach(filedComment => {
            if (comment.id === filedComment.id) {
                containsComment = true;
                if (filedComment.status === 'refused') {
                    // Remove from both
                    toRemove.push(filedComment);
                }
            }
        });
        for (let t = 0; t < toRemove.length; t++) {
            commentFiles[comment.data.page].commentslist.splice(commentFiles[comment.data.page].commentslist.indexOf(toRemove[t]), 1);
            await client.listFormSubmissions({submission_id: toRemove[t].id});
        }
        if (!containsComment) {
            if (compareDates(commentFiles[comment.data.page].updated_at, comment.created_at)) {
                // add to comments file
                commentFiles[comment.data.page].commentslist.unshift({
                    id: comment.id,
                    created_at: comment.created_at,
                    status: 'pending',
                    page: comment.data.page,
                    name: comment.data.name,
                    email: 'hidden',
                    comment: comment.data.comment
                });
            } else {
                // remove comment form netlify
                await client.listFormSubmissions({submission_id: comment.id});
            }
        }
    }

    Object.keys(commentFiles).forEach((prop) => {
        let commentFile = commentFiles[prop];
        commentFile.updated_at = (new Date()).toJSON();
        let filePath = commentFile.page.replace(/^\/blog\/(\S+)\/$/, 'data/config/comments/$1.json');
        fs.writeFileSync(filePath, JSON.stringify(commentFile));
    });
};

pregenerate();
