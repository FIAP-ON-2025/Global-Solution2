const btnDisparar = document.getElementById('btn-disparar');
const selectRegiao = document.getElementById('select-regiao');
const selectProtocolo = document.getElementById('select-protocolo');
const painelStatus = document.getElementById('painel-status');
const textoStatus = document.getElementById('texto-status');
const riscoPorcentagem = document.getElementById('risco-porcentagem');
const logEnvio = document.getElementById('log-envio');

btnDisparar.addEventListener('click', () => {
    const regiao = selectRegiao.value;
    const protocolo = selectProtocolo.value;

    if (!regiao) {
        alert('Por favor, selecione uma região antes de disparar o alerta.');
        return;
    }

    painelStatus.classList.remove('status-seguro');
    painelStatus.classList.add('status-perigo');
    textoStatus.textContent = `PROTOCOLO ATIVO: ${protocolo.toUpperCase()}`;
    riscoPorcentagem.textContent = `ALERTA EMITIDO PARA: ${regiao}`;

    const agora = new Date();
    const timestamp = agora.toLocaleTimeString('pt-BR');
    
    const novaEntrada = document.createElement('p');
    novaEntrada.innerHTML = `> [${timestamp}] <strong>DISPARO EFETUADO:</strong> ${protocolo} em ${regiao}. Transmissão orbital via satélite Chronos-4.`;
    
    logEnvio.style.display = 'block';
    logEnvio.prepend(novaEntrada);

    setTimeout(() => {
        const confirmarReset = confirm(`Deseja normalizar o status da região: ${regiao}?`);
        if (confirmarReset) {
            painelStatus.classList.remove('status-perigo');
            painelStatus.classList.add('status-seguro');
            textoStatus.textContent = "NENHUM PROTOCOLO ATIVO NA REGIÃO";
            riscoPorcentagem.textContent = "População em Segurança";
            
            const normalizacao = document.createElement('p');
            normalizacao.style.color = '#56d364';
            normalizacao.textContent = `> [${new Date().toLocaleTimeString()}] STATUS NORMALIZADO: ${regiao} em segurança.`;
            logEnvio.prepend(normalizacao);
        }
    }, 10000);
});
