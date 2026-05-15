let myAuraCode =
    localStorage.getItem('userAuraCode');

let auraPercent =
    parseInt(
        localStorage.getItem('auraPercent')
    ) || 0;

let usedCodes =
    JSON.parse(
        localStorage.getItem('usedCodes')
    ) || [];