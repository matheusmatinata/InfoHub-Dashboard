window.UI = {
    renderError: (elementId, message = "Serviço temporariamente indisponível") => {
        document.getElementById(elementId).innerHTML = `<div class="error-msg">${message}</div>`;
    },

    renderCurrencies: (data) => {
        if (data.error) return window.UI.renderError('currencies-content');
        
        const content = `
            <div class="currency-item">
                <span class="currency-name">🇺🇸 USD/BRL</span>
                <span class="currency-val">${window.Helpers.formatCurrency(data.USDBRL.bid)}</span>
                <span class="currency-pct">${window.Helpers.formatPercentage(data.USDBRL.pctChange)}</span>
            </div>
            <div class="currency-item">
                <span class="currency-name">🇪🇺 EUR/BRL</span>
                <span class="currency-val">${window.Helpers.formatCurrency(data.EURBRL.bid)}</span>
                <span class="currency-pct">${window.Helpers.formatPercentage(data.EURBRL.pctChange)}</span>
            </div>
            <div class="currency-item">
                <span class="currency-name">₿ BTC/BRL</span>
                <span class="currency-val">${window.Helpers.formatCurrency(data.BTCBRL.bid)}</span>
                <span class="currency-pct">${window.Helpers.formatPercentage(data.BTCBRL.pctChange)}</span>
            </div>
        `;
        document.getElementById('currencies-content').innerHTML = content;
    },

    renderCepResult: (data) => {
        const container = document.getElementById('cep-content');
        if (data.error || data.erro) {
            container.innerHTML = `<div class="error-msg">CEP não encontrado ou inválido.</div>`;
            return;
        }

        container.innerHTML = `
            <div class="info-row"><strong>Rua:</strong> ${data.logradouro || 'N/A'}</div>
            <div class="info-row"><strong>Bairro:</strong> ${data.bairro || 'N/A'}</div>
            <div class="info-row"><strong>Cidade/UF:</strong> ${data.localidade} - ${data.uf}</div>
            <button id="btn-save-cep" class="btn-outline" style="margin-top: 10px;">⭐ Salvar</button>
        `;

        document.getElementById('btn-save-cep').addEventListener('click', () => {
            window.Storage.saveCep({ cep: data.cep, city: data.localidade, uf: data.uf });
            window.UI.renderFavorites();
            document.getElementById('btn-save-cep').textContent = '✔ Salvo';
        });
    },

    // CORRIGIDO: Mapeamento preciso de propriedades baseado no payload v5
    renderCountry: (country) => {
        if (country.error) return window.UI.renderError('country-content');

        // Adaptação para os nós nativos da resposta da API v5
        const name = country.names?.common || country.name || 'Desconhecido';
        const capital = country.capitals?.[0] || country.capital || 'N/A';
        const flagUrl = country.flags?.svg || country.flag_url || '';
        const population = country.demographics?.population?.toLocaleString('pt-BR') || country.population?.toLocaleString('pt-BR') || 'N/A';
        const region = country.geography?.region || country.region || 'N/A';

        document.getElementById('country-content').innerHTML = `
            <div style="margin-bottom: 12px;">
                ${flagUrl ? `<img src="${flagUrl}" alt="Bandeira" height="40" style="border-radius: 4px; box-shadow: 0 1px 3px rgba(0,0,0,0.3);">` : '🏳️'}
            </div>
            <div class="info-row"><strong>Nome:</strong> <span id="current-country-name">${name}</span></div>
            <div class="info-row"><strong>Capital:</strong> ${capital}</div>
            <div class="info-row"><strong>População:</strong> ${population}</div>
            <div class="info-row"><strong>Continente:</strong> ${region}</div>
        `;
        document.getElementById('btn-save-country').classList.remove('hidden');
    },

    renderJoke: (data) => {
        if (data.error) return window.UI.renderError('joke-content');
        
        document.getElementById('joke-content').innerHTML = `
            <div class="info-row"><strong>P:</strong> ${data.setup}</div>
            <div class="info-row" style="margin-top: 10px;"><strong>R:</strong> <em>${data.punchline}</em></div>
        `;
    },

    renderCatFact: (data) => {
        if (data.error) return window.UI.renderError('cat-content');
        
        document.getElementById('cat-content').innerHTML = `
            <div class="info-row">🐱 "${data.fact}"</div>
        `;
    },

    renderFavorites: () => {
        const favs = window.Storage.getFavorites();
        
        const cepsHTML = favs.ceps.length === 0 
            ? '<li>Nenhum CEP salvo</li>'
            : favs.ceps.map(c => `<li><span>${c.cep}</span> <span>${c.city}/${c.uf}</span></li>`).join('');
            
        const countriesHTML = favs.countries.length === 0
            ? '<li>Nenhum país salvo</li>'
            : favs.countries.map(c => `<li>${c}</li>`).join('');

        document.getElementById('list-fav-ceps').innerHTML = cepsHTML;
        document.getElementById('list-fav-countries').innerHTML = countriesHTML;
    }
};