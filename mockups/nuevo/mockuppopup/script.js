const POPUP = 3000; // Duración de la notificación en milisegundo

class Notification {
    constructor(message, type) {
        this.message = message;
        this.type = type;
        this.duration = 3000; // 3 segundos
        this.createNotification();
    }
    createNotification() {
        const mensajes = document.getElementById("mensajes");
        const notification = document.createElement('div');
        notification.classList.add('notification', this.type);
        notification.innerText = this.message;

        // Insertar la notificación al principio del div "mensajes"
        mensajes.insertBefore(notification, mensajes.firstChild);

        setTimeout(() => {
            this.removeNotification(notification);
        }, this.duration);
    }
    removeNotification(notification) {
        let opacity = 1;
        const fadeEffect = setInterval(() => {
            if (opacity <= 0.1) {
                clearInterval(fadeEffect);
                notification.remove();
            } else {
                notification.style.opacity = opacity;
                opacity -= 0.4;
            }
        }, 100);
    }
}

// Función para crear una notificación
function createNotification(day, marked) {
    const mensajes = document.getElementById("mensajes");
    const notification = document.createElement('div');
    notification.classList.add('notification');

    // Mensaje dependiendo de si el día está siendo marcado o desmarcado
    if (marked) {
        notification.innerText = `Día ${day} marcado.`;
        notification.classList.add('success'); // Si está marcado, usar el color verde
    } else {
        notification.innerText = `Día ${day} desmarcado.`;
        notification.classList.add('error'); // Si está desmarcado, usar el color naranja
    }

    // Insertar la notificación al principio del div "mensajes"
    mensajes.insertBefore(notification, mensajes.firstChild);

    // Eliminar la notificación después de 3 segundos
    setTimeout(() => {
        notification.remove();
    }, POPUP);
}

// Obtener todos los elementos con la clase "day" (días del calendario)
const days = document.querySelectorAll('.day');

// Agregar un event listener a cada día del calendario
days.forEach(day => {
    day.addEventListener('click', () => {
        // Obtener el número de día del día clickeado
        const dayNumber = parseInt(day.innerText);

        // Verificar si el día está marcado o no
        const marked = day.classList.toggle('marked');

        // Mostrar la notificación con el mensaje correspondiente
        createNotification(dayNumber, marked);
    });
});