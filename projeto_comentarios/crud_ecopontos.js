const form = document.getElementById('formCrudEcoponto');
const tbody = document.querySelector('#tabelaEcopontos tbody');
const inputId = document.getElementById('ecopontoId');
const inputNome = document.getElementById('nomePonto');
const inputEndereco = document.getElementById('enderecoPonto');
const inputCapacidade = document.getElementById('capacidade');
const inputStatus = document.getElementById('status');

let ecopontos = JSON.parse(localStorage.getItem('ecopontos')) || [];

function renderizarTabela() {
    tbody.innerHTML = '';
    ecopontos.forEach(eco => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td style="padding: 12px; border-bottom: 1px solid #D9D9D9;">${eco.nome}</td>
            <td style="padding: 12px; border-bottom: 1px solid #D9D9D9;">${eco.endereco}</td>
            <td style="padding: 12px; border-bottom: 1px solid #D9D9D9;">${eco.capacidade} Ton</td>
            <td style="padding: 12px; border-bottom: 1px solid #D9D9D9; color: ${eco.status === 'ativo' ? '#247027' : '#FF0606'}; font-weight: 500;">
                ${eco.status === 'ativo' ? 'Ativo' : 'Manutenção'}
            </td>
            <td style="padding: 12px; border-bottom: 1px solid #D9D9D9;">
                <button onclick="editarEcoponto(${eco.id})" style="background: #0235FF; color: white; border: none; padding: 6px 12px; border-radius: 5px; cursor: pointer; margin-right: 5px; font-family: 'Mitr', sans-serif;">Editar</button>
                <button onclick="excluirEcoponto(${eco.id})" style="background: #FF0606; color: white; border: none; padding: 6px 12px; border-radius: 5px; cursor: pointer; font-family: 'Mitr', sans-serif;">Excluir</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const nome = inputNome.value;
    const endereco = inputEndereco.value;
    const capacidade = inputCapacidade.value;
    const status = inputStatus.value;
    const idAtual = inputId.value;

    if (idAtual) {
        const index = ecopontos.findIndex(eco => eco.id == idAtual);
        ecopontos[index] = { id: Number(idAtual), nome, endereco, capacidade, status };
    } else {
        const novoEcoponto = {
            id: Date.now(),
            nome,
            endereco,
            capacidade,
            status
        };
        ecopontos.push(novoEcoponto);
    }

    localStorage.setItem('ecopontos', JSON.stringify(ecopontos));
    form.reset();
    inputId.value = '';
    renderizarTabela();
});

window.editarEcoponto = function(id) {
    const ecoponto = ecopontos.find(eco => eco.id == id);
    if (ecoponto) {
        inputId.value = ecoponto.id;
        inputNome.value = ecoponto.nome;
        inputEndereco.value = ecoponto.endereco;
        inputCapacidade.value = ecoponto.capacidade;
        inputStatus.value = ecoponto.status;
    }
};

window.excluirEcoponto = function(id) {
    const confirmacao = confirm("Deseja realmente excluir este ecoponto?");
    if (confirmacao) {
        ecopontos = ecopontos.filter(eco => eco.id != id);
        localStorage.setItem('ecopontos', JSON.stringify(ecopontos));
        renderizarTabela();
    }
};

renderizarTabela();