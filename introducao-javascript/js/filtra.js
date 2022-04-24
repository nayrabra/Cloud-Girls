var campoFiltro = document.querySelector("#filtrar-tabela");

//A função addEventListener() recebe dois parâmetros, primeiro o nome do evento a ser escutado e depois uma função com a ação que deve executar.
campoFiltro.addEventListener("input",function(){
    console.log(this.value);
    var pacientes = document.querySelectorAll(".paciente");

    if (this.value.length > 0){
        for (var i = 0; i < pacientes.length; i++){
            //primeiro busca dentro do tr paciente
            var paciente = pacientes[i];
            //depois vai no td e busca pela classe info nome
            var tdNome = paciente.querySelector(".info-nome");
            var nome = tdNome.textContent;
            //new RegExp procura pela Expressão Regular, letra por letra do paciente[i]
            var expressao = new RegExp(this.value,"i");
            if (!expressao.test(nome)){
                paciente.classList.add("invisivel");
            }else{
                paciente.classList.remove("invisivel");
            }
        }
    }else{
        for (var i = 0; i < pacientes.length; i++){
            var paciente = pacientes[i];
            paciente.classList.remove("invisivel");
        }
    }
});