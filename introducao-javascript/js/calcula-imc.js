var titulo = document.querySelector(".titulo");
//textContent é a propriedade que tem o contéudo de texto daquela tag. Neste caso é usada p trocar o valor da propriedade p um novo texto.
titulo.textContent = "Aparecida Nutricionista";

var pacientes = document.querySelectorAll(".paciente");


for (var i = 0; i < pacientes.length; i++) {

    var paciente = pacientes[i];

    var tdPeso = paciente.querySelector(".info-peso");
    var peso = tdPeso.textContent;

    var tdAltura = paciente.querySelector(".info-altura");
    var altura = tdAltura.textContent;

    var tdImc = paciente.querySelector(".info-imc");

    var alturaEhValida = validaAltura(altura);
    var pesoEhValido = validaPeso(peso); //true ou false

    //! é operador de negação, inverte o valor
    if (!pesoEhValido) {
        console.log("Peso inválido");
        tdImc.textContent = "Peso inválido!";
        pesoEhValido = false;
        paciente.classList.add("paciente-invalido");
    }

    if (!alturaEhValida) {
        console.log("Altura inválida");
        tdImc.textContent = "Altura inválida!";
        alturaEhValida = false;
        //foi alterada a cor no CSS (boa prática); p modificar a classe do elemento utiliza o classList
        paciente.classList.add("paciente-invalido");
    }

    if (pesoEhValido && alturaEhValida) {
        var imc = calculaImc(peso, altura);
        tdImc.textContent = imc;
    }

    function validaPeso(peso) {
        if(peso >= 0 && peso < 1000) {
            return true;
        }else {
            return false;
        }
    }

    function validaAltura(altura){
        if(altura >=0 && altura <= 3.0) {
            return true;
        } else{
            return false;
        }
    }

    function calculaImc(peso, altura) {
        var imc = 0;
        imc = peso / (altura * altura);
        return imc.toFixed(2); //to fixed é para fixar as casas decimais.
    }

}

