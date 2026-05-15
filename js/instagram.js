const isInstagram =
    navigator.userAgent.toLowerCase().includes('instagram');

if (isInstagram) {

    const link = 'https://farmar-aura.vercel.app/';

    const overlay = document.createElement('div');
    overlay.className = 'ig-overlay';

    overlay.innerHTML = `
        <div class="ig-modal">
            
            <h2>⚠️ Abra no navegador</h2>

            <p>
                Você está acessando pelo Instagram.<br>
                Para continuar, abra no <strong>Chrome</strong> ou <strong>Safari</strong>.
            </p>

            <button id="open-browser">
                📋 Copiar link e instruções
            </button>

            <button id="close-modal" class="ghost">
                Agora não
            </button>

        </div>
    `;

    document.body.appendChild(overlay);

    document.getElementById('open-browser').addEventListener('click', async () => {

        try {
            await navigator.clipboard.writeText(link);

            alert(
                `✔ Link copiado!\n\nAgora:\n1. Abra o Chrome ou Safari\n2. Cole o link\n\n${link}`
            );

        } catch (err) {
            alert(
                `Copie manualmente:\n\n${link}\n\nDepois abra no Chrome ou Safari.`
            );
        }
    });

    document.getElementById('close-modal').addEventListener('click', () => {
        overlay.remove();
    });
}