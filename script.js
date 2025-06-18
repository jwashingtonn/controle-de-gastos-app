let salario = 0;
let metaPorcentagem = 0;
let gastosFixos = [];
let gastosVariaveis = [];

function atualizarResumo() {
    salario = parseFloat(document.getElementById('salario').value) || 0;
    metaPorcentagem = parseFloat(document.getElementById('meta').value) || 0;

    let totalFixos = gastosFixos.reduce((acc, item) => acc + item.valor, 0);
    let totalVariaveis = gastosVariaveis.reduce((acc, item) => acc + item.valor, 0);
    let economia = salario * (metaPorcentagem / 100);
    let totalGasto = totalFixos + totalVariaveis + economia;
    let saldo = salario - totalGasto;
    let porcentagemGasta = salario > 0 ? (totalGasto / salario) * 100 : 0;

    document.getElementById('res-salario').innerText = salario.toFixed(2);
    document.getElementById('res-fixos').innerText = totalFixos.toFixed(2);
    document.getElementById('res-variaveis').innerText = totalVariaveis.toFixed(2);
    document.getElementById('res-economia').innerText = economia.toFixed(2);
    document.getElementById('res-saldo').innerText = saldo.toFixed(2);
    document.getElementById('res-porcentagem').innerText = porcentagemGasta.toFixed(1) + '%';
}

function adicionarGastoFixo() {
    let desc = document.getElementById('fixo-desc').value;
    let valor = parseFloat(document.getElementById('fixo-valor').value);
    if (desc && !isNaN(valor)) {
        gastosFixos.push({descricao: desc, valor: valor});
        atualizarLista('lista-fixos', gastosFixos);
        atualizarResumo();
        document.getElementById('fixo-desc').value = '';
        document.getElementById('fixo-valor').value = '';
    }
}

function adicionarGastoVariavel() {
    let desc = document.getElementById('var-desc').value;
    let valor = parseFloat(document.getElementById('var-valor').value);
    if (desc && !isNaN(valor)) {
        gastosVariaveis.push({descricao: desc, valor: valor});
        atualizarLista('lista-variaveis', gastosVariaveis);
        atualizarResumo();
        document.getElementById('var-desc').value = '';
        document.getElementById('var-valor').value = '';
    }
}

function atualizarLista(elementId, lista) {
    let ul = document.getElementById(elementId);
    ul.innerHTML = '';
    lista.forEach((item, index) => {
        ul.innerHTML += `<li>${item.descricao}: R$ ${item.valor.toFixed(2)} <button onclick="removerItem('${elementId}', ${index})">Excluir</button></li>`;
    });
}

function removerItem(listaId, index) {
    if (listaId === 'lista-fixos') {
        gastosFixos.splice(index, 1);
        atualizarLista(listaId, gastosFixos);
    } else {
        gastosVariaveis.splice(index, 1);
        atualizarLista(listaId, gastosVariaveis);
    }
    atualizarResumo();
}
