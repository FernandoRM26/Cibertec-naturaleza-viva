// Validar DNI al perder el foco
document.getElementById('dni').addEventListener('blur', function() {
    const dni = this.value;
    fetch('/validar_dni', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ dni: dni })
    })
    .then(response => response.json())
    .then(data => {
        const dniError = document.getElementById('dni-error');
        if (data.existe) {
            dniError.style.display = 'block';
            dniError.textContent = 'Este DNI ya existe';
        } else {
            dniError.style.display = 'none';
            dniError.textContent = '';
        }
    })
    .catch(error => console.error('Error:', error));
});

// Validar usuario al perder el foco
document.getElementById('user').addEventListener('blur', function() {
    const username = this.value;
    fetch('/validar_usuario', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user: username })
    })
    .then(response => response.json())
    .then(data => {
        const userError = document.getElementById('user-error');
        if (data.existe) {
            userError.style.display = 'block';
            userError.textContent = 'Usuario ya existe';
        } else {
            userError.style.display = 'none';
            userError.textContent = '';
        }
    })
    .catch(error => console.error('Error:', error));
});

// Validar teléfono al ingresar datos
document.getElementById('tel').addEventListener('input', function() {
    const telefono = this.value;
    const telError = document.getElementById('tel-error');
    
    // Verificar si el teléfono tiene 9 dígitos y es solo numérico
    if (!/^\d{9}$/.test(telefono)) {
        telError.style.display = 'block';
        telError.textContent = 'El teléfono debe tener exactamente 9 dígitos.';
    } else {
        telError.style.display = 'none';
        telError.textContent = '';
    }
});

// Validar contraseñas - Regiistro
const passwInput = document.getElementById('passw');
const passwrInput = document.getElementById('passwr');
const passError = document.getElementById('pass-error');

passwrInput.addEventListener('input', function() {
    if (passwInput.value !== passwrInput.value) {
        passError.style.display = 'block';
        passError.textContent = 'Las contraseñas no coinciden.';
    } else if (passwrInput.value.length < 6) { // Longitud mínima ajustada a 6
        passError.style.display = 'block';
        passError.textContent = 'La contraseña debe tener al menos 6 caracteres.';
    } else {
        passError.style.display = 'none';
        passError.textContent = '';
    }
});

// Validación cruzada de contraseñas
passwInput.addEventListener('input', function() {
    passwrInput.dispatchEvent(new Event('input'));
});


// Validar campos antes de enviar el formulario
document.querySelector('.btn-submit').addEventListener('click', function(event) {
    const dniError = document.getElementById('dni-error').textContent;
    const userError = document.getElementById('user-error').textContent;
    const telError = document.getElementById('tel-error').textContent;
    const passError = document.getElementById('pass-error').textContent;

    // Verificar si hay mensajes de error
    if (dniError || userError || telError || passError) {
        event.preventDefault(); // Evitar el envío del formulario
        alert('Por favor, corrige los errores antes de enviar el formulario.');
    }
});
