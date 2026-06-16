window.API = {
    getCurrencies: async () => {
        try {
            const response = await fetch('https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL,BTC-BRL');
            if (!response.ok) throw new Error('Falha na API');
            return await response.json();
        } catch (error) {
            console.error('Erro Cotações:', error);
            return { error: true };
        }
    },

    getCep: async (cep) => {
        try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            if (!response.ok) throw new Error('Falha na API');
            return await response.json();
        } catch (error) {
            console.error('Erro CEP:', error);
            return { error: true };
        }
    },

getCountries: async () => {
    try {
        const response = await fetch('https://studies.cs.helsinki.fi/restcountries/api/all');

        if (!response.ok) throw new Error('Erro na requisição: ' + response.status);

        const json = await response.json();
        console.log('Resposta da API:', json);

        return json;
    } catch (error) {
        console.error('Erro na API:', error);
        return { error: true };
    }
},

    getJoke: async () => {
        try {
            const response = await fetch('https://official-joke-api.appspot.com/random_joke');
            if (!response.ok) throw new Error('Falha na API');
            return await response.json();
        } catch (error) {
            console.error('Erro Piada:', error);
            return { error: true };
        }
    },

    getCatFact: async () => {
        try {
            const response = await fetch('https://catfact.ninja/fact');
            if (!response.ok) throw new Error('Falha na API');
            return await response.json();
        } catch (error) {
            console.error('Erro Gatos:', error);
            return { error: true };
        }
    },

    // NOVO: Serviço de Tradução (MyMemory API - Gratuita)
    translate: async (text) => {
        try {
            const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|pt-br`);
            if (!response.ok) return text; 
            
            const data = await response.json();
            const translated = data.responseData?.translatedText;
            
            // Proteção Sênior: Se o limite diário gratuito for atingido, a API avisa na string.
            if (translated && translated.includes('MYMEMORY WARNING')) {
                console.warn('Limite de tradução diário atingido. Retornando texto original.');
                return text; 
            }
            
            return translated || text;
        } catch (error) {
            console.error('Erro na Tradução:', error);
            return text; // Fallback para inglês em caso de falha de rede
        }
    }
};