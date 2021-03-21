import validate from './validate.js';
import flashmessage from './flashmessage.js';

let form = document.querySelector('form[name^="comments-"]');

validate(form);

let cacheBust = '';

if (window.location.search.indexOf('success=yes') > -1) {
    flashmessage(form.getAttribute('success-message'));
    cacheBust = '&bust=' + Math.random();
}

let token = localStorage.getItem('gotrue.user');
let deleteHtml = '';
if (token !== null) {
    token = JSON.parse(token);
    if (token.token && token.token.access_token) {
        token = token.token.access_token;
        deleteHtml = ' - <a href="javascript:void(0)" delete-comment="$1">delete</a>';
    }
}

fetch('/.netlify/functions/comments?slug=' + form.getAttribute('name').replace('comments-', '') + cacheBust)
    .then(response => response.json())
    .then(comments => {
        if (comments && comments.length) {
            let html = '';
            comments.reverse();
            comments.forEach(comment => {
                html = html + `<div class="card"><p><strong>${comment.name}</strong> - <em>${(new Date(comment.created_at)).toLocaleDateString('en', {year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric'})}</em>${deleteHtml.replace('$1', comment.id)}</p><p>${comment.comment.replace(/\n|\r\n/g, '<br>').replace(/(https?:\/\/\S+)/g, '<a href="$1" target="_blank">$1</a>')}</p></div>`;
            });
            document.getElementById('comments-list').innerHTML = html;
            if (token) {
                document.querySelectorAll('a[delete-comment]').forEach(element => {
                    element.addEventListener('click', e => {
                        fetch('/.netlify/functions/deletecomment?id=' + element.getAttribute('delete-comment'), {headers: {Authorization: 'Bearer ' + token}})
                            .then(response => response.json())
                            .then(data => {
                                if (data.success) {
                                    flashmessage('Comment deleted!');
                                }
                                if (data.error) {
                                    flashmessage(data.error, true);
                                }
                            })
                            .catch(console.error);
                        let card = element.parentElement.parentElement;
                        card.remove();
                    });
                });
            }
        }
    })
    .catch(console.error);
