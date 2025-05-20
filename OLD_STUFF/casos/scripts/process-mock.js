
var mock_uri = 'https://run.mocky.io/v3/b2217a7e-6a6b-4c73-aa95-d784cbf7817b'
var general_data = []
var last_idx = 0;

// Función para renderizar el caso clínico
function mostrarCasoClinico() {
    fetch(mock_uri)
        .then(response => response.json())
        .then(data => {
            let random_idx = Math.floor(Math.random() * data.length);
            this.last_idx = random_idx
            this.general_data = data;
            let caso = data[random_idx];
            this.generateRender(caso);
        })
        .catch(error => console.error('Error al cargar el JSON:', error));
}

function showRsta() {
    document.getElementById('respuesta').classList.replace('hidden', 'show');
}

function rerollCaso() {
    let caso = {};
    let new_idx = last_idx;
    while( new_idx === this.last_idx ){
        new_idx = Math.floor(Math.random() * this.general_data.length);
        caso = this.general_data[new_idx];
    }
    this.generateRender(caso);
}

function generateRender(casoClinico) {
    const contenido = document.getElementById('contenido');
    contenido.innerHTML = `
        <div class="section">
            <h2>Antecedentes</h2>
            <p><strong>Paciente:</strong> ${casoClinico.Antecedentes.Paciente}</p>
            <p><strong>Edad:</strong> ${casoClinico.Antecedentes.Edad}</p>
            <p><strong>Sexo:</strong> ${casoClinico.Antecedentes.Sexo}</p>
            <p><strong>Ocupación:</strong> ${casoClinico.Antecedentes.Ocupación}</p>
            <h3>Historial Médico:</h3>
            <ul>
                ${casoClinico.Antecedentes["Historial Médico"].map(item => `<li class="list-item">${item}</li>`).join('')}
            </ul>
        </div>

        <div class="section">
            <h2>Motivo de Consulta</h2>
            <p>${casoClinico["Motivo de Consulta"]}</p>
        </div>

        <div class="section">
            <h2>Historia de la Enfermedad Actual</h2>
            <p>${casoClinico["Historia de la Enfermedad Actual"]}</p>
        </div>

        <div class="section">
            <h2>Examen Físico</h2>
            <h3>Signos Vitales</h3>
            <p><strong>FC:</strong> ${casoClinico["Examen Físico"]["Signos Vitales"].FC}</p>
            <p><strong>FR:</strong> ${casoClinico["Examen Físico"]["Signos Vitales"].FR}</p>
            <p><strong>TA:</strong> ${casoClinico["Examen Físico"]["Signos Vitales"].TA}</p>
            <p><strong>T:</strong> ${casoClinico["Examen Físico"]["Signos Vitales"].T}</p>
            <p><strong>Peso:</strong> ${casoClinico["Examen Físico"].Peso}</p>
            <p><strong>Talla:</strong> ${casoClinico["Examen Físico"].Talla}</p>
            <p><strong>Abdomen:</strong> ${casoClinico["Examen Físico"].Abdomen}</p>
            <p><strong>Neurológico:</strong> ${casoClinico["Examen Físico"].Neurológico}</p>
            <p><strong>Otros:</strong> ${casoClinico["Examen Físico"].Otros}</p>
        </div>

        <div class="section">
            <h2>Laboratorio y Estudios de Imagen</h2>
            <h3>Laboratorios</h3>
            <ul>
                ${casoClinico["Laboratorio y Estudios de Imagen"].Laboratorios.map(lab => `<li class="list-item"><strong>${lab.Lab}:</strong> ${lab.Val}</li>`).join('')}
            </ul>
            <h3>Estudios de Imagen</h3>
            <ul>
                ${casoClinico["Laboratorio y Estudios de Imagen"]["Estudios de Imagen"].map(img => `<li class="list-item"><strong>${img.Img}:</strong> ${img.Val}</li>`).join('')}
            </ul>
        </div>

        <div class="section">
            <h2>Diagnóstico</h2>
            <p>${casoClinico.Diagnóstico}</p>
        </div>

        <div class="section">
            <h2>Tratamiento Inicial</h2>
            <p>${casoClinico["Tratamiento Inicial"]}</p>
        </div>

        <div class="section">
            <h2>Evolución Clinica</h2>
            <p>${casoClinico["Evolución Clinica"]}</p>
        </div>

        <div class="section">
            <h2>Tratamiento Continuado</h2>
            <p>${casoClinico["Tratamiento Continuado"]}</p>
        </div>

        <div class="section">
            <h2>Complicaciones</h2>
            <p>${casoClinico.Complicaciones}</p>
        </div>

        <div class="section">
            <h2>Resolución</h2>
            <p>${casoClinico.Resolución}</p>
        </div>

        <div class="section">
            <h2>Conclusión</h2>
            <p>${casoClinico.Conclusión}</p>
        </div>

        <div id="respuesta" class="section hidden">
            <h2>Respuesta Caso</h2>
            <h3>Plan Nutricional Inicial</h3>
            <p>${casoClinico["Respuesta Caso"]["Plan Nutricional Inicial"]}</p>
            <h3>Requerimientos Nutricionales</h3>
            <p><strong>Calorías:</strong> ${casoClinico["Respuesta Caso"]["Requerimientos Nutricionales"].Calorías}</p>
            <p><strong>Proteínas:</strong> ${casoClinico["Respuesta Caso"]["Requerimientos Nutricionales"].Proteinas}</p>
            <h3>Conducta Nutricional</h3>
            <p><strong>Tipo de dieta:</strong> ${casoClinico["Respuesta Caso"]["Conducta Nutricional"]["Tipo de dieta"]}</p>
            <p><strong>Vía de acceso:</strong> ${casoClinico["Respuesta Caso"]["Conducta Nutricional"]["Vía de acceso"]}</p>
            <p><strong>Tipo de fórmula:</strong> ${casoClinico["Respuesta Caso"]["Conducta Nutricional"]["Tipo de fórmula"]}</p>
            <h3>Recomendaciones Nutricionales</h3>
            <ul>
                ${casoClinico["Respuesta Caso"]["Recomendaciones Nutricionales"].map(rec => `<li class="list-item">${rec}</li>`).join('')}
            </ul>
        </div>`;
}
