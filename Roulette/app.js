document.addEventListener("DOMContentLoaded", () => {
    const preguntas = [];
    const tituloInput = document.getElementById("titulo");
    const descripcionInput = document.getElementById("descripcion");
    const agregarPreguntaBtn = document.getElementById("agregarPregunta");
    const preguntasList = document.getElementById("preguntasList");
    const girarRuletaBtn = document.getElementById("girarRuleta");
    const modal = document.getElementById("modal");
    const modalClose = document.querySelector(".close");
    const preguntaTitulo = document.getElementById("preguntaTitulo");
    const preguntaDescripcion = document.getElementById("preguntaDescripcion");

    // Función para agregar una nueva pregunta
    agregarPreguntaBtn.addEventListener("click", () => {
        const titulo = tituloInput.value.trim();
        const descripcion = descripcionInput.value.trim();

        if (titulo && descripcion) {
            preguntas.push({ titulo, descripcion });
            actualizarListaPreguntas();
            tituloInput.value = "";
            descripcionInput.value = "";
        } else {
            alert("Ambos campos son requeridos");
        }
    });

    // Función para actualizar la lista visible de preguntas
    function actualizarListaPreguntas() {
        preguntasList.innerHTML = "";
        preguntas.forEach((pregunta, index) => {
            const li = document.createElement("li");
            li.textContent = `${pregunta.titulo}`;
            li.classList.add('question-card');
            preguntasList.appendChild(li);
        });
    }

    // Función para seleccionar una pregunta al azar y mostrarla en el modal
    girarRuletaBtn.addEventListener("click", () => {
        if (preguntas.length === 0) {
            alert("No hay preguntas para seleccionar");
            return;
        }

        const randomIndex = Math.floor(Math.random() * preguntas.length);
        const preguntaSeleccionada = preguntas.splice(randomIndex, 1)[0]; // Remueve y selecciona

        preguntaTitulo.textContent = preguntaSeleccionada.titulo;
        preguntaDescripcion.textContent = preguntaSeleccionada.descripcion;

        actualizarListaPreguntas(); // Actualizar la lista de preguntas
        mostrarModal();
    });

    // Función para mostrar el modal
    function mostrarModal() {
        modal.style.display = "flex";
    }

    // Función para cerrar el modal
    modalClose.addEventListener("click", () => {
        modal.style.display = "none";
    });

    // Cerrar el modal si se hace clic fuera de él
    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });
});
