import validate from './validate.js';
import flashmessage from './flashmessage.js';

let form = document.querySelector('form[name="contact"]');

validate(form);

if (window.location.search.indexOf('success=yes') > -1) {
    flashmessage(form.getAttribute('success-message'));
}
