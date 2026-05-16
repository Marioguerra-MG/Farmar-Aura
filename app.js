// Captura de elementos do DOM
const auraVisual = document.getElementById('aura-visual');
const auraTextPercent = document.getElementById('aura-text-percent');
const auraStatusLabel = document.getElementById('aura-status-label');
const friendInput = document.getElementById('friend-code-input');
const btnMatch = document.getElementById('btn-match');

// EstadosGlobais sincronizados com o LocalStorage
let myAuraCode = localStorage.getItem('userAuraCode') || '';
let auraPercent = parseInt(localStorage.getItem('auraPercent')) || 0;
let usedCodes = JSON.parse(localStorage.getItem('usedCodes')) || [];

// Inicialização da Aplicação
function initApp() {
    // 1. Garante que o usuário tem um código fixo dele
    if (!myAuraCode) {
        myAuraCode = generateAuraCode();
        localStorage.setItem('userAuraCode', myAuraCode);
    }

    // 2. Cria e exibe o bloco visual contendo o código do usuário
    const codeContainer = document.createElement('div');
    codeContainer.className = 'my-aura-code';
    codeContainer.innerHTML = `SUA AURA: <strong>${myAuraCode}</strong>`;
    document.querySelector('header').appendChild(codeContainer);

    // 3. Renderiza o estado salvo da Aura
    renderAuraState(auraPercent);

    // 4. Configuração dos Eventos
    btnMatch.addEventListener('click', handleMatch);
    friendInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') handleMatch(); });
}

// Mecanismo de Geração Criptográfica Simples de Código
function generateAuraCode() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let randomPart = '';
    for (let i = 0; i < 6; i++) {
        randomPart += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    const secret = 'AURA-X';
    let hash = 0;
    const full = randomPart + secret;
    for (let i = 0; i < full.length; i++) {
        hash += full.charCodeAt(i);
    }
    const signature = (hash % 999).toString().padStart(3, '0');
    return `AURA-${randomPart}-${signature}`;
}

// Validador matemático de códigos legítimos
function validateCode(code) {
    const regex = /^AURA-[A-Z0-9]{6}-\d{3}$/;
    if (!regex.test(code)) return false;

    const parts = code.split('-');
    const randomPart = parts[1];
    const signature = parts[2];
    
    let hash = 0;
    const full = randomPart + 'AURA-X';
    for (let i = 0; i < full.length; i++) {
        hash += full.charCodeAt(i);
    }
    return signature === ((hash % 999).toString().padStart(3, '0'));
}

// Algoritmo de Cálculo de Compatibilidade (Porcentagem Real)
function checkCompatibility(code1, code2) {
    if (!validateCode(code1) || !validateCode(code2)) return 0;

    const clean1 = code1.replace('AURA-', '');
    const clean2 = code2.replace('AURA-', '');

    let points = 0;
    const maxLength = Math.min(clean1.length, clean2.length);

    for (let i = 0; i < maxLength; i++) {
        if (clean1[i] === clean2[i]) points++;
    }

    return Math.round((points / maxLength) * 100);
}

// Gerenciador do Clique de Absorção
function handleMatch() {
    const friendCode = friendInput.value.trim().toUpperCase();

    if (!validateCode(friendCode)) {
        alert('Código inválido ou inexistente!');
        return;
    }
    if (friendCode === myAuraCode) {
        alert('Você não pode absorver sua própria aura de volta!');
        return;
    }
    if (usedCodes.includes(friendCode)) {
        alert('Esta energia de aura já foi completamente absorvida!');
        return;
    }

    const ganhoCalculado = checkCompatibility(myAuraCode, friendCode);

    // Se a quebra de compatibilidade for fatal (0 acertos de caracteres)
    if (ganhoCalculado === 0) {
        triggerGameOver();
        friendInput.value = '';
        return;
    }

    // Registra ganho legítimo
    usedCodes.push(friendCode);
    localStorage.setItem('usedCodes', JSON.stringify(usedCodes));

    // Soma ou avança a aura atual do usuário
    auraPercent += Math.ceil(ganhoCalculado / 2); // Divide por 2 para balancear o jogo e mantê-lo competitivo
    if (auraPercent > 100) auraPercent = 100;

    localStorage.setItem('auraPercent', auraPercent);
    renderAuraState(auraPercent);

    friendInput.value = '';
}

// Renderizador Dinâmico de Estados visuais do DOM
function renderAuraState(percent) {
    auraTextPercent.innerText = `${percent}%`;

    if (percent === 0) {
        auraVisual.className = 'aura-circle';
        auraStatusLabel.innerText = 'Aura Nula';
    } else if (percent > 0 && percent < 100) {
        auraVisual.className = 'aura-circle success';
        auraStatusLabel.innerText = '⚡ Aura Expandida';
        auraVisual.style.width = `${220 + (percent * 0.6)}px`;
        auraVisual.style.height = `${220 + (percent * 0.6)}px`;
    } else if (percent >= 100) {
        auraVisual.className = 'aura-circle supreme';
        auraStatusLabel.innerHTML = `SUPREMA 🔥 <br><button id="share-aura-btn">Copiar Status</button>`;
        document.getElementById('input-group').style.display = 'none';
        
        document.getElementById('share-aura-btn').addEventListener('click', () => {
            navigator.clipboard.writeText(`🔥 ALCANCEI O NÍVEL MÁXIMO! Minha Aura está em 100% no Farmar Aura. Meu código: ${myAuraCode}`);
            alert('Status copiado para a área de transferência!');
        });
    }
}

// Estado de Falha / Erro Crítico (Game Over de Sequência)
function triggerGameOver() {
    auraVisual.className = 'aura-circle fail';
    auraTextPercent.innerText = 'ERR';
    auraStatusLabel.innerText = 'AURA CORROÍDA';
    btnMatch.disabled = true;

    setTimeout(() => {
        auraPercent = 0;
        localStorage.setItem('auraPercent', 0);
        renderAuraState(0);
        btnMatch.disabled = false;
    }, 2000);
}

// Funcionalidade Viral de Convite via WhatsApp
const shareAppBtn = document.getElementById('share-app-btn');
if (shareAppBtn) {
    shareAppBtn.addEventListener('click', () => {
        const urlApp = window.location.href; // Captura o link dinamicamente (Vercel/Local)
        const mensagem = 
            `⚡ Ei! Qual é o nível da sua Aura?\n\n` +
            `Entra aí no app, copia seu código e me manda pra ver nossa compatibilidade! Meu código é: ${myAuraCode}\n\n` +
            `👉 ${urlApp}`;
        
        window.open(`https://wa.me/?text=${encodeURIComponent(mensagem)}`, '_blank');
    });
}

// Inicia ao carregar a janela
window.onload = initApp;