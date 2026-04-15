const supabaseUrl = "https://mzxyejlpsujiilfemjyd.supabase.co";
const supabaseKey = "sb_publishable__y3N_ypigy3lB4PAZTOSPg_N-QnGYNj";
const reddemURL = "https://cesarcardozoud.github.io/TicketZen/coupon.html";

const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);
const grilla = document.querySelector("#coupons-grid");

async function loadCoupons() {
    const { data, error } = await supabase.rpc("get_coupons");
    if (error) {
        console.error("Error:", error);
        return;
    }
    renderCoupons(data);
}

async function renderCoupons(cupones) {
    for (let i = 0; i < cupones.length; i++) {
        const redeem = cupones[i].redeemed_at ?? '';
        let formatedRedeem = redeem !== ''? (new Date(redeem)).toISOString().split('T')[0].replaceAll('-', '/'): ''
        const type = cupones[i].code.split('-')[0];
        let ticket = ``
        ticket = `
            <!-- Ticket -->
            <div class="ticket flip-card ${type}" id="${cupones[i].code}">
                <div class="flip-card-inner">
                    <!-- FRENTE -->
                    <div class="flip-card-front">
                        <div class="ticket-img">
                            <img src="./assets/${type}-BG.jpg" alt="Imagen evento" />
                        </div>
                        <div class="ticket-body">
                            <div class="ticket-title">${cupones[i].tittle}</div>
                            <div class="ticket-desc">${cupones[i].description}</div>
                            <div class="ticket-footer">
                                <div class="price">${cupones[i].is_redeemed ? 'REDIMIDO EL ' + formatedRedeem : 'DISPONIBLE'}</div>
                                <button class="btn ${cupones[i].is_redeemed ? 'hidden' : ''}" onclick="generateQR('${cupones[i].code}')">Redimir</button>
                            </div>
                        </div>
                    </div>
                    <!-- BACK -->
                    <div class="flip-card-back">
                        <div id="${cupones[i].code}-QR" class="QR"></div>
                    </div>
                </div>
            </div>
        `
        grilla.innerHTML += ticket;
    }
}

async function generateQR(id) {
    const url = reddemURL + "?code=" + btoa(id);
    const container = document.getElementById(id+"-QR");

    let darkColor = "#000000"
    let lightColor = "#FFFFFF"

    switch(id.split('-')[0]){
        case "ROMANTIC":
            lightColor = "#FFB7B2"
            break;
        case "SEXY":
            lightColor = "#F44848"
            break;
        case "SURVIVE":
            lightColor = "#B2E2F2"
            break;
        case "LOWCOST":
            lightColor = "#C3E5AE"
            break;
        default:
            break;
    }

    container.innerHTML = "";

    if (!url) {
        alert("Ingresa una URL");
        return;
    }

    new QRCode(container, {
        text: url,
        width: 200,
        height: 200,
        colorDark: darkColor,
        colorLight: lightColor,
    });

    flipCard(id);
}

window.generateQR = generateQR;
loadCoupons()