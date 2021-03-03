let validate = (form) => {
    form.addEventListener('submit', e => {
        let isValid = true;
        form.querySelectorAll('input, textarea').forEach((el) => {
            if (el.id !== 'dob') {
                if (el.value === '') {
                    isValid = false;
                    el.setAttribute('error', true);
                    if (el.nextElementSibling.tagName !== 'P') {
                        let errorMessage = document.createElement('p');
                        errorMessage.innerText = form.getAttribute('required-message');
                        el.parentNode.insertBefore(errorMessage, el.nextElementSibling);
                    }
                }
            }
        });
        if (!isValid) {
            e.preventDefault();
        }
    });
    form.querySelectorAll('input, textarea').forEach((el) => {
        el.addEventListener('keyup', e => {
            if (el.value === '') {
                el.setAttribute('error', true);
                if (el.nextElementSibling.tagName !== 'P') {
                    let errorMessage = document.createElement('p');
                    errorMessage.innerText = form.getAttribute('required-message');
                    el.parentNode.insertBefore(errorMessage, el.nextElementSibling);
                }
            } else {
                el.setAttribute('error', false);
                if (el.nextElementSibling.tagName === 'P') {
                    el.nextElementSibling.remove();
                }
            }
        });
    });
};

export default validate;
