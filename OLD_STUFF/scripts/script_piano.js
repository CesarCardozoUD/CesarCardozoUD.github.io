const pianoKeys = document.querySelectorAll(".piano-keys .key");

const mapper = new Map([["Cm", "C4"], ["C#m", "Cs4"],
        ["Dm", "D4"], ["D#m", "Ds4"],
        ["Em", "E4"],
        ["Fm", "F4"], ["F#m", "Fs4"],
        ["Gm", "G4"], ["G#m", "Gs4"],
        ["Am", "A4"], ["A#m", "As4"],
        ["Bm", "B4"], ["B#m", "Bs4"],
        ["C", "C"], ["C#", "Cs"],
        ["D", "D"], ["D#", "Ds"],
        ["E", "E"],
])

const demoList = ["Cm", "Em", "Am", "Bm", "Em", "G#m", "Bm", "C"];

var password = [];
var tokens = ["RQ==", "RCM=", "RQ==", "RCM=", "RQ==", "Qm0=", "RA==", "Qw==", "QW0="];

const inner = "PHNwYW4+UERGIEtleTogbm9XaXRob3V0TXlLaXNzPC9zcGFuPg==";


let audio = new Audio(`tunes/C.wav`);

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

const playTune = (note) => {
    let key = mapper.get(note);
    audio.src = `tunes/${key}.wav`;
    audio.play(); 
    const clickedKey = document.querySelector(`[data-note="${note}"]`);
    clickedKey.classList.add("active"); 
    password.push(note);
    if(password.length == 9){
        if(this.checkPass(password)){
            document.querySelector('#piano').classList.add("success")
        } else{
            document.querySelector('#piano').classList.add("error")
            password = [];
        }
    }
    setTimeout(() => {
        clickedKey.classList.remove("active");
    }, 150);
}


pianoKeys.forEach(key => {
    key.addEventListener("click", () => playTune(key.dataset.note));
});

const handleVolume = (e) => {
    audio.volume = e.target.value;
}

const showHideKeys = () => {
    pianoKeys.forEach(key => key.classList.toggle("hide"));
}

async function playFromArray(array){
    array.forEach(note => {
        document.querySelector(`[data-note="${note}"]`).click();
        setTimeout(() => {
        }, 150);
    });
}

function checkPass(input){
    for(let i=0; i<input.length; i++){
        if(input[i] != window.atob(tokens[i])){
            return false;
        }
    }
    document.querySelector('#secret').innerHTML = window.atob(inner);
    return true;
}

function reset(){
    document.querySelector('#piano').classList.remove("error");
    document.querySelector('#piano').classList.remove("success");
    password = [];
}
