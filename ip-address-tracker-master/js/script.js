document.addEventListener('DOMContentLoaded', function() {
    let map = L.map('map').setView([51.505, -0.09], 13);
    const api = 'at_Kok8m7ilidJhuEa73mkTP9Z1thFjX';

    const searchBtn = document.querySelector('.main__arrow');
    const detailsContainer = this.documentElement.querySelector('.main__details');

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    let marker;
    
    searchBtn.addEventListener('click', () => {
        const ip = document.querySelector('.main__input').value.trim();
        if (ip) {
            fetchIpData(ip);
        } else {
            alert('Please enter a valid IP address.');
        }
    })


    function fetchIpData(ip) {
        const url = `https://geo.ipify.org/api/v2/country,city?apiKey=${api}&ipAddress=${ip}`;

        fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to feth data');
            }
            return response.json();
        })
        .then(data => {
            detailsContainer.innerHTML = `
                <h6 class="main__label">IP ADDRESS</h6>
                <h1 class="main__result">${data.ip}</h1>

                <h6 class="main__label">LOCATION</h6>
                <h1 class="main__result">${data.location.city}, ${data.location.region}</h1>

                <h6 class="main__label">TIMEZONE</h6>
                <h1 class="main__result">UTC ${data.location.timezone}</h1>

                <h6 class="main__label">ISP</h6>
                <h1 class="main__result">${data.isp}</h1>
            </div>
            `;

            const lat = data.location.lat;
            const lng = data.location.lng;

            map.setView([lat, lng], 13);

            if (marker) {
                map.removeLayer(marker);
            }

            marker = L.marker([lat, lng]).addTo(map)
                .bindPopup(`<b>IP Address:</b> ${data.ip}<br><b>Location:</b> ${data.location.city}, ${data.location.region}`)
                .openPopup();
        })
        .catch(error => {
            console.error('Error fetcing IP data:', error);
            alert('Could not retrieve IP details. Please try again.');
        });
    }
})