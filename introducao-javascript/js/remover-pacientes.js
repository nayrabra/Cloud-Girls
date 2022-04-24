var pacientes = document.querySelectorAll(".paciente");

var tabela = document.querySelector("table");

tabela.addEventListener("dblclick", function(event){
    //event.target é o alvo, ou seja, quem for clicado no meu evento. 
    //parentNode serve para retornar ao elemento pai. neste caso Td é o filho e Tr é o pai, que é o paciente (linha inteira)
    event.target.parentNode.classList.add("fadeOut");

    setTimeout(function(){
        event.target.parentNode.remove();
    }, 500); //esperar 500 milisegundos (meio segundo) para remover a linha

});



