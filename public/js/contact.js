import validate from './validate.js';

let form = document.querySelector('form[name="contact"]');

validate(form);

if (window.location.search.indexOf('success=yes') > -1) {
    // tmp for no flashmessage
    alert(form.getAttribute('success-message'));
}
