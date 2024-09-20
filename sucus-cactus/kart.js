document.querySelectorAll('.quantity input').forEach(input => {
    input.addEventListener('change', function () {
        const quantity = parseInt(this.value);
        const price = parseFloat(this.closest('tr').querySelector('td:nth-child(4)').textContent.replace('$', ''));
        const total = (quantity * price).toFixed(2);

        this.closest('tr').querySelector('td:nth-child(5)').textContent = `$${total}`;

        updateCartTotal();
    });
});

let cantEcheveria = 0;
let cantHaworthia = 0;
let cantJovibarba = 0;
let cantZamioculcas = 0;
let cantSedum = 0;


function updateCartTotal(id, val) {

    switch (id) {
        case 1: cantEcheveria = val; break;
        case 2: cantHaworthia = val; break;
        case 3: cantJovibarba = val; break;
        case 4: cantZamioculcas++; break;
        case 5: cantSedum++; break;
        default: break;
    }

    let total = (cantEcheveria * 15) + (cantHaworthia * 12) + (cantJovibarba * 13) + (cantZamioculcas * 15) + (cantSedum * 10);
    document.querySelector('.cart-summary span').textContent = `Total a Pagar: $${total.toFixed(2)}`;
}


var modal = document.getElementById("couponModal");
var openModalBtn = document.getElementById("openModal");
var closeModalBtn = document.querySelector(".close");

openModalBtn.onclick = function () {
    modal.style.display = "block";
}

closeModalBtn.onclick = function () {
    modal.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


document.getElementById('btnPay').addEventListener('click', function() {
    window.location.href = "./poem.html"
})

document.getElementById('applyCouponButton').addEventListener('click', function () {
    const couponCode = document.getElementById('couponCode').value.trim();
    if (couponCode.toUpperCase() === "O.WILDE") { 
        alert("Cupón aplicado. Envio habilitado para más de 4 items.");
        document.getElementById("btnPay").removeAttribute('disabled');
        modal.style.display = "none";
    } else {
        alert("Cupón inválido. Inténtalo de nuevo.");
    }
});
