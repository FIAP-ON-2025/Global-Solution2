document.addEventListener('DOMContentLoaded', () => {
    const btnDisparar = document.getElementById('btn-disparar');
    const btnNormalizar = document.getElementById('btn-normalizar');
    const selectRegiao = document.getElementById('select-regiao');
    const painelStatus = document.getElementById('painel-status');
    const textoStatus = document.getElementById('texto-status');
    const riscoPorcentagem = document.getElementById('risco-porcentagem');
    const logEnvio = document.getElementById('log-envio');

    const inputChuva = document.getElementById('input-chuva');
    const inputVento = document.getElementById('input-vento');
    const valChuva = document.getElementById('val-chuva');
    const valVento = document.getElementById('val-vento');

    const coordenadasRegioes = {
        'zona-sul': { lat: '-23.9542', lng: '-46.3312', nome: 'Zona Sul - Encostas e Morros' },
        'area-costeira': { lat: '-23.9275', lng: '-46.2991', nome: 'Distrito Industrial - Área Costeira' },
        'vale-central': { lat: '-23.9321', lng: '-46.3289', nome: 'Vale Central - Risco de Inundação' }
    };

    if (inputChuva && valChuva) {
        inputChuva.addEventListener('input', (e) => {
            valChuva.textContent = e.target.value;
        });
    }

    if (inputVento && valVento) {
        inputVento.addEventListener('input', (e) => {
            valVento.textContent = e.target.value;
        });
    }

    if (btnDisparar) {
        btnDisparar.addEventListener('click', () => {
            const regiaoChave = selectRegiao.value;
            
            if (!regiaoChave) {
                alert('Por favor, selecione uma região antes de disparar o alerta.');
                return;
            }

            const regiaoInfo = coordenadasRegioes[regiaoChave];
            const chuva = parseInt(inputChuva.value) || 0;
            const vento = parseInt(inputVento.value) || 0;
            
            logEnvio.innerHTML = ''; 
            logEnvio.style.display = 'block';

            injetarLog(`Conectando à constelação de 42 satélites LEO`, '#00d2ff');
            injetarLog(`Fluxo atualizado: 4.8 TB/s capturados na órbita terrestre.`, '#e2e8f0');
            injetarLog(`Região Alvo: ${regiaoInfo.nome} (Lat: ${regiaoInfo.lat} / Lng: ${regiaoInfo.lng})`, '#9d4edd');

            let protocolo = "";
            let statusClasse = "status-seguro";
            let statusTexto = "SISTEMA SEGURO: CONDIÇÕES ESTÁVEIS";
            let subTexto = "População em Segurança";

            if (chuva > 80 || vento > 90) {
                protocolo = "Evacuação Imediata e Sirenes";
                statusClasse = "status-critico";
                statusTexto = `PROTOCOLO ATIVO: ${protocolo.toUpperCase()}`;
                subTexto = `ALERTA EMITIDO PARA: ${regiaoInfo.nome}`;

                injetarLog(`Massa de ar extremamente instável detectada sobre as coordenadas.`, '#f87171');
                injetarLog(`ALERTA CRÍTICO DISPARADO: Risco de desastre iminente (Chuva: ${chuva}mm / Vento: ${vento}km/h)!`, '#ef4444');
                injetarLog(`Evacuação recomendada para áreas de risco via transmissão orbital satélite Chronos-4.`, '#ef4444');

            } else if (chuva > 40 || vento > 50) {
                protocolo = "Preparação e Isolamento";
                statusClasse = "status-alerta"; 
                statusTexto = `PROTOCOLO ATIVO: ${protocolo.toUpperCase()}`;
                subTexto = `ALERTA EMITIDO PARA: ${regiaoInfo.nome}`;

                injetarLog(`Anomalia climática moderada detectada (Chuva: ${chuva}mm / Vento: ${vento}km/h).`, '#9d4edd');
                injetarLog(`Notificação de preparação enviada às equipes de campo locais.`, '#9d4edd');

            } else {
                injetarLog(`Monitoramento sem anomalias críticas. Parâmetros normais de segurança.`, '#56d364');
            }

            painelStatus.className = `status-box ${statusClasse}`;
            textoStatus.textContent = statusTexto;
            riscoPorcentagem.textContent = subTexto;

            if (statusClasse !== "status-seguro") {
                btnNormalizar.style.display = 'block';
            } else {
                btnNormalizar.style.display = 'none';
            }
        });
    }

    if (btnNormalizar) {
        btnNormalizar.addEventListener('click', () => {
            const regiaoChave = selectRegiao.value;
            const nomeRegiao = regiaoChave ? coordenadasRegioes[regiaoChave].nome : 'a região selecionada';
            
            const confirmarReset = confirm(`Deseja normalizar o status da região: ${nomeRegiao}?`);
            if (confirmarReset) {
                painelStatus.className = 'status-box status-seguro';
                textoStatus.textContent = "NENHUM PROTOCOLO ATIVO NA REGIÃO";
                riscoPorcentagem.textContent = "População em Segurança";
                injetarLog(`STATUS NORMALIZADO: ${nomeRegiao} retornou às condições estáveis.`, '#56d364');
                btnNormalizar.style.display = 'none';
            }
        });
    }

    function injetarLog(texto, cor) {
        const timestamp = new Date().toLocaleTimeString('pt-BR');
        const p = document.createElement('p');
        p.style.color = cor;
        p.style.margin = '4px 0';
        p.innerHTML = `> [${timestamp}] ${texto}`;
        logEnvio.appendChild(p);
        logEnvio.scrollTop = logEnvio.scrollHeight;
    }
});