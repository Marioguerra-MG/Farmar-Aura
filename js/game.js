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