
const supabaseUrl = "https://mzxyejlpsujiilfemjyd.supabase.co";
const supabaseKey = "sb_publishable__y3N_ypigy3lB4PAZTOSPg_N-QnGYNj";
const sup = window.supabase.createClient(supabaseUrl, supabaseKey);

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

readCoupon()