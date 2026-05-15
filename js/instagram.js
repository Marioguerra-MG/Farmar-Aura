const isInstagram =
    navigator.userAgent.toLowerCase().includes('instagram');

if (isInstagram) {

    const aviso = document.createElement('div');
    aviso.className = 'instagram-warning';

    aviso.innerHTML = `
        <p>
            Você está acessando pelo Instagram.
            Para instalar o app corretamente, abra no seu navegador (Chrome ou Safari).
        </p>

        <button id="open-browser">
            Como abrir no navegador
        </button>
    `;

    document.body.prepend(aviso);

    document.getElementById('open-browser')
        .addEventListener('click', () => {
            alert(
                'Toque nos 3 pontos ⋮ no Instagram e selecione "Abrir no navegador".'
            );
        });
}