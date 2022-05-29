$("#botao-frase").click(fraseAleatoria);
$("#botao-frase-id").click(buscaFrase);

function fraseAleatoria(){
    $("#spinner").toggle();

    $.get("http://localhost:3000/frases", trocaFraseAleatoria).fail(function(){ //requisiçao AJAX, fazemos um GET quando acessamos o servidor no navegador, através da URL, se der certo executa o trocaFraseAleatoria se a requisição falhar executa o fail abaixo.
        $("#erro").toggle();
        setTimeout(function(){
            $("#erro").toggle();
        }, 2000); 
    })
    .always(function(){
        $("#spinner").toggle();//sempre vamos esconder o spinner, tanto faz se a requisição concluiu com sucesso ou falhou. a implementação de um spinner é uma questão de melhorar a UX(User eXperience) do usuário na aplicação.
    });
}  

function trocaFraseAleatoria(data){ //data é p ter acesso aos dados com o próprio retorno da requisição (que no caso a requisição é o localhost frases). Quando se usa o $.get é preciso colocar argumento, neste caso foi o "data".
    var frase = $(".frase");
    var numeroAleatorio = Math.floor(Math.random() * data.length); 
    //Math.floor é p fazer uma busca de array com um número inteiro(0,1,2...), já que se só estivesse o Math.random ele procuraria tbm por nª quebrados, e assim nao acharia uma frase
    //buscar a frase a partir de uma forma aleatória (Math.random) do array, utilizando todos as frases disponíveis (data.lenght)
    frase.text(data[numeroAleatorio].texto);//troca a frase
    atualizaTamanhoFrase(); //atualiza o n˚ de palavras que tenho naquela frase
    atualizaTempoInicial(data[numeroAleatorio].tempo);//atualiza o tempo de acordo com a frase 
}

function buscaFrase(){
    $("#spinner").toggle();
    var fraseId = $("#frase-id").val();
    var dados = { id: fraseId};

    $.get("http://localhost:3000/frases",dados,trocaFrase)
    .fail(function(){
        $("#erro").toggle();
        setTimeout(function(){
            $("#erro").toggle();
        }, 2000); 
    })
    .always(function(){
        $("#spinner").toggle();
    });
}

function trocaFrase(data){
    var frase = $(".frase");
    frase.text(data.texto);
    atualizaTamanhoFrase();
    atualizaTempoInicial(data.tempo);
}