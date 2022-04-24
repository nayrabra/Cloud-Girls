var botaoAdicionar = document.querySelector("#buscar-pacientes");

botaoAdicionar.addEventListener("click", function(){
    
    var xhr = new XMLHttpRequest();//serve para fazer requisições HTTP assíncronas (ou seja, sem travar o JS, sem precisar usar navegador). o new é só p informar q é um novo objeto.

    //o open é para configurar a requisição
    //primeiro coloca o tipo, que nesse caso é "get", e após se coloca o endereço da requisição
    xhr.open("GET", "https://api-pacientes.herokuapp.com/pacientes");

    xhr.addEventListener("load", function(){
        var erroAjax = document.querySelector("#erro-ajax");
        if(xhr.status == 200){
            erroAjax.classList.add("invisivel");
            var resposta = xhr.responseText;
            var pacientes = JSON.parse(resposta);

            pacientes.forEach(function(paciente) {
                adicionaPacienteNaTabela(paciente);
            });
        }else{
            console.log(xhr.status);
            console-log(xhr.responseText);
            erroAjax.classList.remove("invisivel");
        }
        
    });

    xhr.send();//para enviar a requisição

});