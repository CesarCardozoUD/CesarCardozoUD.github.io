import { stack } from "./models.js";

function cargarStack(stack) {
    let contenedor = document.getElementById("stack-contenedor");

    const stackFront = stack.filter(skill => skill.grupo === "frontend")
    const stackBack = stack.filter(skill => skill.grupo === "backend")
    const stackBD = stack.filter(skill => skill.grupo === "BD")
    const stackTools = stack.filter(skill => skill.grupo === "tools")
    const stackSoft = stack.filter(skill => skill.grupo === "Softskills")

    contenedor.appendChild(createStackSection("FRONTEND", stackFront));
    contenedor.appendChild(createStackSection("BACKEND", stackBack));
    contenedor.appendChild(createStackSection("BD", stackBD));
    contenedor.appendChild(createStackSection("CLOUD", stackTools));
    contenedor.appendChild(createStackSection("SOFTSKILLS", stackSoft));
}

function renderStack(stackGroup, container) {
    stackGroup.forEach(tech => {
        const item = document.createElement("div");
        item.classList.add("stack-item");

        item.innerHTML = `
        <div class="circular-progress" style="--percentage: ${tech.nivel}; --color: ${tech.color};">
          ${tech.nivel}%
        </div>
        <p><strong>${tech.nombre}</strong></p>
        <p>${tech.nivel_txt}</p>
      `;

        container.appendChild(item);
    });
    return container;
}

function createStackSection(tittle, stack){
    let group = document.createElement('div');
    group.classList.add("stack-group");

    group = renderStack(stack, group);

    const section = document.createElement('div');

    section.classList.add("stack-tittle");
    section.innerHTML = `<h1 class="vertical-text">${tittle}</h1>`;
    section.appendChild(group);

    return section;
}

document.addEventListener("DOMContentLoaded", () => {
    cargarStack(stack);
});
