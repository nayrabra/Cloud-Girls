var botaoAdicionar = document.querySelector("#adicionar-paciente");
botaoAdicionar.addEventListener("click", function (event) {
    event.preventDefault();

    //aqui ele obtem o form
    var form = document.querySelector("#form-adiciona");

    //extraindo informaçoes do paciente do form
    var paciente = obtemPacienteDoFormulario(form);

    var erros = validaPaciente(paciente);
    console.log(erros);
    if(erros.length > 0){
        exibeMensagensDeErro(erros);
        //o return faz com que se der erro não seguir para adicionar na tabela
        return;
    }

    adicionaPacienteNaTabela(paciente);

    //com o reset é apagado os dados depois que apertar o botão adicionar
    form.reset();
    var mensagensErro = document.querySelector("#mensagens-erro");
    mensagensErro.innerHTML = "";
});

function adicionaPacienteNaTabela(paciente){
    //monta a tr a partir do paciente
    var pacienteTr = montaTr(paciente);
    
    var tabela = document.querySelector("#tabela-pacientes");
    //adicionando o paciente na tabela
    tabela.appendChild(pacienteTr);
}

function exibeMensagensDeErro(erros) {
    //primeiro obtem o conteudo HTML através do querySelector para depois modificar
    var ul = document.querySelector("#mensagens-erro");
    //a propriedade innerHTML permite controlar a propriedade interna (conteúdo HTML interno) de um elemento, nesse caso da li que exibe mensagem de erro, ao deixar a propriedade com vazio a mensagem de erro é apagada toda vez que for clicado no botão adicionar e não fica acumulando as mensagens de erro. Por innerHTML ser uma propriedade e não uma função, ela recebe o novo conteúdo, ou seja, utilizamos um sinal de igual (=)
    ul.innerHTML = "";

    //Em JavaScript, todo array possui a função forEach. Passamos para ela uma função por parâmetro, e nessa função fazemos o que quiser PARA CADA ITEM do array.  O item do array é recebido por parâmetro na função interna.
    erros.forEach(function(erro){
        var li = document.createElement("li");
        li.textContent = erro;
        //cria uma li para cada ul
        ul.appendChild(li);
    });
}


function obtemPacienteDoFormulario(form) {

    var paciente = {
        nome: form.nome.value,
        peso: form.peso.value,
        altura: form.altura.value,
        gordura: form.gordura.value,
        imc: calculaImc(form.peso.value, form.altura.value)
    }

    return paciente;
}

function montaTr(paciente) {
    var pacienteTr = document.createElement("tr");
    //o add junto com oo classList adiciona uma classe que dermos o nome
    pacienteTr.classList.add("paciente");

    //p cada Tr é colocado um filho (um Td com a função montaTd)
    pacienteTr.appendChild(montaTd(paciente.nome, "info-nome"));
    pacienteTr.appendChild(montaTd(paciente.peso, "info-peso"));
    pacienteTr.appendChild(montaTd(paciente.altura, "info-altura"));
    pacienteTr.appendChild(montaTd(paciente.gordura, "info-gordura"));
    pacienteTr.appendChild(montaTd(paciente.imc, "info-imc"));

    return pacienteTr;
}

function montaTd(dado,classe){
    var td = document.createElement("td");
    td.textContent = dado;
    td.classList.add(classe);
    //retorna o td que criou
    return td;
}

function validaPaciente(paciente) {
    //como quer manipular várias mensagens de erro é importante criar um array
    var erros = [];

    if(paciente.nome.length == 0){
        erros.push("O nome não pode ser em branco");
    }

    if(!validaPeso(paciente.peso)) {
        erros.push ("Peso é inválido"); //se der erro o push empurra a mensagem
    }

    if(!validaAltura(paciente.altura)) {
        erros.push("Altura é inválida!");
    }

    if(paciente.gordura.length == 0){
        erros.push("A gordura não pode ser em branco");
    }

    if (paciente.peso.length == 0){
        erros.push("O peso não pode ser em branco");
    }

    if (paciente.altura.length == 0){
        erros.push("A altura não pode ser em branco");
    }

    return erros;
}








