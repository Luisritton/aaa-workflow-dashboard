// Variável de estado global para armazenar os dados da API
let listaAutomacoes = [];

// Seleção dos elementos da DOM
const btnCarregar = document.querySelector("#btnCarregar");
const campoBusca = document.querySelector("#campoBusca");
const containerAutomacoes = document.querySelector("#containerAutomacoes");
const contadorAutomacoes = document.querySelector("#contadorAutomacoes");

const urlAPI = "https://jsonplaceholder.typicode.com/users";

// Função assíncrona principal com Async/Await e Try/Catch
async function carregarAutomacoes() {
    containerAutomacoes.innerHTML = `<p class="empty-state">🔄 Conectando ao servidor de IA...</p>`;

    try {
        const resposta = await fetch(urlAPI);

        if(!resposta.ok) {
            throw new Error(`Erro no servidor: Status ${resposta.status}`);
        }

        listaAutomacoes = await resposta.json();

        // Habilita o campo de busca após carregar os dados
        campoBusca.disabled = false;

        // Renderiza a listagem completa
        renderizarDashboard(listaAutomacoes);

    } catch (erro) {
        console.error("Falha na requisição:", erro);
        containerAutomacoes.innerHTML = `<p class="empty-state" style="color: #ef4444;">❌ Falha ao carregar os fluxos: ${erro.message}</p>`;
    }
}

// Função responsável por desenhar os cartões na tela
function renderizarDashboard(dados) {
    containerAutomacoes.innerHTML = "";
    contadorAutomacoes.textContent = `Total: ${dados.length}`;

    if (dados.length === 0) {
        containerAutomacoes.innerHTML = `<p class="empty-state">Nenhuma automação encontrada.</p>`;
        return;
    }

    dados.forEach(function(item) {
        containerAutomacoes.innerHTML += `
            <div class="automation-item">
                <div class="automation-info">
                    <h3>🤖 Agente: ${item.name}</h3>
                    <p>Operador / Contato: <em>${item.email}</em> | Empresa: <strong>${item.company.name}</strong></p>
                </div>
                <span class="status-badge">🟢 Ativo</span>
            </div>
        `;
    });
}

// Evento de busca em tempo real (Filtro)
campoBusca.addEventListener("input", function() {
    const termo = campoBusca.value.toLowerCase();

    const filtrados = listaAutomacoes.filter(function(item) {
        return item.name.toLowerCase().includes(termo);
    });

    renderizarDashboard(filtrados);
});

// Evento de clique para carregar dados
btnCarregar.addEventListener("click", carregarAutomacoes);