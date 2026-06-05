const map = L.map('mapa-radar').setView([0, 0], 2);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

const issIcon = L.icon({
    iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/d0/International_Space_Station.svg',
    iconSize: [50, 32],
    iconAnchor: [25, 16]
});

const marker = L.marker([0, 0], { icon: issIcon }).addTo(map);

async function atualizarTelemetria() {
    try {
        const response = await fetch('https://api.wheretheiss.at/v1/satellites/25544');
        const data = await response.json();

        const { latitude, longitude, velocity } = data;

        marker.setLatLng([latitude, longitude]);
        map.panTo([latitude, longitude]);

        document.getElementById('display-lat').textContent = latitude.toFixed(4) + '°';
        document.getElementById('display-lng').textContent = longitude.toFixed(4) + '°';
        document.getElementById('display-vel').textContent = Math.round(velocity) + ' km/h';

    } catch (error) {
        console.error('Erro ao buscar telemetria:', error);
        document.getElementById('display-lat').textContent = 'Erro de Conexão';
    }
}

setInterval(atualizarTelemetria, 5000);
atualizarTelemetria();
