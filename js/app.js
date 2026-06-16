let apisLoadedCount = 0;
let allCountriesCache = [];

const updateApiStatus = (success) => {
    if (success) {
        apisLoadedCount = Math.min(apisLoadedCount + 1, 5);
    }
    document.getElementById('api-status').innerText = `${apisLoadedCount}/5`;
    document.getElementById('last-update').innerText = window.Helpers.getCurrentFormattedDate();
};

const initTheme = () => {
    const savedTheme = window.Storage.getTheme();
    document.documentElement.setAttribute('data-theme', savedTheme);
    const themeBtn = document.getElementById('theme-toggle');
    themeBtn.innerText = savedTheme === 'dark' ? '☀️' : '🌙';

    themeBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        window.Storage.setTheme(newTheme);
        themeBtn.innerText = newTheme === 'dark' ? '☀️' : '🌙';
    });
};

const loadCurrencies = async () => {
    const data = await window.API.getCurrencies();
    window.UI.renderCurrencies(data);
    updateApiStatus(!data.error);
};

// CORRIGIDO: Desembrulha a propriedade "data.objects" específica da API v5 Comercial
const loadRandomCountry = async () => {
    document.getElementById('country-content').innerHTML = '<div class="loader">Buscando...</div>';
    document.getElementById('btn-save-country').classList.add('hidden');
    document.getElementById('btn-save-country').innerHTML = '⭐ Salvar';

    if (allCountriesCache.length === 0) {
        const responseData = await window.API.getCountries();
        if (responseData.error) {
            window.UI.renderCountry({ error: true });
            return;
        }
        
        // A API v5 envelopa os resultados em data.objects
        allCountriesCache = responseData.data?.objects || (Array.isArray(responseData) ? responseData : []);
        
        if (allCountriesCache.length === 0) {
            window.UI.renderCountry({ error: true });
            return;
        }
        updateApiStatus(true);
    }
    
    const randomIdx = Math.floor(Math.random() * allCountriesCache.length);
    window.UI.renderCountry(allCountriesCache[randomIdx]);
};

const loadJoke = async () => {
    document.getElementById('joke-content').innerHTML = '<div class="loader">Pensando e traduzindo...</div>';
    const data = await window.API.getJoke();
    
    if (!data.error) {
        data.setup = await window.API.translate(data.setup);
        data.punchline = await window.API.translate(data.punchline);
    }
    
    window.UI.renderJoke(data);
    if(apisLoadedCount < 5) updateApiStatus(!data.error); 
};

const loadCatFact = async () => {
    document.getElementById('cat-content').innerHTML = '<div class="loader">Buscando e traduzindo...</div>';
    const data = await window.API.getCatFact();
    
    if (!data.error) {
        data.fact = await window.API.translate(data.fact);
    }
    
    window.UI.renderCatFact(data);
    if(apisLoadedCount < 5) updateApiStatus(!data.error);
};

const handleCepSearch = async () => {
    const input = document.getElementById('cep-input');
    const rawCep = input.value;
    const cleanCep = window.Helpers.cleanNumeric(rawCep);

    if (cleanCep.length !== 8) {
        alert("Por favor, digite um CEP válido com 8 números.");
        return;
    }

    document.getElementById('cep-content').innerHTML = '<div class="loader">Buscando...</div>';
    const data = await window.API.getCep(cleanCep);
    window.UI.renderCepResult(data);
    input.value = ''; 
};

const setupEventListeners = () => {
    document.getElementById('btn-search-cep').addEventListener('click', handleCepSearch);
    document.getElementById('cep-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleCepSearch();
    });

    document.getElementById('btn-new-country').addEventListener('click', loadRandomCountry);
    document.getElementById('btn-new-joke').addEventListener('click', loadJoke);
    document.getElementById('btn-new-cat').addEventListener('click', loadCatFact);

    document.getElementById('btn-save-country').addEventListener('click', (e) => {
        const countryName = document.getElementById('current-country-name').innerText;
        window.Storage.saveCountry(countryName);
        window.UI.renderFavorites();
        e.target.innerHTML = '✔ Salvo';
    });
};

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    window.UI.renderFavorites();
    setupEventListeners();

    Promise.allSettled([
        loadCurrencies(),
        loadRandomCountry(),
        loadJoke(),
        loadCatFact(),
        Promise.resolve().then(() => updateApiStatus(true)) 
    ]);

    setInterval(() => {
        loadCurrencies();
        document.getElementById('last-update').innerText = window.Helpers.getCurrentFormattedDate();
    }, 60000);
});