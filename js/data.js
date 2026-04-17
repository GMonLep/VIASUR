const guiaDeCarga = {
    emisor: {
        tipo: "Cooperativa Pesquera",
        localidad: "Achao"
    },
    detalleCarga: {
        producto: "Salmón fresco",
        volumen: 1.5,
        requiereFrio: true,
        consignatario: "Frigorífico Austral"
    },
    ruta: {
        destino: "Puerto Montt",
        incluyeBarcaza: true,
        prioridad: "Alta (Salud/Perecible)"
    },
    impacto: {
        ahorroEstimado: 0.35
    },
    items: [
        { id: "P-001", descripcion: "Bandejas premium", peso: "120 kg", cliente: "Distribuidora Los Lagos" },
        { id: "P-002", descripcion: "Canastas de salmón", peso: "180 kg", cliente: "Mercado Central" },
        { id: "P-003", descripcion: "Lomos vacíos", peso: "200 kg", cliente: "Chef Gourmet" }
    ]
};

function formatPercent(value) {
    return `${Math.round(value * 100)}%`;
}

function renderGuiaDeCarga() {
    const products = document.getElementById('guia-products');
    const badge = document.getElementById('guia-route-badge');
    const action = document.getElementById('guia-action');

    if (!products || !badge || !action) return;

    badge.innerText = guiaDeCarga.ruta.incluyeBarcaza ? 'BARCAZA INCLUIDA' : 'SIN BARCAZA';

    products.innerHTML = guiaDeCarga.items.map(item => `
        <div class="rounded-3xl bg-white dark:bg-[#163428]/15 p-4 border border-outline-variant/10 shadow-sm">
            <div class="flex items-center justify-between mb-3">
                <span class="text-[10px] uppercase tracking-[0.35em] text-on-surface-variant">${item.id}</span>
                <span class="text-[10px] uppercase font-bold text-primary">${item.peso}</span>
            </div>
            <p class="font-semibold text-sm text-primary">${item.descripcion}</p>
            <p class="text-[11px] text-on-surface-variant mt-2">Cliente: ${item.cliente}</p>
        </div>
    `).join('');

    action.addEventListener('click', () => {
        const summary = `Guía de carga lista: ${guiaDeCarga.detalleCarga.producto} (${guiaDeCarga.detalleCarga.volumen} m³) en camino a ${guiaDeCarga.ruta.destino}.`;
        const toast = document.createElement('div');
        toast.className = 'fixed bottom-8 right-6 z-50 rounded-3xl bg-primary text-white px-5 py-4 shadow-xl animate-fade-up';
        toast.innerText = summary;
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('opacity-0');
            setTimeout(() => toast.remove(), 300);
        }, 2200);
    });
}

document.addEventListener('DOMContentLoaded', renderGuiaDeCarga);
