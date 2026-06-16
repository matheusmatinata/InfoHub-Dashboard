# InfoHub Dashboard 🌍📊

**InfoHub Dashboard** é uma aplicação web centralizada e responsiva desenvolvida inteiramente com Vanilla JavaScript. O projeto atua como um hub de informações em tempo real, consumindo dados de cinco APIs públicas diferentes para demonstrar habilidades sólidas de front-end, assincronicidade e manipulação do DOM.

## 🚀 Funcionalidades

- **Monitoramento de Moedas:** Exibe cotações em tempo real de Dólar, Euro e Bitcoin contra o Real (BRL), com atualização automática a cada 60 segundos.
- **Busca Rápida de CEP:** Consulta endereços brasileiros com tratamento e validação de erros.
- **Explorador de Países:** Sorteia um país aleatoriamente mostrando bandeira, capital, população e continente.
- **Entretenimento:** Exibição de piadas e fatos aleatórios sobre gatos através de consumo simples.
- **Sistema de Favoritos:** Permite que o usuário salve Cidades (CEP) e Países localmente usando o `localStorage`.
- **Tema Claro / Escuro:** Alternância de temas persistida no navegador do usuário.
- **Tratamento de Erros Silencioso:** Caso uma API fique fora do ar, o card exibe uma mensagem amigável sem quebrar o restante da aplicação.

## 🛠️ Tecnologias Utilizadas

Este projeto foi construído **sem o uso de frameworks ou bibliotecas**.

- **HTML5** (Semântico)
- **CSS3** (Variáveis CSS, CSS Grid, Flexbox, Design Responsivo)
- **JavaScript (ES6+)** (Fetch API, Async/Await, LocalStorage, Arrow Functions, Modularidade por Namespaces)

## 📡 APIs Utilizadas

Este projeto consome de forma assíncrona as seguintes APIs públicas:

1. [AwesomeAPI - Cotações](https://docs.awesomeapi.com.br/api-de-moedas) (`/last/USD-BRL,EUR-BRL,BTC-BRL`)
2. [ViaCEP](https://viacep.com.br/) (`/ws/{cep}/json/`)
3. [REST Countries v3.1](https://restcountries.com/) (`/all`)
4. [Official Joke API](https://github.com/15Dkatz/official_joke_api) (`/random_joke`)
5. [CatFact Ninja](https://catfact.ninja/) (`/fact`)

## 💻 Como Executar

Por ser um projeto puramente Front-End sem dependências de compilação, é extremamente simples de rodar:

1. Faça o clone deste repositório:
   ```bash
   git clone [https://github.com/seu-usuario/infohub-dashboard.git](https://github.com/seu-usuario/infohub-dashboard.git)