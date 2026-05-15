const isInstagram =
    navigator.userAgent.toLowerCase().includes('instagram');

if (isInstagram) {

    const overlay = document.createElement('div');
    overlay.className = 'ig-overlay';

    overlay.innerHTML = `
        <div class="ig-modal">
            
            <h2>⚠️ Abra no navegador</h2>

            <p>
                Você está acessando pelo Instagram.<br>
                Para instalar o app corretamente, abra no <strong>Chrome</strong> ou <strong>Safari</strong>.
            </p>

            <button id="open-browser">
                Como abrir
            </button>

            <button id="close-modal" class="ghost">
                Agora não
            </button>

        </div>
    `;

    document.body.appendChild(overlay);

    document.getElementById('open-browser').addEventListener('click', () => {
        alert('Toque nos 3 pontos ⋮ no Instagram e escolha "Abrir no navegador".');
    });

    document.getElementById('close-modal').addEventListener('click', () => {
        overlay.remove();
    });
}