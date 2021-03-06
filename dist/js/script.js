$(document).ready(function(){
    $('.carousel__inner').slick({
        speed: 1200,
        // adaptiveHeight: true,
        prevArrow: '<button type="button" class="slick-prev"><img src="img/left.png"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="img/right.png"></button>',
        responsive: [
            {
                breakpoint: 991,
                settings: {
                dots: false,
                arrows: false
                }
            },
            {
                breakpoint: 600,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1
                }
              },
              {
                breakpoint: 480,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1
                }
              }
        ]
      });

      $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
          .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
      });

    //   $('.catalog-item__link').each(function(i) {
    //       $(this).on('click', function(e) {
    //           e.preventDefault();
    //           $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
    //           $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
    //       })
    //   });

    //   $('.catalog-item__back').each(function(i) {
    //     $(this).on('click', function(e) {
    //         e.preventDefault();
    //         $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
    //         $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
    //     })
    // });

    function toggleSlide(item) {
        $(item).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            })
        });
    };

    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');

    //Modal

    $('[data-modal=consultation]').on('click', function(){
      $('.overlay, #consultation').fadeIn('slow');
    });

    $('.modal__close').on('click', function(){
      $('.overlay, #consultation, #thanks, #order').fadeOut('slow')
    });

    // $('.button_mini').on('click', function(){
    //   $('.overlay, #order').fadeIn('slow');
    // });

    $('.button_mini').each(function(i){
      $(this).on('click', function(){
        $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text())
        $('.overlay, #order').fadeIn('slow');
      })
    });

    // $('#consultation-form').validate();
    // $('#consultation form').validate({
    //   rules: {
    //     name: {
    //       required: true,
    //       minlength: 2
    //     },
    //     phone: 'required',
    //     email: {
    //       required: true,
    //       email: true
    //     }
    //   },
    //   messages: {
    //     name: {
    //       required: '????????????????????, ?????????????? ???????? ??????',
    //       minlength: jQuery.validator.format('?????????????? ?????????????? {0} ??????????????!')
    //     },
    //     phone: '????????????????????, ?????????????? ???????? ?????????? ????????????????',
    //     email: {
    //       required: '????????????????????, ?????????????? ???????? ???????????????? ??????????',
    //       email: "?????????????????????? ???????????? ?????????? ??????????"
    //     }
    //   }
    // });
    // $('#order form').validate();

    function validateForms(form){
      $(form).validate({
        rules: {
          name: {
            required: true,
            minlength: 2
          },
          phone: 'required',
          email: {
            required: true,
            email: true
          }
        },
        messages: {
          name: {
            required: '????????????????????, ?????????????? ???????? ??????',
            minlength: jQuery.validator.format('?????????????? ?????????????? {0} ??????????????!')
          },
          phone: '????????????????????, ?????????????? ???????? ?????????? ????????????????',
          email: {
            required: '????????????????????, ?????????????? ???????? ???????????????? ??????????',
            email: "?????????????????????? ???????????? ?????????? ??????????"
          }
        }
      });
    };

    validateForms('#consultation-form');
    validateForms('#consultation form');
    validateForms('#order form');

    $('input[name=phone]').mask("+7 (999) 999-99-99");

    $('form').submit(function(e){
      e.preventDefault();
      $.ajax({
        type: "POST",
        url: "mailer/smart.php",
        data: $(this).serialize()
      }).done(function(){
        $(this).find('input').val("");
        $('#consultation, #order').fadeOut();
        $('.overlay , #thanks').fadeIn('slow');
        $('form').trigger('reset');
      });
      return false;
    });

    //Smooth scroll and pageup
    $(window).scroll(function(){
      if ($(this).scrollTop() > 1600) {
        $('.pageup').fadeIn();
      } else {
        $('.pageup').fadeOut();
      }
    });

    $("a[href^='#']").click(function(){
      var _href = $(this).attr("href");
      $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
      return false;
});

new WOW().init();
    
});

// var slider = tns({
//     container: '.carousel__inner',
//     items: 1,
//     slideBy: 'page',
//     autoplay: false,
//     controls: false,
//     nav: false
//   });

//   document.querySelector('.prev').addEventListener('click',function () {
//     slider.goTo('prev');
//   });

//   document.querySelector('.next').addEventListener('click',function () {
//     slider.goTo('next');
//   });
  