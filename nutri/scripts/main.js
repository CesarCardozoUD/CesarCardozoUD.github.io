// Crear DB
const db = new Dexie("plannerDB");

db.version(1).stores({
    tasks: "++id,date,title,description,isUrgent,isImportant,endline,done"
});

// DOM
const taskList = document.getElementById("taskList");
const doneList = document.getElementById("doneList");

const titleInput = document.getElementById("taskTitle");
const descInput = document.getElementById("taskDesc");
const urgencyInput = document.getElementById("taskUrgency");
const importantInput = document.getElementById("taskImportant");
const endlineInput = document.getElementById("taskEndline");

const addBtn = document.getElementById("addBtn");
const openBtn = document.getElementById("openBtn");
const closeBtn = document.getElementById("closeModalBtn");
const saveBtn = document.getElementById("saveTaskBtn");


loadTasks();

// abrir modal
openBtn.addEventListener("click", () => {
    modal.classList.remove("hidden");
});

// cerrar modal

closeBtn.addEventListener("click", closeModal);

function closeModal() {
    modal.classList.add("hidden");
    titleInput.value = "";
    descInput.value = "";
}

// guardar tarea

saveBtn.addEventListener("click", async () => {
    const title = titleInput.value.trim();
    const description = descInput.value.replace(/\n/g, "<br>");
    const endline = endlineInput.value.trim();
    const today = new Date(Date.now());
    const isUrgent = urgencyInput.checked;
    const isImportant = importantInput.checked;

    if (!title) return;
    await db.tasks.add({
        title,
        description,
        isUrgent,
        isImportant,
        endline,
        date: today,
        done: false
    });

    closeModal();
    loadTasks();
});

async function loadTasks() {
    const tasks = await db.tasks.toArray();
    taskList.innerHTML = "";
    doneList.innerHTML = "";

    let doneTasks = tasks.filter((item) => item.done)
    let todoTasks = tasks.filter((item) => !item.done)

    todoTasks.forEach(task => {
        const li = document.createElement("li");
        li.className = "task";

        if (task.done) li.classList.add("done");

        li.innerHTML = renderTaskCard(task);
        const btn = li.querySelector("button");

        btn.addEventListener("click", async () => {
            await db.tasks.update(task.id, {
                done: !task.done
            });

            loadTasks();
        });

        renderTaskCard(task)
        taskList.appendChild(li);
    });

    doneTasks.forEach(task => {
        const li = document.createElement("li");
        li.className = "task";

        if (task.done) li.classList.add("done");

        li.innerHTML = renderDoneCard(task);
        const retakeBtn = li.querySelector("#reTakebtn");
        const deletebtn = li.querySelector("#deleteBtn");

        retakeBtn.addEventListener("click", async () => {
            await db.tasks.update(task.id, {
                done: !task.done
            });
            loadTasks();
        });

        deletebtn.addEventListener("click", async () => {
            await db.tasks.delete(task.id);
            loadTasks();
        });

        doneList.appendChild(li);
    });
}


function renderTaskCard(task) {
    const title = task.title;
    const desc = task.description;
    const endline = new Date(Date.parse(task.endline));
    const date = new Date(Date.parse(task.date));

    const daysToGo = (endline - date)/(1000 * 3600 * 24)
    let priority = task.isUrgent + task.isImportant;

    if(daysToGo < 7){
        priority++
    }

    let priorIco = ''
    if(priority === 0){
        priorIco = `<span style='color: black; font'>${priority} <i class='fa-solid fa-angle-down' style='color: black;'></i></span>`
    } else if(priority === 1){
        priorIco = `<span style='color: blue;'>${priority} <i class='fa-solid fa-angle-up' style='color: blue;'></i></span>`
    } else if(priority === 2){
        priorIco = `<span style='color: orange;'>${priority} <i class='fa-solid fa-angles-up' style='color: orange;'></i></span>`
    } else {
        priorIco = `<span style='color: red;'>${priority} <i class='fa-solid fa-triangle-exclamation' style='color: red;'></i></span>`
    }

    return `
        <div class="task-card">
            <div class="task-card-content">
                <div class="task-card-title">
                    <h3>${title}</h3>
                    ${priorIco}
                </div>
                <div class="task-card-body">
                    <p>${desc}</p>
                </div>
            </div>
            <button class="task-card-action"><i class="fa-regular fa-calendar-check"></i></button>
        </div>
    `
}

function renderDoneCard(task) {
    const title = task.title;
    return `
        <div class="task-card-content">
            <div class="task-card-title">
                <h5>${title}</h5>
                <div>
                    <button id="reTakebtn"><i class="fa-solid fa-reply-all"></i></button>
                    <button id="deleteBtn"><i class="fa-solid fa-trash-can"></i></button>
                </div>
            </div>
        </div>
    `
}

// async function removeTasks() {
//     const tasks = await db.tasks.toArray();
//     taskList.innerHTML = "";

//     tasks.forEach(task => {
//         const li = document.createElement("li");
//         li.className = "task";

//         if (task.done) li.classList.add("done");

//         li.innerHTML = `<span>${task.title}</span><button>✔</button>`;
//         const btn = li.querySelector("button");

//         btn.addEventListener("click", async () => {
//             await db.tasks.update(task.id, {
//                 done: !task.done
//             });

//             loadTasks();
//         });

//         taskList.appendChild(li);
//     });
// }