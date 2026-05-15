const isInstagram =
    navigator.userAgent
        .toLowerCase()
        .includes('instagram');

if (isInstagram) {

    const aviso =
        document.createElement('div');

    aviso.className =
        'instagram-warning';

    aviso.innerHTML = `
        <p>
            Para instalar o app,
            abra no Chrome/Safari.
        </p>

        <button id="open-browser">
            Como instalar
        </button>
    `;

    document.body.prepend(aviso);

    document
        .getElementById('open-browser')
        .addEventListener('click', () => {

            alert(
                'Toque nos 3 pontos do Instagram e escolha "Abrir no navegador".'
            );
        });
}