
const supabaseUrl = "https://mzxyejlpsujiilfemjyd.supabase.co";
const supabaseKey = "sb_publishable__y3N_ypigy3lB4PAZTOSPg_N-QnGYNj";
const sup = window.supabase.createClient(supabaseUrl, supabaseKey);
const pass = document.querySelector("#txtPsw");
const btn = document.querySelector("#btnGo");

btn.addEventListener('click', checkPass);

async function readCoupon() {
    const params = new URLSearchParams(window.location.search);
    const code = atob(params.get("code"));
    redeemCoupon(code);
}

async function redeemCoupon(id) {
    const { data, error } = await sup.rpc("redeem_coupon_by_code", {
        coupon_code: id
    });

    if (error) {
        console.error(error);
    }

    if (!data.success) {
        alert(data.message);
    } else {
        console.log("Redimido:", data.data);
    }
}

async function checkPass() {
    const psw = pass.value;
    if(btoa(psw) == 'S2l3aWNpdGE='){
        console.log("Bon Appetit");
        readCoupon()
    }else {
        console.log("Bad Luck");
    }
}
