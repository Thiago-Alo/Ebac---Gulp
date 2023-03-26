//https://jquery.com/
// instancia jquery e evita conflitos
// jQuery( function($){
   $(document).ready(function(){

      $('.owl-carousel').owlCarousel();
  
      let titulos = $('h4') // <tag></tag>
     
      let itens = $('.featured-item') // .class
      
      let destaques = $('#featured') // #id
  
  
     // titulos.text('Titulo Qualquer'); 
     //  console.log(titulos.first());
  
      // Configuração de produtos
  
      $('.featured-item a').addClass('btn btn-primary stretch-link');
  
     //  $('.featured-item:first h4').append('<span class="badge bg-danger">Novo</span>');
      $('.h-logo').first().fadeIn( "slow" );
     $('.featured-item:first h4').css('color', 'red');
     $('.featured-item h4').css({
        'font-weight' : 'bold',
        'border-bottom': '2px solid red',
        'padding': '2px'
     });
     $('.featured-item h6').css({
        'padding': '3px',
        'color' : '#000'
     });
     $('.featured-item:first h4').fadeIn( "slow" );
  
     //  $('.featured-item:first h4').after('<b><u>Promoção</u></b>')
     // $('.featured-item:first h4').hide()
      // $('.featured-item:first h4').show()
     //  $('.featured-item:first h4').remove()
      // $('.featured-item:first h4').start('<span class="badge bg-secondary">Novo</span>')
      // $('.featured-item:first h4').html('<span class="badge bg-secondary">Novo</span>')
      // $('.featured-item:first h4').addClass('active')
      // $('.featured-item:first h4').removeClass('active')
      // $('.featured-item:first h4').toggleClass('active')
      // $('.featured-item:first h4').fadeIn(2000)
      // $('.featured-item:first h4').fadeOut()
      
       
       $('.featured-item h4').dblclick( function(){
  
          $(this).css({
              'color': '#f00',
              'background': '#ff0',
              'font-weight': '100',
          });
  
       });
  
       /*
        * Manipulação de eventos
        */
       $('.featured-item a').click(function(event){
  
          event.preventDefault();
  
           $(this).text('Esgotado').css({
              'color': 'black'
           })
  
           alert('Desculpe o Produto esgotou');
        })
       
       $('.featured-item h6').mouseover(function(){
           $(this).css({
              'transform': 'translateX(10px)',
              'transition' : ' all .5s ease',
              'font-size': '20px'
           })
       });
        $('.featured-item h6').mouseleave(function(){
           $(this).css({
              'transform': 'translateX(0px)',
              'color' :'red',
              'font-size': '15px'
           })
        });
  
         /*  Callback */
     $('.h-logo')
        .hide(500, function(){
           // alert($(this).find('h4').text() + ' Bem vindo a nossa Loja')
        })
        .show(500, function(){
           // console.log( $(this).find('h4').text() + ' em estoque')
        }) 
  
     $('.h-banner').hide(0).show(500).fadeIn(2000)
     
      /* Animações */
      
     const duracao = 1000 
  
     $('.h-logo').fadeIn(duracao)
        // .hide(duracao)
        // .show(duracao)
        // .fadeOut(duracao)
        // .toggle(duracao)
        // .toggle(duracao) 
  
  
  
         $('#form-submit').on('click', function (e) {
  
           e.preventDefault()
     
           if ($('#email').val() != '') {
     
              $('#email').animate({
                 opacity: "toggle",
                 top: "-50"
              }, 500, function () {
                $(this).animate({top:'0'})
              })
     
           }
     
     
        });
     
        /*
        MODAL
        */
        $('.nav-modal-open').on('click', function (e) {
     
           e.preventDefault();
           let elem = $(this).attr('rel')
           $('.modal-body').html($('#' + elem).html()) //#sobre
           $('.modal-header h5.modal-title').html($(this).text())
     
           let myModal = new bootstrap.Modal($('#modalId'))
           myModal.show()
        })
     
        /*
       FORMULARIO
        */
        function validate(elem) {
           if (elem.val() == '') {
              // console.log('O campo de ' + elem.attr('name') + ' é obrigatório')
              elem.parent().find('.text-muted').show()
              elem.addClass('invalid')
     
              return false
           } else {
              elem.parent().find('.text-muted').hide()
              elem.removeClass('invalid')
           }
        }
     
        $('body').on('submit', '.modal-body .form', function (e) {
           e.preventDefault()
           const inputName = $('#nome')
           const inputEmail = $('#email')
           const inputDate = $('#date')
           const inputHora = $('#hora')
           const inputCep = $('#cep')
           const inputCel = $('#cel')
           const inputCpf = $('#cpf')
  
           validate(inputName)
           validate(inputEmail)
           validate(inputDate)
           validate(inputHora)
           validate(inputCep)
           validate(inputCel)
           validate(inputCpf)
  
     
           if (inputEmail.hasClass('invalid') || inputName.hasClass('invalid') || inputDate.hasClass('invalid') || inputHora.hasClass('invalid') 
           || inputCep.hasClass('invalid') || inputCel.hasClass('invalid') || inputCpf.hasClass('invalid')) {
              console.log('Verificar campos obrigatórios')
              return false
           } else {
              $(this).submit()
           }
        })
     
        $('body').on('blur', '#nome', function () {
           validate($(this))
        })
        $('body').on('blur', '#email', function () {
           validate($(this))
        })
        $('body').on('blur', '#date', function () {
           $(this).datepicker()
        })
        $('body').on('blur', '#date', function () {
           $(this).mask('00/00/0000')
        })
        $('body').on('blur', '#hora', function () {
           validate($(this))
           $(this).mask('00:00')
        })
        $('body').on('keyup', '#cep', function () {
           validate($(this))
           $(this).mask('00000-000')
        })
        $('body').on('keyup', '#cel', function () {
           validate($(this))
           $(this).mask('00000-0000');
        })
        $('body').on('keyup', '#cpf', function () {
           validate($(this))
           $(this).mask('000.000.000-00');
        })
  
  
  
  
  
  
  
  })
  