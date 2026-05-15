document.addEventListener('DOMContentLoaded', () => {

    initAura();

    if (auraPercent >= 100) {

        supremeAura();

    } else {

        updateAura();
    }

    btnMatch.addEventListener('click', handleMatch);

});