document.addEventListener("DOMContentLoaded", function () {
    const passwordModal = document.getElementById("passwordModal");
    const showPasswordModal = document.getElementById("showPasswordModal");
    const recoverPasswordForm = document.getElementById("recoverPasswordForm");
    const recoverUser = document.getElementById("recoverUser");
    const recoverDNI = document.getElementById("recoverDNI");

    // Abre el modal de recuperación de contraseña
    document.querySelector(".forgot-password").addEventListener("click", function (event) {
        event.preventDefault(); // Prevenir la acción por defecto del enlace
        recoverUser.value = ""; // Limpiar campo de nombre de usuario
        recoverDNI.value = ""; // Limpiar campo de DNI
        passwordModal.style.display = "block"; // Mostrar el modal
    });

    // Cerrar el modal de recuperación de contraseña
    document.getElementById("closeModal").onclick = function () {
        passwordModal.style.display = "none";
    };

    // Cerrar el modal de mostrar contraseña
    document.getElementById("closeShowPasswordModal").onclick = function () {
        showPasswordModal.style.display = "none"; // Cerrar el modal
    };

    // Manejar el envío del formulario de recuperación de contraseña
    recoverPasswordForm.onsubmit = function (event) {
        event.preventDefault(); // Prevenir el envío normal del formulario

        const username = recoverUser.value;
        const dni = recoverDNI.value;

        fetch('/recuperar_contrasena', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user: username, dni: dni })
        })
        .then(response => response.json())
        .then(data => {
            const messageDiv = document.getElementById("passwordMessage");
            if (data.existe) {
                messageDiv.innerText = 'Tu contraseña es: ' + data.contrasena;
                showPasswordModal.style.display = "block"; // Mostrar el nuevo modal
            } else {
                messageDiv.innerText = 'Usuario o DNI incorrecto.';
            }
        })
        .catch(error => console.error('Error:', error));

        // Cerrar el modal de recuperación de contraseña
        passwordModal.style.display = "none";
    };

    // Cerrar los modales al hacer clic fuera de ellos
    window.onclick = function (event) {
        if (event.target === passwordModal) {
            passwordModal.style.display = "none"; // Cerrar el modal de recuperación
        } else if (event.target === showPasswordModal) {
            showPasswordModal.style.display = "none"; // Cerrar el modal de mostrar contraseña
        }
    };
});
