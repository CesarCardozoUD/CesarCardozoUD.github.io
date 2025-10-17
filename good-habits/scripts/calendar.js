import { days, months, check_boxes } from "./enums.js";
import getFraseMotivadora from "./api_phrases.js";
import * as db from "./dashboard.js"

const fecha_hoy = new Date();
const initHistory = {
    habits: []
}

let check_boxes_bool = [
    false,
    false,
    false,
    false,
    false,
    false,
    false
]

let session_history = JSON.parse(localStorage.getItem("history"));


if (session_history === null) {
    localStorage.setItem("history", JSON.stringify(initHistory));
    session_history = JSON.parse(localStorage.getItem("history"));
}

const dia_semana_id = fecha_hoy.getDay();
const dia_mes_id = fecha_hoy.getDate();
const mes_id = fecha_hoy.getMonth();
const current_day = "" + dia_mes_id + "/" + (mes_id + 1) + "/" + fecha_hoy.getFullYear();


const loadCurrentDay = () => {
    document.getElementById("card-day-header").innerHTML = `
        <span class="work-sans-ligth">${days[dia_semana_id]}</span>
        <h1 class="work-sans-bold">${dia_mes_id} de ${months[mes_id]}
    `;
}

const loadHabitsCheckboxes = () => {
    let chkbox_habits = document.getElementById("card-day-body-chkbox");
    let innerHTMLText = "";
    for(let i=0; i<check_boxes.length; i++){
        innerHTMLText += `
            <div id='item_${i}'>
                <input type='checkbox' id='chk_box_${i}'>${check_boxes[i]}</input>
            </div>
        ` 
    }

    chkbox_habits.innerHTML = innerHTMLText;

    document.querySelectorAll("input[id^='chk']").forEach(function(e){
        e.addEventListener('change', check_action)
    });
}

const loadFoooterQuote = async () => {
    const phrase = await getFraseMotivadora();
    document.getElementById("card-day-footer").innerHTML = `
        <span>${phrase.phrase}</span>
    `;
}

const pop_hearts = (porcentaje) => {

    if(porcentaje > 0.20){
        document.getElementsByClassName("heart_1")[0].classList.replace('hidden', 'shown');
    } else {
        document.getElementsByClassName("heart_1")[0].classList.replace('shown', 'hidden');
    }


    if(porcentaje > 0.40){
        document.getElementsByClassName("heart_2")[0].classList.replace('hidden', 'shown');
    } else {
        document.getElementsByClassName("heart_2")[0].classList.replace('shown', 'hidden');
    }


    if(porcentaje > 0.70){
        document.getElementsByClassName("heart_3")[0].classList.replace('hidden', 'shown');
    } else {
        document.getElementsByClassName("heart_3")[0].classList.replace('shown', 'hidden');
    }


    if(porcentaje > 0.80){
        document.getElementsByClassName("heart_4")[0].classList.replace('hidden', 'shown');
    } else {
        document.getElementsByClassName("heart_4")[0].classList.replace('shown', 'hidden');
    }


    if(porcentaje > 0.90){
        document.getElementsByClassName("heart_5")[0].classList.replace('hidden', 'shown');
    } else {
        document.getElementsByClassName("heart_5")[0].classList.replace('shown', 'hidden');
    }
}

const check_action = (evt) => {
    const id_checked = evt.srcElement.id.split('_')[2];
    check_boxes_bool[id_checked] = evt.srcElement.checked;
    const num_checked = check_boxes_bool.filter(x => x).length;
    pop_hearts(num_checked/check_boxes_bool.length);
}

const save_day = () => {
    let new_log = {
        update_date: current_day
    }

    let results = {}
    document.querySelectorAll("input[id^='chk']").forEach(function(item){
        const idx = item.id.split('_')[2];
        results[check_boxes[idx]] = check_boxes_bool[idx];
    });

    new_log.checks = results;

    session_history.habits.push(new_log)
    localStorage.setItem("history", JSON.stringify(session_history));
    load_history();
    feed_dashboard();
}

const load_history = () => {
    if(session_history.habits.length === 0){
        console.log("No hay habitos registrados")
        return;
    }

    const today = session_history.habits.find(x => x.update_date == current_day);

    if(today === undefined){
        return;
    } else {
        document.querySelectorAll("input[id^='chk']").forEach(function(item){
            item.disabled = true;
        });
        document.getElementById("save-btn").disabled = true;
    }
}

const feed_dashboard = async () => {
    let dashboard_data = []
    check_boxes.forEach( function(item) {
        const streak = db.streak_habit(item, session_history.habits);
        dashboard_data.push({
            name: item,
            data: streak
        });
    });

    let inner_dashboard = "";
    for(let i=0; i<dashboard_data.length; i++){
        const rachaActual = dashboard_data[i].data.diasDesdeUltima;
        const percentage_streak = Math.ceil(rachaActual/1.5);

        const dasboard_section = `
            <div class="dashboard_card bg-streak-${percentage_streak}">
                <h1>${dashboard_data[i].name}</h1>
                <span> Racha Actual: ${rachaActual} </span>
                <br>
                <span> Racha más Larga: ${dashboard_data[i].data.rachaMasLarga} </span>
            </div>
        `;
        inner_dashboard += dasboard_section;
    }

    document.getElementById("dashboard").innerHTML = inner_dashboard;
}


document.getElementById("save-btn").addEventListener("click", save_day)
loadCurrentDay();
loadHabitsCheckboxes();
load_history();
feed_dashboard();