$("#botao-placar").click(mostraPlacar);
$("#botao-sync").click(sincronizaPlacar);

function inserePlacar(){
    var corpoTabela = $(".placar").find("tbody");
    var usuario = $("#usuarios").val();
    var numPalavras = $("#contador-palavras").text();

    var linha= novaLinha(usuario,numPalavras);
    linha.find(".botao-remover").click(removeLinha);
    
    corpoTabela.prepend(linha); //anexa HTML como um último filho, com .append() e como um primeiro filho, com .prepend()
    $(".placar").slideDown(500);//exibe o placar
    
    scrollPlacar();
}

function scrollPlacar(){
    var posicaoPlacar = $(".placar").offset().top;//a funçao offset é p nos dá a posição em que determinado elemento se encontra na página (neste caso, o placar)
    $("body").animate(
    {
        scrollTop: posicaoPlacar+"px" //o valor do offset deve ser passado com uma unidade de medida, no caso o px
    },1000);
}

function novaLinha(usuario,palavras){
    var linha = $("<tr>");//Para criarmos elementos do DOM com jQuery, devemos utilizar a própria função jQuery($) , mas em vez de passarmos um id, classe, ou nome de um elemento para ela buscar, devemos passar uma tag HTML completa( com os sinais < e >)
    var colunaUsuario = $("<td>").text(usuario);
    var colunaPalavras = $("<td>").text(palavras);
    var colunaRemover = $("<td>");

    var link = $("<a>").addClass("botao-remover").attr("href","#");
    var icone = $("<i>").addClass("small").addClass("material-icons").text("delete");

    link.append(icone);//append() insere conteúdo especificado no final dos elementos selecionados.

    colunaRemover.append(link);

    linha.append(colunaUsuario);
    linha.append(colunaPalavras);
    linha.append(colunaRemover);

    return linha;
}

function removeLinha(){
    event.preventDefault(); //previne o que acontece por padrao naquele evento, que é o de obedecer ao "a href" e ir para o começo da pag
    var linha = $(this).parent().parent();//só 1 parent é subir um nível no html que é o pai = td/ mas para remover o tr (linha), sobe dois níveis que é o avô = parent 2x. o this está direcionado ao botao-remover.
    linha.fadeOut(1000); //fadeOut() é para esmaecer aos poucos qd remover uma linha, em 1 seg
    setTimeout(function(){
        linha.remove(); //remover de vez o elemento (apagando no elemento tbody) depois de 1 seg
    },1000);
}

function mostraPlacar(){
    $(".placar").stop().slideToggle(600); //de maneira devagar (slide) exibe o placar qd o botao é clicado e some qd é clicado novamente (toggle) 
}

function sincronizaPlacar(){
    var placar = [];
    var linhas = $("tbody>tr");
    linhas.each(function(){
        var usuario = $(this).find("td:nth-child(1)").text(); //pega na minha linha tr um td que é o filho n˚ 1 (usuario)
        var palavras = $(this).find("td:nth-child(2)").text(); //pega na minha linha tr um td que é o filho n˚ 2 (palavras)
        
        var score = {
            usuario: usuario,
            pontos: palavras
        };

        placar.push(score); //salvar dentro do placar o score
    });

    var dados = {
        placar: placar
    };

    $.post("http://localhost:3000/placar",dados,function(){ //O método post é usado quando desejamos enviar os dados para o servidor...
        console.log("Salvou o placar no servidor");
        $(".tooltip").tooltipster("open").tooltipster("content","Sucesso ao sincronizar");
    }).fail(function(){
        $(".tooltip").tooltipster("open").tooltipster("content","Falha ao sincronizar");
    })
    
    .always(function(){
        setTimeout(function(){
            $(".tooltip").tooltipster("close");
        },1200);
    });
}

function atualizaPlacar(){

    $.get("http://localhost:3000/placar",function(data){ //Já o get quando queremos ler um dado.

        $(data).each(function(){
            var linha = novaLinha(this.usuario, this.pontos);
            linha.find(".botao-remover").click(removeLinha);
            $("tbody").append(linha);
        });
    });
}