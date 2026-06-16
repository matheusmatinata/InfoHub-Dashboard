window.Storage = {
    // Gerenciamento de Tema
    getTheme: () => {
        return localStorage.getItem('infohub_theme') || 'light';
    },
    setTheme: (theme) => {
        localStorage.setItem('infohub_theme', theme);
        document.documentElement.setAttribute('data-theme', theme);
    },

    // Gerenciamento de Favoritos
    getFavorites: () => {
        const favs = localStorage.getItem('infohub_favorites');
        return favs ? JSON.parse(favs) : { ceps: [], countries: [] };
    },
    
    saveCep: (cepData) => {
        const favs = window.Storage.getFavorites();
        // Evita duplicação
        if (!favs.ceps.find(c => c.cep === cepData.cep)) {
            favs.ceps.push(cepData);
            localStorage.setItem('infohub_favorites', JSON.stringify(favs));
        }
    },

    saveCountry: (countryName) => {
        const favs = window.Storage.getFavorites();
        if (!favs.countries.includes(countryName)) {
            favs.countries.push(countryName);
            localStorage.setItem('infohub_favorites', JSON.stringify(favs));
        }
    }
};