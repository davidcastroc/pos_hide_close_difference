/** @odoo-module **/

console.warn("[pos_blind_close] loaded ✅");

function hideTopSummary() {
    const popup = document.querySelector(".close-pos-popup");
    if (!popup) return;

    // 1) Ocultar "X órdenes: ₡ total" en el header
    popup.querySelectorAll(".total-orders").forEach((el) => {
        el.style.setProperty("display", "none", "important");
    });

    // 2) Ocultar SOLO los bloques anteriores al primer input (conteos)
    const body = popup.querySelector(".modal-body");
    if (!body) return;

    const firstField = body.querySelector("input, textarea, select");
    if (!firstField) return;

    // Subir hasta el hijo directo de modal-body (inicio de la sección de conteos)
    let sectionStart = firstField;
    while (sectionStart && sectionStart.parentElement && sectionStart.parentElement !== body) {
        sectionStart = sectionStart.parentElement;
    }
    if (!sectionStart) return;

    // Esconder todos los hijos antes de sectionStart (resumen superior)
    const children = Array.from(body.children);
    for (const ch of children) {
        if (ch === sectionStart) break;
        ch.style.setProperty("display", "none", "important");
    }
}

function start() {
    hideTopSummary();

    const body = document.body;
    if (!body) {
        setTimeout(start, 100);
        return;
    }

    // OWL re-renderiza: observar y re-aplicar
    const obs = new MutationObserver(() => hideTopSummary());
    obs.observe(body, { childList: true, subtree: true });

    // Reaplicar unos segundos por si renderiza en caliente
    let ticks = 0;
    const timer = setInterval(() => {
        hideTopSummary();
        ticks++;
        if (ticks > 30) clearInterval(timer); // ~9s
    }, 300);
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
} else {
    start();
}
