window.Helpers = {
    // Formata valor para Moeda Brasileira (BRL)
    formatCurrency: (value) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value);
    },

    // Retorna a data/hora atual formatada
    getCurrentFormattedDate: () => {
        const now = new Date();
        return now.toLocaleString('pt-BR', {
            day: '2-digit', month: '2-digit', year: 'numeric',
            hour: '2-digit', minute: '2-digit'
        });
    },

    // Formata o sinal da variação percentual
    formatPercentage: (value) => {
        const num = parseFloat(value);
        const prefix = num > 0 ? '+' : '';
        const className = num >= 0 ? 'positive' : 'negative';
        return `<span class="${className}">${prefix}${num.toFixed(2)}%</span>`;
    },

    // Remove caracteres não numéricos
    cleanNumeric: (str) => {
        return str.replace(/\D/g, '');
    }
};