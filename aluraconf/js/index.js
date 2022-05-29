function ativaScrollSuave(selector) {

    $(selector).click(function(event) {
        event.preventDefault(); //cancela o comportamento padrao (q seria descer rapidamente ao elemento ao ser clicado)
        var target = $(this).attr('href'); 

        $('html, body').animate({
            scrollTop: $(target).offset().top
        }, 1000);
    });
}

ativaScrollSuave('a[href*=panel-about]');
ativaScrollSuave('a[href*=panel-speakers]');
ativaScrollSuave('a[href*=panel-form]');


