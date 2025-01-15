document.addEventListener('DOMContentLoaded', function() {
    const borderContainer = document.querySelector('.border__countries__info');
    const backBtn = document.getElementById('back');
    if (backBtn) {
        backBtn.addEventListener('click', () => window.location.href = 'index.html');
    }

    const toggleTheme = document.getElementById('toggle__theme');
    toggleTheme.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        document.body.classList.toggle('dark-mode');
    })

    const params = new URLSearchParams(window.location.search);
    console.log(params.get('name'));
    const countryName = params.get('name');
    const nativeName = params.get('nativeName');
    const population = params.get('population');
    const region = params.get('region');
    const subregion = params.get('subregion');
    const capital = params.get('capital');
    const topLevelDomain = params.get('topLevelDomain');
    const currency = params.get('currency');
    const languages = params.get('languages');
    const flag = params.get('flag');
    const borders = JSON.parse(params.get('borders') || '[]');

    document.getElementById('country-name').textContent = countryName;
    document.getElementById('country-population').textContent = population;
    document.getElementById('country-region').textContent = region;
    document.getElementById('country-capital').textContent = capital;
    document.getElementById('country-subregion').textContent = subregion;
    document.getElementById('country-nativename').textContent = nativeName;
    document.getElementById('country-topleveldomain').textContent = topLevelDomain;
    document.getElementById('country-currency').textContent = currency;
    document.getElementById('country-languages').textContent = languages;
    document.getElementById('country-flag').src = flag; 

    borders.forEach(border => {
        const spanElement = document.createElement('span');
        spanElement.textContent = border;
        borderContainer.appendChild(spanElement);
    });
});


