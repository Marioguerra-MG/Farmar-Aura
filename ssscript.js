document.addEventListener('DOMContentLoaded', () => {

    // =========================
    // ELEMENTOS
    // =========================

    const friendInput =
        document.getElementById('friend-code');

    const btnMatch =
        document.getElementById('btn-match');

    const auraVisual =
        document.getElementById('user-aura-visual');

    // =========================
    // GERAR AURA ÚNICA
    // =========================

    let myAuraCode =
        localStorage.getItem('userAuraCode');

    if (!myAuraCode) {

        myAuraCode = generateAuraCode();

        localStorage.setItem(
            'userAuraCode',
            myAuraCode
        );
    }

    // =========================
    // MOSTRAR CÓDIGO
    // =========================

    const codeText =
        document.createElement('p');

    codeText.classList.add('my-aura-code');

    codeText.innerHTML = `
        SUA AURA:
        <strong>${myAuraCode}</strong>
    `;

    auraVisual.parentElement.prepend(codeText);

    // =========================
    // DADOS
    // =========================

    let auraPercent =
        parseInt(
            localStorage.getItem('auraPercent')
        ) || 0;

    let usedCodes =
        JSON.parse(
            localStorage.getItem('usedCodes')
        ) || [];

    // =========================
    // INICIAR  updateAura();
    // =========================

    


    // =========================
    // INICIAR
    // =========================

    if (auraPercent >= 100) {

        supremeAura();

    } else {

        updateAura();
    }

    // =========================
    // BOTÃO
    // =========================

    btnMatch.addEventListener('click', () => {

        const friendCode =
            friendInput.value
                .trim()
                .toUpperCase();

        // VALIDAR

        if (!validateCode(friendCode)) {

            alert('Código inválido!');

            return;
        }

        // NÃO PODE USAR O PRÓPRIO

        if (friendCode === myAuraCode) {

            alert(
                'Você não pode usar sua própria aura!'
            );

            return;
        }

        // AURA REPETIDA

        if (usedCodes.includes(friendCode)) {

            alert(
                'Essa aura já foi absorvida!'
            );

            return;
        }

        // SALVAR AURA

        usedCodes.push(friendCode);

        localStorage.setItem(
            'usedCodes',
            JSON.stringify(usedCodes)
        );

        // =========================
        // COMPATIBILIDADE
        // =========================

        const compatible =
            checkCompatibility(
                myAuraCode,
                friendCode
            );

        // RESULTADO

        if (compatible) {

            successAura();

        } else {

            gameOver();
        }

        friendInput.value = '';

    });

    // =========================
    // GERAR AURA
    // =========================

    function generateAuraCode() {

        const chars =
            'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

        let randomPart = '';

        for (let i = 0; i < 6; i++) {

            randomPart +=
                chars.charAt(
                    Math.floor(
                        Math.random() * chars.length
                    )
                );
        }

        const secret = 'AURA-X';

        let hash = 0;

        const full =
            randomPart + secret;

        for (let i = 0; i < full.length; i++) {

            hash += full.charCodeAt(i);
        }

        const signature =
            (hash % 999)
                .toString()
                .padStart(3, '0');

        return `AURA-${randomPart}-${signature}`;
    }

    // =========================
    // VALIDAR AURA
    // =========================

    function validateCode(code) {

        const regex =
            /^AURA-[A-Z0-9]{6}-\d{3}$/;

        if (!regex.test(code)) {

            return false;
        }

        const parts = code.split('-');

        const randomPart = parts[1];

        const signature = parts[2];

        const secret = 'AURA-X';

        let hash = 0;

        const full =
            randomPart + secret;

        for (let i = 0; i < full.length; i++) {

            hash += full.charCodeAt(i);
        }

        const expected =
            (hash % 999)
                .toString()
                .padStart(3, '0');

        return signature === expected;
    }

    // =========================
    // COMPATIBILIDADE
    // =========================

    function checkCompatibility(code1, code2) {

        const clean1 =
            code1.replace('AURA-', '');

        const clean2 =
            code2.replace('AURA-', '');

        let points = 0;

        for (let i = 0; i < clean1.length; i++) {

            if (clean1[i] === clean2[i]) {

                points++;
            }
        }

        return points <= 2;
    }

    // =========================
    // SUCESSO
    // =========================

    function successAura() {

        let gain = 1;

        if (Math.random() < 0.15) {

            gain = 2;
        }

        const jackpot =
            Math.random() < 0.01;

        if (jackpot) {

            gain += 10;
        }

        auraPercent += gain;

        if (auraPercent > 100) {

            auraPercent = 100;
        }

        localStorage.setItem(
            'auraPercent',
            auraPercent
        );

        auraVisual.className =
            'aura-circle success';

        const size =
            220 + auraPercent;

        auraVisual.style.width =
            size + 'px';

        auraVisual.style.height =
            size + 'px';

        auraVisual.innerHTML = `
            <div class="aura-content">

                <h1 class="aura-percent">
                    0%
                </h1>

            </div>
        `;

        animateAura(auraPercent);

        if (auraPercent >= 100) {

            supremeAura();
        }
    }

    // =========================
    // GAME OVER
    // =========================

    function gameOver() {

        auraVisual.className =
            'aura-circle fail';

        auraVisual.innerHTML = `
            <div class="aura-content">

                <h1 class="game-over">
                    GAME OVER
                </h1>

            </div>
        `;

        auraVisual.style.width = '240px';

        auraVisual.style.height = '240px';

        btnMatch.disabled = true;

        setTimeout(() => {

            auraPercent = 0;

            localStorage.setItem(
                'auraPercent',
                auraPercent
            );

            updateAura();

            btnMatch.disabled = false;

        }, 2500);
    }

    // =========================
    // AURA PADRÃO
    // =========================

    function updateAura() {

        auraVisual.className =
            'aura-circle default';

        auraVisual.style.width = '220px';

        auraVisual.style.height = '220px';

        auraVisual.innerHTML = `
            <div class="aura-content">

                <h1 class="aura-percent">
                    ${auraPercent}%
                </h1>

            </div>
        `;
    }

    // =========================
    // ANIMAÇÃO
    // =========================

    function animateAura(target) {

        const percentElement =
            auraVisual.querySelector(
                '.aura-percent'
            );

        let current = 0;

        const interval =
            setInterval(() => {

                current++;

                percentElement.innerText =
                    current + '%';

                if (current >= target) {

                    clearInterval(interval);
                }

            }, 25);
    }

    // =========================
    // AURA SUPREMA
    // =========================

    function supremeAura() {

        auraVisual.className =
            'aura-circle supreme';

        auraVisual.innerHTML = `
            <div class="aura-content">

                <h1 class="aura-percent">
                    100%
                </h1>

                <button id="share-aura-btn">
                    Compartilhar Aura
                </button>

            </div>
        `;

        auraVisual.style.width = '340px';

        auraVisual.style.height = '340px';

        const shareBtn =
            document.getElementById(
                'share-aura-btn'
            );

        shareBtn.addEventListener('click', () => {

            generateAuraCard();
        });
    }

    // =========================
    // GERAR CARD
    // =========================

    function generateAuraCard() {

    const canvas =
        document.createElement('canvas');

    canvas.width = 1080;
    canvas.height = 1350;

    const ctx =
        canvas.getContext('2d');

    // =========================
    // FUNDO
    // =========================

    const gradient =
        ctx.createLinearGradient(
            0,
            0,
            1080,
            1350
        );

    gradient.addColorStop(0, '#0f051d');
    gradient.addColorStop(0.5, '#240046');
    gradient.addColorStop(1, '#000000');

    ctx.fillStyle = gradient;

    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    // =========================
    // PARTÍCULAS
    // =========================

    for (let i = 0; i < 120; i++) {

        const x =
            Math.random() * 1080;

        const y =
            Math.random() * 1350;

        const size =
            Math.random() * 4;

        ctx.beginPath();

        ctx.arc(
            x,
            y,
            size,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            'rgba(255,255,255,0.5)';

        ctx.fill();
    }

    // =========================
    // AURA GIGANTE
    // =========================

    const auraGradient =
        ctx.createRadialGradient(
            540,
            420,
            100,
            540,
            420,
            280
        );

    auraGradient.addColorStop(
        0,
        '#d8b4fe'
    );

    auraGradient.addColorStop(
        0.4,
        '#9333ea'
    );

    auraGradient.addColorStop(
        1,
        '#3b0764'
    );

    ctx.beginPath();

    ctx.arc(
        540,
        420,
        230,
        0,
        Math.PI * 2
    );

    ctx.fillStyle =
        auraGradient;

    ctx.shadowColor =
        '#c084fc';

    ctx.shadowBlur = 120;

    ctx.fill();

    // =========================
    // TEXTO 100%
    // =========================

    ctx.shadowBlur = 0;

    ctx.fillStyle = '#ffffff';

    ctx.font =
        'bold 140px Arial';

    ctx.textAlign = 'center';

    ctx.fillText(
        '100%',
        540,
        470
    );

    // =========================
    // TÍTULO
    // =========================

    ctx.fillStyle = '#ffd700';

    ctx.font =
        'bold 72px Arial';

    ctx.fillText(
        'AURA SUPREMA',
        540,
        820
    );

    // =========================
    // SUBTEXTO
    // =========================

    ctx.fillStyle =
        '#d8b4fe';

    ctx.font =
        '38px Arial';

    ctx.fillText(
        'Você alcançou o nível máximo',
        540,
        900
    );

    // =========================
    // LINHA
    // =========================

    ctx.strokeStyle =
        'rgba(255,255,255,0.2)';

    ctx.lineWidth = 3;

    ctx.beginPath();

    ctx.moveTo(240, 980);

    ctx.lineTo(840, 980);

    ctx.stroke();

    // =========================
    // CÓDIGO
    // =========================

    ctx.fillStyle = '#ffffff';

    ctx.font =
        'bold 42px Arial';

    ctx.fillText(
        myAuraCode,
        540,
        1060
    );

    // =========================
    // RODAPÉ
    // =========================

    ctx.fillStyle =
        'rgba(255,255,255,0.5)';

    ctx.font =
        '30px Arial';

    ctx.fillText(
        'Farmar Aura',
        540,
        1240
    );

    // =========================
    // DOWNLOAD
    // =========================

    const link =
        document.createElement('a');

    link.download =
        'aura-suprema.png';

    link.href =
        canvas.toDataURL('image/png');

    link.click();
}

});

// =========================
// TESTES
// =========================

// IR PARA 100%

window.maxAura = () => {

    localStorage.setItem(
        'auraPercent',
        100
    );

    location.reload();
};

// RESETAR

window.resetAura = () => {

    localStorage.setItem(
        'auraPercent',
        0
    );

    localStorage.setItem(
        'usedCodes',
        JSON.stringify([])
    );

    location.reload();
};