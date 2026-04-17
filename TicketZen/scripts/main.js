const hashName = '13d4dfe44d413226fb9a9fb9e2bc46178217abd47532ba2d3f487a071f9f8c7c'
const hashCreditCard = '323b4a732f80c8223f3067da314e73a6550e5264a2149e0197d3b5c9d107f5c0'
const hashCVV = '51e8ea280b44e16934d4d611901f3d3afc41789840acdff81942c2f65009cd52'
const hashDate = 'd5ecacdbee7dd29ecf771028b51e3bbcee8c8632d111e0e4ee1933905f686deb'
const hashAddress = ''

const nameInput = document.querySelector("#name-field");
const dateInput = document.querySelector("#date-field");
const cvvInput = document.querySelector("#cvv-field");
const btnFinalizar = document.querySelector("#btn-finalizar");
const infoDate = document.querySelector("#tooltip-date");
const infoCVV = document.querySelector("#tooltip-cvv");

btnFinalizar.addEventListener('click', finishPursache);
document.querySelector("#error-propmt").classList.replace("show", "hidden")

async function sha256(text) {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));

  const hashHex = hashArray
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');

  return hashHex;
}

async function checkCredentials(){
    let cardInput = ''
    for(let i=1; i<=16; i++){
        const input = document.querySelector("#card-field-"+i);
        cardInput += input.value
    }
    cardInput = cardInput.trim();
    const hashedCardInput = await sha256(cardInput);

    if(hashedCardInput !== hashCreditCard){
        console.log('CARD')
        return false;
    }

    const formatedInput = nameInput.value.trim().replace(' ','').toUpperCase();
    const hashedNameInput = await sha256(formatedInput);
    const hashedDateInput = await sha256(dateInput.value);
    const hashedCVVInput = await sha256(cvvInput.value);

    if((hashedNameInput !== hashName) || (hashedDateInput !== hashDate) || (hashedCVVInput !== hashCVV)){
        return false;
    } else {
        return true;
    }
}

async function finishPursache(){
    const isValidData = await checkCredentials();
    const isAuth = localStorage.getItem(btoa('isAuth')) ?? '';
    if(isAuth!==''){
        window.location.href = "./vouchers.html";
        return;
    }
    if(!isValidData){
        document.querySelector("#error-propmt").classList.replace("hidden", "show");
        return;
    }
    localStorage.setItem('aXNBdXRo', 1);
    window.location.href = "./vouchers.html";
    return;
} 

infoDate.addEventListener("mouseover", (e) => {
    const tooltip = e.target.getAttribute("tooltip");
    mostrarTooltip(tooltip, e.pageX, e.pageY);
});

infoDate.addEventListener("mouseout", (e) => {
    ocultarTooltip();
});

infoCVV.addEventListener("mouseover", (e) => {
    const tooltip = e.target.getAttribute("tooltip");
    mostrarTooltip(tooltip, e.pageX, e.pageY);
});

infoCVV.addEventListener("mouseout", (e) => {
    ocultarTooltip();
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