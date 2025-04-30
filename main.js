// Menu Mobile
const menuBtn = document.querySelector('.botao-menu-mobile');
const nav = document.querySelector('.navegacao');

menuBtn.addEventListener('click', () => {
    nav.classList.toggle('ativo');
});

// Calculadora
const calcularBtn = document.getElementById('calcular');
const especieSelect = document.getElementById('especie');
const volumeInput = document.getElementById('volume');
const certificacaoSelect = document.getElementById('certificacao');
const resultadoUsd = document.getElementById('resultado-usd');
const resultadoEur = document.getElementById('resultado-eur');
const resultadoCny = document.getElementById('resultado-cny');

// Preços base por espécie (USD/m³)
const precosBase = {
    teca: 800,
    mogno: 1200,
    eucalipto: 300,
    bambu: 400
};

// Multiplicadores de certificação
const multiplicadoresCertificacao = {
    nenhuma: 1.0,
    fsc: 1.4,
    cerflor: 1.2
};

// Taxas de câmbio (exemplo)
const taxasCambio = {
    eur: 0.85,
    cny: 6.8
};

calcularBtn.addEventListener('click', () => {
    const especie = especieSelect.value;
    const volume = parseFloat(volumeInput.value);
    const certificacao = certificacaoSelect.value;
    
    if (volume <= 0) {
        alert('Por favor, insira um volume válido');
        return;
    }
    
    // Cálculo do valor base
    let valorBase = precosBase[especie] * volume;
    
    // Aplicar multiplicador de certificação
    valorBase *= multiplicadoresCertificacao[certificacao];
    
    // Calcular valores em outras moedas
    const valorEur = valorBase * taxasCambio.eur;
    const valorCny = valorBase * taxasCambio.cny;
    
    // Exibir resultados
    resultadoUsd.textContent = `$${valorBase.toLocaleString('pt-BR', { maximumFractionDigits: 2 })}`;
    resultadoEur.textContent = `€${valorEur.toLocaleString('pt-BR', { maximumFractionDigits: 2 })}`;
    resultadoCny.textContent = `¥${valorCny.toLocaleString('pt-BR', { maximumFractionDigits: 2 })}`;
});

// Chatbot
const abrirChatbotBtn = document.getElementById('abrir-chatbot');
const fecharChatbotBtn = document.getElementById('fechar-chatbot');
const chatbot = document.getElementById('chatbot');

abrirChatbotBtn.addEventListener('click', () => {
    chatbot.classList.add('ativo');
});

fecharChatbotBtn.addEventListener('click', () => {
    chatbot.classList.remove('ativo');
});

// Simulação de mapa (simplificada)
function initMapa() {
    const canvas = document.getElementById('mapa-global');
    const ctx = canvas.getContext('2d');
    
    // Definir tamanho do canvas
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    // Desenhar mapa simplificado
    ctx.fillStyle = '#74C69D';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Adicionar "regiões" com diferentes cores
    ctx.fillStyle = '#2D6A4F';
    ctx.beginPath();
    ctx.arc(canvas.width * 0.7, canvas.height * 0.3, 80, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = '#D4AF37';
    ctx.beginPath();
    ctx.arc(canvas.width * 0.3, canvas.height * 0.6, 120, 0, Math.PI * 2);
    ctx.fill();
    
    // Adicionar interação
    canvas.addEventListener('click', (e) => {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Verificar se clicou em uma região
        if (Math.sqrt(Math.pow(x - canvas.width * 0.7, 2) + Math.pow(y - canvas.height * 0.3, 2)) < 80) {
            alert('Região com demanda moderada por produtos florestais');
        } else if (Math.sqrt(Math.pow(x - canvas.width * 0.3, 2) + Math.pow(y - canvas.height * 0.6, 2)) < 120) {
            alert('Região com alta demanda por madeira certificada');
        }
    });
}

// Inicializar mapa quando a página carregar
window.addEventListener('load', initMapa);

// Suavizar rolagem para links âncora
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Fechar menu mobile se aberto
            if (nav.classList.contains('ativo')) {
                nav.classList.remove('ativo');
            }
        }
    });
});
/* Efeitos de partículas */
#particle-canvas {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    pointer-events: none;
}

/* Ajustes para conteúdo sobreposto */
.hero, .modulos, .mapa-demanda, .calculadora, .chatbot-secao {
    position: relative;
    z-index: 1;
}

/* Melhorar contraste com partículas */
.hero h2, .hero .subtitulo, 
.titulo-secao, .subtitulo-secao,
.cartao-modulo h3, .cartao-modulo p {
    text-shadow: 0 1px 3px rgba(0,0,0,0.2);
}
// Suavizar o carregamento das partículas
window.addEventListener('load', () => {
    setTimeout(() => {
        document.body.classList.add('particulas-carregadas');
    }, 500);
});

// Efeito de hover nas partículas (opcional)
document.addEventListener('mousemove', (e) => {
    if (window.particleSystem) {
        const particles = window.particleSystem.geometry.attributes.position.array;
        const mouseX = (e.clientX / window.innerWidth) * 2 - 1;
        const mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
        
        for (let i = 0; i < window.particleCount; i += 10) {
            const i3 = i * 3;
            const dx = mouseX * 50 - particles[i3];
            const dy = mouseY * 50 - particles[i3 + 1];
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 30) {
                particles[i3 + 2] += (30 - distance) * 0.1;
            }
        }
        window.particleSystem.geometry.attributes.position.needsUpdate = true;
    }
});