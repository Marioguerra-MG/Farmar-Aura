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