//variáveis globais
var tempoInicial = $("#tempo-digitacao").text();
var campo = $(".campo-digitacao");
$(function(){ //Quando passamos uma função dentro da função $() , estamos na verdade utilizando a função $(document).ready(), q carrega todas as funções q foram chamadas.
    atualizaTamanhoFrase();
    inicializaContadores();
    inicializaCronometro();
    inicializaMarcadores();
    $("#botao-reiniciar").click(reiniciaJogo); //A função .click() é uma função de atalho para a função .on("click", ...) . Ela tem o mesmo comportamento, apenas sendo um jeito mais curto e rápido de escrever a função (shorthand functions). 
    //as funções .blur, .focus, .change, .dblclick ...etc. Todas elas equivalem a chamada da função on() passando-as como parâmetro, e existem no jQuery apenas para facilitar a vida do desenvolvedor.
    atualizaPlacar();
    $("#usuarios").selectize({
        create: true,
        sortField: 'text'
    });
    $('.tooltip').tooltipster({
        trigger: "custom"
    });

});

function atualizaTempoInicial(tempo){
    tempoInicial = tempo;
    $("#tempo-digitacao").text(tempo);
} 

function atualizaTamanhoFrase() {
    var frase = $(".frase").text(); //a função $ é um atalho pra função seletora jQuery. Se queremos ter acesso ao contéudo textual de um elemento selecionado pelo jQuery, devemos utilizar a função .text(), que nos retorna exatamente isto. A função .text() tem dupla função, nos retorna ao valor textual do elemento caso seja chamada sem parâmetro ou altera o valor de texto do elemento caso seja chamada com uma string como parâmetro. A função .text() pega o conteúdo de texto de tags HTML que tem texto dentro, como as <h1>, <span> e <p>
    var numPalavras = frase.split(" ").length; //Para quebrar uma string em espaços, podemos utilizar a conhecida função .split() do JavaScript tradicional, que nos retorna um array com as palavras separadas. Como queremos separar pelo espaço em branco(" "), passaremos ele como parâmetro em split().
    var tamanhoFrase = $("#tamanho-frase");
    
    tamanhoFrase.text(numPalavras);//.text neste caso está substituindo um valor, pois está com um argumento "numPalavras"
}

function inicializaContadores() {
    campo.on("input", function(){ //A função .on() recebe dois parâmetros, o nome do evento a escutar e uma função com a ação que deve executar! Neste caso, o evento é o input, e é p os caracteres e palavras serem contados assim que digita
        var conteudo = campo.val(); //no jQuery o "value" é interpretado como "val", que é o valor do input dos usuários (muito usado para validar formulários ou pegar um <input>, <textarea> (que foi nesse caso) ou <select>.)
        var qtdPalavras = conteudo.split(/\S+/).length - 1; //A expressão regular será responsável por buscar qualquer caractere, exceto espaço vazio: /\S+/
        $("#contador-palavras").text(qtdPalavras);
     
        var qtdCaracteres = conteudo.length;
        $("#contador-caracteres").text(qtdCaracteres);
     });
}

function inicializaCronometro () {
    campo.one("focus", function() { // a função one serve para chamar aquele evento uma única vez, diferente do on que seria chamado várias vezes. O evento focus serve para assim que o usuário focar o marcador na tela já começar a contar o tempo.
        var tempoRestante = $("#tempo-digitacao").text();
        var cronometroID = setInterval(function(){
            tempoRestante--;
            $("#tempo-digitacao").text(tempoRestante);
            console.log(tempoRestante);
            if(tempoRestante < 1){
                clearInterval(cronometroID); //clearInteval é p o cronômetro parar de funcionar
                finalizaJogo();
            }
            
        },1000);
    });
}

function finalizaJogo(){
    campo.attr("disabled", true); //attr = função de adicionar um atributo. A textarea possui um atributo disabled, que faz com que não consigamos digitar nada na mesma. Quando o tempo chegar a 0, o JavaScript colocará o atributo disabled na textarea.             
    campo.toggleClass("campo-desativado"); //a função toggleClass funciona da seguinte maneira: se no momento que a função for chamada, o elemento possuir a classe, ela será removida, mas se o elemento não possuir a classe, ela será adicionada.       
    inserePlacar();
}

function inicializaMarcadores(){
    campo.on("input", function(){
        var frase = $(".frase").text();
        var digitado = campo.val();
        var comparavel = frase.substr(0,digitado.length); //substr = sub string (um pedaço do meu texto digitado).
        if(digitado == comparavel){
            campo.addClass("borda-verde");
            campo.removeClass("borda-vermelha");
        }else{
            campo.addClass("borda-vermelha");
            campo.removeClass("borda-verde");
        }
    });
} 


function reiniciaJogo(){
    campo.attr("disabled",false);
    campo.val("");
    $("#contador-palavras").text("0");
    $("#contador-caracteres").text("0");
    $("#tempo-digitacao").text(tempoInicial);
    inicializaCronometro();
    campo.toggleClass("campo-desativado");
    campo.removeClass("borda-vermelha");
    campo.removeClass("borda-verde");
}

    

