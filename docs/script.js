function validateEmail(email) {
    // Expresión regular simplificada para validar email
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

const form = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const messageError = document.getElementById('messageError');

function showError(element, message) {
    element.textContent = message;
    element.style.display = 'block';
}

function hideError(element) {
    element.style.display = 'none';
}

function validateForm() {
    let isValid = true;

    if (nameInput.value.trim() === '') {
        showError(nameError, 'Name is required');
        isValid = false;
    } else {
        hideError(nameError);
    }

    if (!validateEmail(emailInput.value)) {
        showError(emailError, 'Please enter a valid email address');
        isValid = false;
    } else {
        hideError(emailError);
    }

    if (messageInput.value.trim() === '') {
        showError(messageError, 'Message is required');
        isValid = false;
    } else {
        hideError(messageError);
    }

    return isValid;
}

form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (!validateForm()) return;

    const formData = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        dateFrom: document.getElementById('dateFrom').value,
        dateTo: document.getElementById('dateTo').value,
        message: messageInput.value.trim()
    };
   
    fetch('https://underwater.blue:2001', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'text/html',
        },
        credentials: 'include', // Incluye cookies en la solicitud
        body: JSON.stringify(formData),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
    })
    .then(html => {
        document.body.innerHTML = html;
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('There was an error sending the message. Please try again.');
    });
});

// Validación en tiempo real
[nameInput, emailInput, messageInput].forEach(input => {
    input.addEventListener('input', function() {
        if (this === emailInput) {
            if (validateEmail(this.value)) {
                hideError(emailError);
            } else {
                showError(emailError, 'Please enter a valid email address');
            }
        } else {
            if (this.value.trim() !== '') {
                hideError(this.id + 'Error');
            }
        }
    });
});