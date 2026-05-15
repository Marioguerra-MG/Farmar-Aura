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
    // INICIAR
    // =========================

    updateAura();

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

        // GERA 6 CARACTERES

        for (let i = 0; i < 6; i++) {

            randomPart +=
                chars.charAt(
                    Math.floor(
                        Math.random() * chars.length
                    )
                );
        }

        // CHAVE SECRETA

        const secret = 'AURA-X';

        // HASH

        let hash = 0;

        const full =
            randomPart + secret;

        for (let i = 0; i < full.length; i++) {

            hash += full.charCodeAt(i);
        }

        // ASSINATURA

        const signature =
            (hash % 999)
            .toString()
            .padStart(3, '0');

        // CÓDIGO FINAL

        return `AURA-${randomPart}-${signature}`;
    }

    // =========================
    // VALIDAR AURA
    // =========================

    function validateCode(code) {

        // FORMATO:
        // AURA-XXXXXX-999

        const regex =
            /^AURA-[A-Z0-9]{6}-\d{3}$/;

        if (!regex.test(code)) {

            return false;
        }

        // DIVIDIR

        const parts = code.split('-');

        const randomPart = parts[1];

        const signature = parts[2];

        // MESMA CHAVE

        const secret = 'AURA-X';

        // HASH

        let hash = 0;

        const full =
            randomPart + secret;

        for (let i = 0; i < full.length; i++) {

            hash += full.charCodeAt(i);
        }

        // ASSINATURA ESPERADA

        const expected =
            (hash % 999)
            .toString()
            .padStart(3, '0');

        // VALIDAÇÃO FINAL

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

        // COMPARA CARACTERES

        for (let i = 0; i < clean1.length; i++) {

            if (clean1[i] === clean2[i]) {

                points++;
            }
        }

        // CHANCE RARA

        return points <= 2;
    }

    // =========================
    // SUCESSO
    // =========================

    function successAura() {

        // GANHO DEVAGAR

        let gain = 1;

        // 15% DE CHANCE DE +2

        if (Math.random() < 0.15) {

            gain = 2;
        }

        // JACKPOT RARO

        const jackpot =
            Math.random() < 0.01;

        if (jackpot) {

            gain += 10;
        }

        auraPercent += gain;

        if (auraPercent > 100) {

            auraPercent = 100;
        }

        // SALVAR

        localStorage.setItem(
            'auraPercent',
            auraPercent
        );

        // VISUAL

        auraVisual.className =
            'aura-circle success';

        // TAMANHO

        const size =
            220 + auraPercent;

        auraVisual.style.width =
            size + 'px';

        auraVisual.style.height =
            size + 'px';

        // HTML

        auraVisual.innerHTML = `
            <div class="aura-content">

                <h1 class="aura-percent">
                    0%
                </h1>

            </div>
        `;

        // ANIMAR

        animateAura(auraPercent);

        // AURA SUPREMA

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

            </div>
        `;

        auraVisual.style.width = '340px';

        auraVisual.style.height = '340px';
    }

});