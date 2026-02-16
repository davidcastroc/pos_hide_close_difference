/** @odoo-module **/

console.warn("[pos_hide_close_difference] loaded ✅");

const SEL = ".close-pos-popup .d-flex.align-items-center.justify-content-between.text-muted.border-start.ps-2";

function kill() {
    document.querySelectorAll(SEL).forEach((el) => {
        el.style.setProperty("display", "none", "important");
        el.style.setProperty("visibility", "hidden", "important");
        el.style.setProperty("height", "0px", "important");
        el.style.setProperty("margin", "0px", "important");
        el.style.setProperty("padding", "0px", "important");
    });
}

function start() {
    // 1) mata de una
    kill();

    // 2) re-mata por si OWL re-renderiza
    let ticks = 0;
    const timer = setInterval(() => {
        kill();
        ticks++;
        if (ticks > 40) clearInterval(timer); // ~12s
    }, 300);

    // 3) y además observa cambios
    const body = document.body;
    if (!body) {
        setTimeout(start, 100);
        return;
    }
    const obs = new MutationObserver(() => kill());
    obs.observe(body, { childList: true, subtree: true });
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
} else {
    start();
}