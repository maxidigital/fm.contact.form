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



function initMap() {
    // La ubicación del marcador
    var location = { lat: 39.905428, lng: 3.080284 };
    
    // El mapa, centrado en la ubicación
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: location,
        mapTypeControl: true, // Habilita el control de tipo de mapa
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
            position: google.maps.ControlPosition.TOP_LEFT
        }
    });
    
    // El marcador, posicionado en la ubicación
    var marker = new google.maps.Marker({ position: location, map: map });
    
    // El contenido del InfoWindow
    var infoContent = '<div style="text-align:center; font-size: 12px; padding: 5px; max-width: 150px;">' +
                      '<h4 style="margin: 0; font-size: 14px;">Freedive • Mallorca</h4>' +
                      '<p style="margin: 5px 0 0 0;">Carrer d\'Elcano, 23,<br>07470 Port de Pollença, Mallorca</p>' +
                      '</div>';
    
    // El InfoWindow, con el contenido anterior
    var infoWindow = new google.maps.InfoWindow({
        content: infoContent
    });
    
    // Abre el InfoWindow cuando se hace clic en el marcador
    marker.addListener('click', function() {
        infoWindow.open(map, marker);
    });
    
    // Opcional: Abre el InfoWindow automáticamente cuando se carga el mapa
    infoWindow.open(map, marker);
}


function initMap33() {
    // La ubicación del marcador
    var location = { lat: 39.9083, lng: 3.0823 };
    
    // El mapa, centrado en la ubicación
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: location,
        mapTypeControl: true, // Habilita el control de tipo de mapa
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
            position: google.maps.ControlPosition.TOP_LEFT
        }
    });
    
    // El marcador, posicionado en la ubicación
    var marker = new google.maps.Marker({ position: location, map: map });
    
    // El contenido del InfoWindow
    var infoContent = '<div style="text-align:center;"><h4>Freedive • Mallorca</h4><p>Carrer d\'Elcano, 23,<br>07470 Port de Pollença, Mallorca</p></div>';
    
    // El InfoWindow, con el contenido anterior
    var infoWindow = new google.maps.InfoWindow({
        content: infoContent
    });
    
    // Abre el InfoWindow cuando se hace clic en el marcador
    marker.addListener('click', function() {
        infoWindow.open(map, marker);
    });
    
    // Opcional: Abre el InfoWindow automáticamente cuando se carga el mapa
    infoWindow.open(map, marker);
}


function initMap22() {
    // La ubicación del marcador
    var location = { lat: 39.9083, lng: 3.0823 };
    // El mapa, centrado en la ubicación
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: location,
        mapTypeControl: true, // Habilita el control de tipo de mapa
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
            position: google.maps.ControlPosition.TOP_LEFT
        }
    });
    // El marcador, posicionado en la ubicación
    var marker = new google.maps.Marker({ position: location, map: map });
}