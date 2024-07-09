function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const form = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const messageError = document.getElementById('messageError');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    let isValid = true;

    // Validaciones
    if (nameInput.value.trim() === '') {
        nameError.style.display = 'block';
        isValid = false;
    } else {
        nameError.style.display = 'none';
    }

    if (!validateEmail(emailInput.value)) {
        emailError.style.display = 'block';
        isValid = false;
    } else {
        emailError.style.display = 'none';
    }

    if (messageInput.value.trim() === '') {
        messageError.style.display = 'block';
        isValid = false;
    } else {
        messageError.style.display = 'none';
    }

    if (!isValid) return;

    const formData = {
        name: nameInput.value,
        email: emailInput.value,
        dateFrom: document.getElementById('dateFrom').value,
        dateTo: document.getElementById('dateTo').value,
        message: messageInput.value
    };
   
    fetch('https://underwater.blue:2001', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text(); // Esperamos HTML como respuesta
    })
    .then(html => {
        // Reemplazamos el contenido del body con el HTML recibido
        document.body.innerHTML = html;
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('There was an error sending the message. Please try again.');
    });
});

// Validación en tiempo real del email
emailInput.addEventListener('input', function() {
    if (validateEmail(this.value)) {
        emailError.style.display = 'none';
    } else {
        emailError.style.display = 'block';
    }
});
