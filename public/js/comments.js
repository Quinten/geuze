import validate from './validate.js';
import flashmessage from './flashmessage.js';

let form = document.querySelector('form[name^="comments-"]');

validate(form);

if (window.location.search.indexOf('success=yes') > -1) {
    flashmessage(form.getAttribute('success-message'));
}

fetch('/.netlify/functions/comments?slug=' + form.getAttribute('name').replace('comments-', ''))
    .then(response => response.json())
    .then(comments => {
        if (comments && comments.length) {
            let html = '';
            comments.forEach(comment => {
                html = html + `<div card="true"><p><strong>${comment.name}</strong>:</p><p><em>${(new Date(comment.created_at)).toLocaleDateString('en', {year: 'numeric', month: 'long', day: 'numeric'})}</em></p><p>${comment.comment}</p></div>`;
            });
            document.getElementById('comments-list').innerHTML = html;
        }
    })
    .catch(console.error);
