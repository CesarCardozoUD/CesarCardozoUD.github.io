import GroqAIManager from "./ia.js";

const btn = document.querySelector("#btnAnalyze");
const original_text_input = document.querySelector("#txtOriginal");
const response_text_output = document.querySelector("#response");
const counter_output = document.querySelector("#counter");

btn.addEventListener("click", handleAnalyzeClick);
original_text_input.addEventListener("input", handleChangetext);

response_text_output.addEventListener("mouseover", (e) => {
    if(e.target.matches("mid, high, low")){
        const tooltip = e.target.getAttribute("tooltip");
        mostrarTooltip(tooltip, e.pageX, e.pageY);
    }
});

response_text_output.addEventListener("mouseout", (e) => {
    if(e.target.matches("mid, high, low")){
        ocultarTooltip();
    }
});

function mostrarTooltip(text, x, y){
    const tooltip = document.getElementById("tooltip");

    tooltip.innerText = text;
    tooltip.style.left = x + "px";
    tooltip.style.top = y + "px";
    tooltip.style.opacity = 1;
}

function ocultarTooltip(){
    document.getElementById("tooltip").style.opacity = 0;
}

async function handleAnalyzeClick(){
    const text = original_text_input.value;
    const response = await GroqAIManager.analyzeText(text);
    response_text_output.innerHTML = response.replace('\\','');
}

async function handleChangetext(event){
    const text = event.target.value;
    counter_output.innerText = text.length + "/1000 Caracteres"
}