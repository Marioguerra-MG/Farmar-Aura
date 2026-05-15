function initAura() {

    if (!myAuraCode) {

        myAuraCode = generateAuraCode();

        localStorage.setItem(
            'userAuraCode',
            myAuraCode
        );
    }

    const codeText =
        document.createElement('p');

    codeText.classList.add('my-aura-code');

    codeText.innerHTML = `
        SUA AURA:
        <strong>${myAuraCode}</strong>
    `;

    auraVisual.parentElement.prepend(codeText);
}

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