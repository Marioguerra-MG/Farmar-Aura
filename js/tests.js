window.maxAura = () => {

    localStorage.setItem(
        'auraPercent',
        100
    );

    location.reload();
};

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