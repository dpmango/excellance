$(document).ready(function(){

  //////////
  // Global variables & helper functions
  //////////

  const _window = $(window);
  const _document = $(document);

  function isRetinaDisplay() {
    if (window.matchMedia) {
        var mq = window.matchMedia("only screen and (min--moz-device-pixel-ratio: 1.3), only screen and (-o-min-device-pixel-ratio: 2.6/2), only screen and (-webkit-min-device-pixel-ratio: 1.3), only screen  and (min-device-pixel-ratio: 1.3), only screen and (min-resolution: 1.3dppx)");
        return (mq && mq.matches || (window.devicePixelRatio > 1));
    }
  }
  // isRetinaDisplay()

  //////////
  // COMMON
  //////////

 	// Prevent # behavior
	$('[href="#"]').click(function(e) {
		e.preventDefault();
	});

	// Smoth scroll
	$('a[href^="#section"]').click( function() {
        var el = $(this).attr('href');
        $('body, html').animate({
            scrollTop: $(el).offset().top}, 1000);
        return false;
	});

  // HEADER SCROLL
  // add .header-static for .page or body
  // to disable sticky header
  if ( $('.header-static').length == 0 ){
    _window.scrolled(10, function() { // scrolled is a constructor for scroll delay
      var vScroll = _window.scrollTop();
      var header = $('.header').not('.header--sticky');
      var headerSticky = $('.header--sticky');
      var headerHeight = header.height();

      if ( vScroll > headerHeight + 20){
        headerSticky.addClass('header--transformed');
      } else {
        headerSticky.removeClass('header--transformed');
      }

    });
  }

  // HEADER SEARCH
  $('.header__search .icon-search').on('click', function(){
    $(this).parent().addClass('active');
    $(this).closest('.header__cta').addClass('searching');
  });

  $('.header__search .icon-close').on('click', function(){
    $(this).parent().removeClass('active');
    $(this).closest('.header__cta').removeClass('searching');
  });


  // SCROLLBARS
  $('.scrollbar-dynamic').scrollbar();
  $('.scrollbar-macosx').scrollbar();


  // HAMBURGER TOGGLER
  $('.hamburger').on('click', function(){
    $('.hamburger').toggleClass('active');
    $('.mobile-navi').toggleClass('active');
  });

  // SET ACTIVE CLASS IN HEADER
  // * could be removed in production and server side rendering
  // user .active for li instead
  $('.header__navi li').each(function(i,val){
    if ( $(val).find('a').attr('href') == window.location.pathname.split('/').pop() ){
      $(val).addClass('active');
    } else {
      $(val).removeClass('active')
    }
  });

  //////////
  // SLIDERS
  //////////
  $('.hero__slider').slick({
    autoplay: true,
    autoplaySpeed: 7000,
    dots: true,
    arrows: false,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    centerMode: false,
    variableWidth: false
  });

  $('.bestsellers__slider').slick({
    autoplay: false,
    dots: false,
    arrows: false,
    infinite: true,
    speed: 300,
    slidesToShow: 5,
    centerMode: false,
    variableWidth: false,
    responsive: [
     {
       breakpoint: 992,
       settings: {
         slidesToShow: 4,
       }
     },
     {
       breakpoint: 768,
       settings: {
         slidesToShow: 3,
         slidesToScroll: 2
       }
     },
     {
       breakpoint: 568,
       settings: {
         slidesToShow: 2,
         slidesToScroll: 2
       }
     },
     {
       breakpoint: 414,
       settings: {
         slidesToShow: 1,
         slidesToScroll: 1
       }
     }
    ]
  });

  // bestseller slider navi
  $('.bestsellers__slider__nav .icon-prev').on('click', function(){
    $('.bestsellers__slider').slick('prev');
  });
  $('.bestsellers__slider__nav .icon-next').on('click', function(){
    $('.bestsellers__slider').slick('next');
  });


  // hero slider bg
  $('.hero__bg').each(function(i, val){
    var bg = $(val).find('img').attr('src');
    $(val).css('background-image', 'url(' + bg + ')')
  });

  // VIDEO PLAY
  $('.promo-video .icon').on('click', function(){
    $(this).closest('.promo-video').toggleClass('playing');
    $(this).closest('.promo-video').find('iframe').attr("src", $("iframe").attr("src").replace("autoplay=0", "autoplay=1"));
  });

  // ABOUT PAGE
  // Toggle more/less for docs
  $('.js-toggleDocsSection, .text-docs__head .icon').on('click', function(){
    $(this).closest('.text-docs').toggleClass('active');
    var btn = $('.js-toggleDocsSection');

    if ( btn.find('span').text() == 'Подробнее' ){
      btn.find('span').text('скрыть');
      btn.addClass('active');
      btn.closest('.text-docs').find('.text-docs__content').slideDown(500);
    } else {
      btn.find('span').text('Подробнее');
      btn.removeClass('active');
      btn.closest('.text-docs').find('.text-docs__content').slideUp(500);
    }
  });

  //////////
  // MODALS
  //////////
  // $('*[data-modal]').on('click', function(){
  //   // remove all active first
  //   $('.modal').removeClass('opened');
  //
  //   // find by id
  //   var target = $(this).data('modal');
  //   $('#'+target).addClass('opened');
  //
  //   window.location.hash = target;
  // });
  //
  // $('.modal__close').on('click', function(){
  //   $(this).closest('.modal').removeClass('opened');
  //   window.location.hash = "";
  // });
  //
  // // CHECK SAVED STATE
  // if(window.location.hash) {
  //   var hash = window.location.hash.substring(1);
  //   $('#'+hash).addClass('opened');
  // }


  // Magnific Popup
  // var startWindowScroll = 0;
  $('.js-popup').magnificPopup({
    type: 'inline',
    fixedContentPos: true,
    fixedBgPos: true,
    overflowY: 'auto',
    closeBtnInside: true,
    preloader: false,
    midClick: true,
    removalDelay: 300,
    mainClass: 'modal',
    callbacks: {
      beforeOpen: function() {
        // startWindowScroll = _window.scrollTop();
        // $('html').addClass('mfp-helper');
      },
      close: function() {
        // $('html').removeClass('mfp-helper');
        // _window.scrollTop(startWindowScroll);
      }
    }
  });

  // emulate close click
  $('.modal__close, .js-close-modal').on('click', function(){
    $(this).closest('.modal').find('.mfp-close').click();
  });

  // $('.popup-gallery').magnificPopup({
	// 	delegate: 'a',
	// 	type: 'image',
	// 	tLoading: 'Loading image #%curr%...',
	// 	mainClass: 'mfp-img-mobile',
	// 	gallery: {
	// 		enabled: true,
	// 		navigateByImgClick: true,
	// 		preload: [0,1]
	// 	},
	// 	image: {
	// 		tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
	// 	}
	// });

  ///////////////
  // PRODUCT PAGE
  ///////////////
  $('.product__tab--collapsable').on('click', function(){
    if ( $(this).is('.active') ){
      $(this).find('.product__tab__content').slideUp();
    } else {
      $(this).find('.product__tab__content').slideDown();
    }

    $(this).toggleClass('active');

  })


  // Testimonials - show more
  $('.testimonials__more-items__toggler').on('click', function(){
    $(this).hide();
    $('.testimonials__more-items').slideDown();
  });

  ///////////////
  // SERVICE PAGE
  ///////////////

  // toggler for first level - click for header
  $('.service__list__item__head').on('click', function(){
    $(this).parent().toggleClass('active');
    $(this).parent().find('.service__list__item-list').slideToggle(350);
    setTimeout(checkListActive, 0);
  });

  function checkListActive(){
    if ( $('.service__list .service__list__item.active').length > 0 ){
      $('.service__list').addClass('active');
    } else {
      $('.service__list').removeClass('active');
    }
  }

  // toggler for second level - click for item
  $('.service__list__item-list__item').on('click', function(){
    $(this).toggleClass('active');
    $(this).find('.service__list__item-list__dropdown').slideToggle(200);
  });

  // office click on second level
  $('.service__list__item-list__dropdown__office').on('click', function(e){
    e.stopPropagation();
  });

  ///////////////
  // PROFILE PAGE
  ///////////////

  $('.profile__order__head').on('click', function(){
    $(this).parent().toggleClass('active');

    $(this).parent().find('.profile__order__toggable').slideToggle(250);
  });


  ///////////////
  // LOGIN PAGE
  ///////////////

  // screen toggler
  $('.js-toggleLoginForm').on('click', function(){
    var target = $(this).data('form');

    $('.profile__login-action').each(function(i,val){
      if ( $(val).data('form') == target ){
        $(val).slideDown();
      } else {
        $(val).slideUp();
      }
    });

  });

  // ++ validation.js for forms



  ///////////////
  // UI
  ///////////////
  // Masked input
  // $("#date").mask("99/99/9999",{placeholder:"mm/dd/yyyy"});

  $("input[type='tel']").mask("0 (000) 000-0000", {placeholder: "_ (___) ___-____"});

  // DATEPICKER
  // $('.js-datepicker').datepicker({
  //   language: 'en',
  //   range: true,
  //   multipleDatesSeparator: " - "
  // });

  // custom selects
  $('.ui-select__visible').on('click', function(e){
    var that = this
    // hide parents
    $(this).parent().parent().parent().find('.ui-select__visible').each(function(i,val){
      if ( !$(val).is($(that)) ){
        $(val).parent().removeClass('active')
      }
    });

    $(this).parent().toggleClass('active');
  });

  $('.ui-select__dropdown span').on('click', function(){
    // parse value and toggle active
    var value = $(this).data('val');
    $(this).siblings().removeClass('active');
    $(this).addClass('active');

    // set visible
    $(this).closest('.ui-select').removeClass('active');
    $(this).closest('.ui-select').find('input').val(value);

    $(this).closest('.ui-select').find('.ui-select__visible span').text(value);
  });

  // handle outside click
  $(document).click(function (e) {
    var container = new Array();
    container.push($('.ui-select'));

    $.each(container, function(key, value) {
        if (!$(value).is(e.target) && $(value).has(e.target).length === 0) {
            $(value).removeClass('active');
        }
    });
  });


  // INPUTS FOCUS

  // Codedrops - pure javascript
  (function() {
    // trim polyfill : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim
    if (!String.prototype.trim) {
      (function() {
        // Make sure we trim BOM and NBSP
        var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
        String.prototype.trim = function() {
          return this.replace(rtrim, '');
        };
      })();
    }

    [].slice.call( document.querySelectorAll( '.input--dynamic input' ) ).forEach( function( inputEl ) {
      // in case the input is already filled..
      if( inputEl.value.trim() !== '' ) {
        classie.add( inputEl.parentNode, 'input--focused' );
      }

      // events:
      inputEl.addEventListener( 'focus', onInputFocus );
      inputEl.addEventListener( 'blur', onInputBlur );
    } );

    function onInputFocus( ev ) {
      classie.add( ev.target.parentNode, 'input--focused' );
    }

    function onInputBlur( ev ) {
      if( ev.target.value.trim() === '' ) {
        classie.remove( ev.target.parentNode, 'input--focused' );
      }
    }
  })();

});
