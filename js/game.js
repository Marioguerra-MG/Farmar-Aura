function handleMatch() {

    const friendCode =
        friendInput.value
            .trim()
            .toUpperCase();

    if (!validateCode(friendCode)) {

        alert('Código inválido!');
        return;
    }

    if (friendCode === myAuraCode) {

        alert(
            'Você não pode usar sua própria aura!'
        );

        return;
    }

    if (usedCodes.includes(friendCode)) {

        alert(
            'Essa aura já foi absorvida!'
        );

        return;
    }

    usedCodes.push(friendCode);

    localStorage.setItem(
        'usedCodes',
        JSON.stringify(usedCodes)
    );

    const compatible =
        checkCompatibility(
            myAuraCode,
            friendCode
        );

    if (compatible) {

        successAura();

    } else {

        gameOver();
    }

    friendInput.value = '';
}

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

    // =========================
    // ESCONDER INPUTS
    // =========================

    const inputGroup =
        document.querySelector(
            '.input-group'
        );

    inputGroup.style.display = 'none';

    // =========================
    // BOTÃO SHARE
    // =========================

    const shareBtn =
        document.getElementById(
            'share-aura-btn'
        );

    shareBtn.addEventListener(
        'click',
        () => {

            generateAuraCard();
        }
    );
}

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