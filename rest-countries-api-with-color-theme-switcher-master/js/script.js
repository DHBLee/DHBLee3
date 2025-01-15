const toggleTheme = document.getElementById('toggle__theme');
const selectElement = document.getElementById('region-select');
const searchElement = document.getElementById('search');

toggleTheme.addEventListener('click', themeToggle);

selectElement.addEventListener('change', function(event) {
    const selectedRegion = event.target.value;
    filterCountries(selectedRegion);
});
searchElement.addEventListener('input', (event) => {
    const searchValue = event.target.value.toLowerCase();
    searchCountries(searchValue);
});

let dataStore;

function themeToggle() {
    document.body.classList.toggle('light-mode');
    document.body.classList.toggle('dark-mode')
}

fetch('data.json')
.then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
    }
    return response.json();
})
.then(data => {
    console.table(data);
    dataStore = data;
    createCountryElements(dataStore);
})
.catch(error => console.error('Error fetching data:', error));


function createCountryElements(data) {
    const countriesContainer = document.querySelector('.countries');

    countriesContainer.innerHTML = '';

    data.forEach(country =>  {
        const countryContainer = document.createElement('div');
        countryContainer.className = 'country';

        countryContainer.innerHTML = `
            <img src="${country.flags.png}" alt="">
            <div class="wrapper">
                <h2>${country.name}</h2>
                <ul>
                    <li>Population: <span id="population-homepage">${country.population}</span></li>
                    <li>Region: <span id="region-homepage">${country.region}</span></li>
                    <li>Capital: <span id="capital-homepage">${country.capital}</span></li>
                </ul>
            </div>
        `;

        countriesContainer.appendChild(countryContainer);

        countryContainer.addEventListener('click', countryDetails(country));
    });

}

function filterCountries(region) {
    if (region === "all") {
        createCountryElements(dataStore);
        return;
    }
    const filterCountries = dataStore.filter(country => country.region === region);
    createCountryElements(filterCountries);
}

function searchCountries(searchValue) {
    const filterCountries = dataStore.filter(country => 
        country.name.toLowerCase().includes(searchValue)
    );
    createCountryElements(filterCountries);
}

function countryDetails(country) {
    return function() {

        const borderCountries = getBorderCountries(country);
        const borderCountryNames = borderCountries.map(border => border.name);
        console.log(borderCountryNames)
        const queryString = new URLSearchParams({
            name: country.name,
            nativeName: country.nativeName,
            population: country.population,
            region: country.region,
            subregion: country.subregion,
            capital: country.capital,
            topLevelDomain: country.topLevelDomain,
            currency: country.currencies[0].name,
            languages: country.languages.map(language => language.name).join(', '),
            flag: country.flags.png,
            borders: JSON.stringify(borderCountryNames),
        }).toString();
        
        const url = `country_details.html?${queryString}`;
        console.log(url);  
        window.location.href = `country_details.html?${queryString}`;
    }
}

function getBorderCountries(country) {
    const borderCountries = dataStore.filter(item =>
        country.borders.includes(item.alpha3Code)
    );
    console.log(borderCountries);
    return borderCountries
}


