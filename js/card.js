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

    const bg =
        ctx.createLinearGradient(
            0,
            0,
            1080,
            1350
        );

    bg.addColorStop(0, '#080112');
    bg.addColorStop(1, '#1a0033');

    ctx.fillStyle = bg;

    ctx.fillRect(
        0,
        0,
        1080,
        1350
    );

    // =========================
    // CARD CENTRAL
    // =========================

    const cardX = 90;
    const cardY = 390;

    const cardWidth = 900;
    const cardHeight = 500;

    ctx.beginPath();

    roundRect(
        ctx,
        cardX,
        cardY,
        cardWidth,
        cardHeight,
        38
    );

    const cardGradient =
        ctx.createLinearGradient(
            cardX,
            cardY,
            cardX + cardWidth,
            cardY + cardHeight
        );

    cardGradient.addColorStop(
        0,
        '#5b21b6'
    );

    cardGradient.addColorStop(
        1,
        '#9333ea'
    );

    ctx.fillStyle =
        cardGradient;

    ctx.shadowColor =
        'rgba(168,85,247,0.45)';

    ctx.shadowBlur = 40;

    ctx.fill();

    ctx.shadowBlur = 0;

    // =========================
    // TEXTURA
    // =========================

    for (let i = 0; i < 140; i++) {

        const x =
            cardX + Math.random() * cardWidth;

        const y =
            cardY + Math.random() * cardHeight;

        const size =
            Math.random() * 3;

        ctx.beginPath();

        ctx.arc(
            x,
            y,
            size,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            'rgba(255,255,255,0.08)';

        ctx.fill();
    }

    // =========================
    // BLOCO ESQUERDO
    // =========================

    ctx.beginPath();

    roundRect(
        ctx,
        cardX,
        cardY,
        330,
        cardHeight,
        38
    );

    const leftGradient =
        ctx.createLinearGradient(
            cardX,
            cardY,
            cardX + 330,
            cardY + cardHeight
        );

    leftGradient.addColorStop(
        0,
        '#4c1d95'
    );

    leftGradient.addColorStop(
        1,
        '#6d28d9'
    );

    ctx.fillStyle =
        leftGradient;

    ctx.fill();

    // =========================
    // DIVISÃO
    // =========================

    ctx.fillStyle =
        'rgba(255,255,255,0.10)';

    ctx.fillRect(
        420,
        430,
        2,
        420
    );

    // =========================
    // TEXTO ESQUERDO
    // =========================

    ctx.textAlign =
        'center';

    ctx.fillStyle =
        '#ffffff';

    ctx.font =
        'bold 82px Arial';

    ctx.fillText(
        '100%',
        255,
        570
    );

    ctx.fillStyle =
        '#e9d5ff';

    ctx.font =
        'bold 38px Arial';

    ctx.fillText(
        'AURA',
        255,
        645
    );

    ctx.fillStyle =
        '#ffffff';

    ctx.font =
        '30px Arial';

    ctx.fillText(
        'SUPREMA',
        255,
        695
    );

    // =========================
    // BADGE
    // =========================

    ctx.beginPath();

    roundRect(
        ctx,
        145,
        745,
        220,
        58,
        30
    );

    const badgeGradient =
        ctx.createLinearGradient(
            145,
            745,
            365,
            803
        );

    badgeGradient.addColorStop(
        0,
        '#22c55e'
    );

    badgeGradient.addColorStop(
        1,
        '#16a34a'
    );

    ctx.fillStyle =
        badgeGradient;

    ctx.fill();

    ctx.fillStyle =
        '#ffffff';

    ctx.font =
        'bold 22px Arial';

    ctx.fillText(
        'ENERGIA MAX',
        255,
        783
    );

    // =========================
    // AURA DIREITA
    // =========================

    const aura =
        ctx.createRadialGradient(
            720,
            640,
            50,
            720,
            640,
            170
        );

    aura.addColorStop(
        0,
        '#ffffff'
    );

    aura.addColorStop(
        0.25,
        '#f3e8ff'
    );

    aura.addColorStop(
        0.5,
        '#c084fc'
    );

    aura.addColorStop(
        1,
        '#7e22ce'
    );

    ctx.beginPath();

    ctx.arc(
        720,
        640,
        150,
        0,
        Math.PI * 2
    );

    ctx.fillStyle =
        aura;

    ctx.shadowColor =
        '#d8b4fe';

    ctx.shadowBlur = 90;

    ctx.fill();

    ctx.shadowBlur = 0;

    // =========================
    // ANEL
    // =========================

    ctx.beginPath();

    ctx.arc(
        720,
        640,
        180,
        0,
        Math.PI * 2
    );

    ctx.strokeStyle =
        'rgba(255,255,255,0.14)';

    ctx.lineWidth = 5;

    ctx.stroke();

    // =========================
    // TITULO
    // =========================

    ctx.fillStyle =
        '#ffffff';

    ctx.font =
        'bold 62px Arial';

    ctx.fillText(
        'AURA SUPREMA',
        540,
        1010
    );

    // =========================
    // SUBTITULO
    // =========================

    ctx.fillStyle =
        'rgba(255,255,255,0.6)';

    ctx.font =
        '30px Arial';

    ctx.fillText(
        'Energia máxima desbloqueada',
        540,
        1070
    );

    // =========================
    // CODIGO
    // =========================

    ctx.fillStyle =
        '#c084fc';

    ctx.font =
        'bold 34px Arial';

    ctx.fillText(
        myAuraCode,
        540,
        1160
    );

    // =========================
    // FOOTER
    // =========================

    ctx.fillStyle =
        'rgba(255,255,255,0.25)';

    ctx.font =
        '24px Arial';

    ctx.fillText(
        'Farmar Aura',
        540,
        1260
    );

    // =========================
    // DOWNLOAD
    // =========================

    const link =
        document.createElement('a');

    link.download =
        'aura-card.png';

    link.href =
        canvas.toDataURL();

    link.click();
}

// =========================
// BORDA ARREDONDADA
// =========================

function roundRect(
    ctx,
    x,
    y,
    width,
    height,
    radius
) {

    ctx.moveTo(
        x + radius,
        y
    );

    ctx.lineTo(
        x + width - radius,
        y
    );

    ctx.quadraticCurveTo(
        x + width,
        y,
        x + width,
        y + radius
    );

    ctx.lineTo(
        x + width,
        y + height - radius
    );

    ctx.quadraticCurveTo(
        x + width,
        y + height,
        x + width - radius,
        y + height
    );

    ctx.lineTo(
        x + radius,
        y + height
    );

    ctx.quadraticCurveTo(
        x,
        y + height,
        x,
        y + height - radius
    );

    ctx.lineTo(
        x,
        y + radius
    );

    ctx.quadraticCurveTo(
        x,
        y,
        x + radius,
        y
    );

    ctx.closePath();
}