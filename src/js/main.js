'use strict';

$(document).ready(function () {

  //////////
  // Global variables & helper functions
  //////////

  var _window = $(window);
  var _document = $(document);

  function isRetinaDisplay() {
    if (window.matchMedia) {
      var mq = window.matchMedia("only screen and (min--moz-device-pixel-ratio: 1.3), only screen and (-o-min-device-pixel-ratio: 2.6/2), only screen and (-webkit-min-device-pixel-ratio: 1.3), only screen  and (min-device-pixel-ratio: 1.3), only screen and (min-resolution: 1.3dppx)");
      return mq && mq.matches || window.devicePixelRatio > 1;
    }
  }
  // isRetinaDisplay()

  //////////
  // COMMON
  //////////

  // Prevent # behavior
  $('[href="#"]').click(function (e) {
    e.preventDefault();
  });

  // Smoth scroll
  $('a[href^="#section"]').click(function () {
    var el = $(this).attr('href');
    $('body, html').animate({
      scrollTop: $(el).offset().top }, 1000);
    return false;
  });

  // HEADER SCROLL
  // add .header-static for .page or body
  // to disable sticky header
  if ($('.header-static').length == 0) {
    _window.scrolled(10, function () {
      // scrolled is a constructor for scroll delay
      var vScroll = _window.scrollTop();
      var header = $('.header').not('.header--sticky');
      var headerSticky = $('.header--sticky');
      var headerHeight = header.height();

      if (vScroll > headerHeight + 20) {
        headerSticky.addClass('header--transformed');
      } else {
        headerSticky.removeClass('header--transformed');
      }
    });
  }

  // HEADER HOVER
  var dataHover;
  $('.header__navi li').mouseenter(function () {
    var parseDataHover = $(this).data('hover');
    if (parseDataHover) {
      dataHover = parseDataHover;
      // calculate padding
      setUl2Padding();
      $('.header__dropdown').addClass('active');
    } else {
      $('.header__dropdown').removeClass('active');
    }
  });

  $('.header__dropdown').mouseenter(function () {
    $(this).addClass('active');
  });
  $('.header__dropdown').mouseleave(function () {
    $(this).removeClass('active');
  });

  function setUl2Padding() {
    if (dataHover) {
      var calculatedPad = $('.header__navi li[data-hover=' + dataHover + ']').position().left;
      var ul = $('.header__dropdown ul[data-hover=' + dataHover + ']');
      var ulWidth = ul.width();
      ul.css('padding-left', calculatedPad + 'px');
    }
  }
  _window.resized(50, function () {
    setUl2Padding();
  });

  // HEADER SEARCH
  $('.header__search .icon-search').on('click', function () {
    $(this).parent().addClass('active');
    $(this).closest('.header__cta').addClass('searching');
  });

  $('.header__search .icon-close').on('click', function () {
    $(this).parent().removeClass('active');
    $(this).closest('.header__cta').removeClass('searching');
  });

  // SCROLLBARS
  $('.scrollbar-dynamic').scrollbar();
  $('.scrollbar-macosx').scrollbar();

  // HAMBURGER TOGGLER
  $('.hamburger').on('click', function () {
    $('.hamburger').toggleClass('active');
    $('.mobile-navi').toggleClass('active');
  });

  // SET ACTIVE CLASS IN HEADER
  // * could be removed in production and server side rendering
  // user .active for li instead
  $('.header__navi li').each(function (i, val) {
    if ($(val).find('a').attr('href') == window.location.pathname.split('/').pop()) {
      $(val).addClass('active');
    } else {
      $(val).removeClass('active');
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
    responsive: [{
      breakpoint: 992,
      settings: {
        slidesToShow: 4
      }
    }, {
      breakpoint: 768,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 2
      }
    }, {
      breakpoint: 568,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
      }
    }, {
      breakpoint: 414,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }]
  });

  // bestseller slider navi
  $('.bestsellers__slider__nav .icon-prev').on('click', function () {
    $('.bestsellers__slider').slick('prev');
  });
  $('.bestsellers__slider__nav .icon-next').on('click', function () {
    $('.bestsellers__slider').slick('next');
  });

  // hero slider bg
  function setHeroBg() {
    $('.hero__bg').each(function (i, val) {
      var bg;
      if (_window.width() > 640) {
        if (isRetinaDisplay()) {
          bg = $(val).find('img.hero__bg--desktop').attr('srcset').slice(0, -2);
        } else {
          bg = $(val).find('img.hero__bg--desktop').attr('src');
        }
      } else {
        if (isRetinaDisplay()) {
          bg = $(val).find('img.hero__bg--mobile').attr('srcset').slice(0, -2);
        } else {
          bg = $(val).find('img.hero__bg--mobile').attr('src');
        }
      }
      $(val).css('background-image', 'url(' + bg + ')');
    });
  }
  if ($('.hero').length > 0) {
    setHeroBg();

    _window.resized(50, function () {
      setHeroBg();
    });
  }

  // VIDEO PLAY
  $('.promo-video .icon').on('click', function () {
    $(this).closest('.promo-video').toggleClass('playing');
    $(this).closest('.promo-video').find('iframe').attr("src", $("iframe").attr("src").replace("autoplay=0", "autoplay=1"));
  });

  // ABOUT PAGE
  // Toggle more/less for docs
  $('.js-toggleDocsSection, .text-docs__head .icon').on('click', function () {
    $(this).closest('.text-docs').toggleClass('active');
    var btn = $('.js-toggleDocsSection');

    if (btn.find('span').text() == 'Подробнее') {
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
      beforeOpen: function beforeOpen() {
        // startWindowScroll = _window.scrollTop();
        // $('html').addClass('mfp-helper');
        modalOpened = true;
      },
      open: function open() {
        var pdf = this.currItem.el.data('pdf');
        if (pdf) {
          this.currItem.inlineElement.find('object').attr('data', pdf);
          this.currItem.inlineElement.find('object a').attr('href', pdf);
        }
        setModalOffset();
      },
      close: function close() {
        // $('html').removeClass('mfp-helper');
        // _window.scrollTop(startWindowScroll);
        modalOpened = false;
      }
    }
  });

  var modalOpened = false;

  $('.js-blur').magnificPopup({
    type: 'inline',
    fixedContentPos: false,
    fixedBgPos: false,
    overflowY: 'auto',
    closeBtnInside: true,
    preloader: false,
    midClick: true,
    removalDelay: 300,
    mainClass: 'modal modal--blur',
    callbacks: {
      beforeOpen: function beforeOpen() {
        $('.page').addClass('page--blur');
        $('.footer').addClass('footer--blur');
        modalOpened = true;
      },
      open: function open() {
        setModalOffset();
      },
      close: function close() {
        $('.page').removeClass('page--blur');
        $('.footer').removeClass('footer--blur');
        modalOpened = false;
      }
    }
  });

  function setModalOffset() {
    var scrollTop = _window.scrollTop();
    var headerHeight = $('.header').height();
    var setOffeset = 0;
    console.log(scrollTop);
    console.log(headerHeight);
    if (headerHeight > scrollTop) {
      setOffeset = headerHeight - scrollTop;
    } else {
      setOffeset = 60;
    }
    console.log(setOffeset);
    $('.modal .mfp-content').css('padding-top', setOffeset + 'px');
  }
  _window.resized(50, function () {
    if (modalOpened) {
      setModalOffset();
    }
  });

  // emulate close click
  $('.modal__close, .js-close-modal').on('click', function () {
    $(this).closest('.modal').find('.mfp-close').click();
  });

  // GUIDE CARD SWTICHER
  $('.modal__guide__form__cta .btn').on('click', function () {
    var currentSlideID = $(this).closest('.modal__guide__card').data('question');
    var currentSlide = $('.modal__guide__card[data-question="' + parseInt(currentSlideID) + '"]');
    var nextSlide = $('.modal__guide__card[data-question="' + parseInt(currentSlideID + 1) + '"]');
    var prevSlide = $('.modal__guide__card[data-question="' + parseInt(currentSlideID - 1) + '"]');
    var nextSlideNext = $('.modal__guide__card[data-question="' + parseInt(currentSlideID + 2) + '"]');
    var prevSlideNext = $('.modal__guide__card[data-question="' + parseInt(currentSlideID - 2) + '"]');
    var selected = false;

    // next slide
    if ($(this).is('.js-next-guide') && nextSlide) {
      // validate is selected
      if ($(this).closest('.modal__guide__card').find('input:checked').length > 0) {
        selected = true;
        $(this).closest('.modal__guide__card').find('.modal__guide__form__validation').fadeOut();
      } else {
        $(this).closest('.modal__guide__card').find('.modal__guide__form__validation').fadeIn();
      }

      if (selected) {
        // animate next slide
        nextSlide.addClass('shuffle');
        setTimeout(function () {
          nextSlide.removeClass('shuffle').removeClass('modal__guide__card--right').addClass('modal__guide__card--visible');
        }, 350);

        // hide current slide
        currentSlide.addClass('shuffle-next');
        setTimeout(function () {
          currentSlide.removeClass('shuffle-next').removeClass('modal__guide__card--visible').addClass('modal__guide__card--left');
          // remove 0 opacity on next el
          if (nextSlideNext) {
            nextSlideNext.removeClass('modal__guide__card--invis');
          }
          if (prevSlideNext) {
            prevSlide.addClass('modal__guide__card--invis');
          }
        }, 350);
      }
    }

    // previous slide
    if ($(this).is('.js-prev-guide') && prevSlide) {
      // animate next slide
      prevSlide.addClass('shuffle');
      setTimeout(function () {
        prevSlide.removeClass('shuffle').removeClass('modal__guide__card--left').addClass('modal__guide__card--visible');
      }, 350);

      // hide current slide
      currentSlide.addClass('shuffle-prev');
      setTimeout(function () {
        currentSlide.removeClass('shuffle-prev').removeClass('modal__guide__card--visible').addClass('modal__guide__card--right');
        // remove 0 opacity on next el
        if (nextSlideNext) {
          nextSlide.addClass('modal__guide__card--invis');
        }
        if (prevSlideNext) {
          prevSlideNext.removeClass('modal__guide__card--invis');
        }
      }, 350);
    }

    // reset action
    if ($(this).is('.js-reset-guide')) {
      $('.modal__guide__card').each(function (i, val) {
        var dataQuestion = $(val).data('question'
        // null all classes
        );$(val).removeClass('modal__guide__card--invis').removeClass('modal__guide__card--left').removeClass('modal__guide__card--right').removeClass('modal__guide__card--visible').removeClass('shuffle').removeClass('shuffle-next').removeClass('shuffle-prev'

        //null radios
        );$(val).find('input:checked').prop('checked', false

        // set defaults
        );if (dataQuestion == 1) {
          $(val).addClass('modal__guide__card--visible');
        } else if (dataQuestion > 1 && dataQuestion < 3) {
          $(val).addClass('modal__guide__card--right');
        } else if (dataQuestion >= 3) {
          console.log($(val).data('question'));
          $(val).addClass('modal__guide__card--invis').addClass('modal__guide__card--right');
        }
      });
    }
  });

  // modal results tab
  $('.modal__guide__results-sidebar__tab').on('click', function () {
    var selectedTab = $(this).data('tab');

    $(this).siblings().removeClass('active');
    $(this).addClass('active');

    $('.modal__guide__results-content').each(function (i, val) {
      if ($(val).data('tab') == selectedTab) {
        $(val).addClass('active');
      } else {
        $(val).removeClass('active');
      }
    });

    $('.modal__guide__results-catalog').each(function (i, val) {
      if ($(val).data('tab') == selectedTab) {
        $(val).addClass('active');
      } else {
        $(val).removeClass('active');
      }
    });
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
  $('.product__tab--collapsable').on('click', function () {
    if ($(this).is('.active')) {
      $(this).find('.product__tab__content').slideUp();
    } else {
      $(this).find('.product__tab__content').slideDown();
    }

    $(this).toggleClass('active');
  }

  // Testimonials - show more
  );$('.testimonials__more-items__toggler').on('click', function () {
    $(this).hide();
    $('.testimonials__more-items').slideDown();
  });

  ///////////////
  // SERVICE PAGE
  ///////////////

  // toggler for first level - click for header
  $('.service__list__item__head').on('click', function () {
    $(this).parent().toggleClass('active');
    $(this).parent().find('.service__list__item-list').slideToggle(350);
    setTimeout(checkListActive, 0);
  });

  function checkListActive() {
    if ($('.service__list .service__list__item.active').length > 0) {
      $('.service__list').addClass('active');
    } else {
      $('.service__list').removeClass('active');
    }
  }

  // toggler for second level - click for item
  $('.service__list__item-list__item').on('click', function () {
    $(this).toggleClass('active');
    $(this).find('.service__list__item-list__dropdown').slideToggle(200);
  });

  // office click on second level
  $('.service__list__item-list__dropdown__office').on('click', function (e) {
    if ($(this).is('.js-popup')) {
      e.stopPropagation();
    } else {
      e.stopPropagation();
    }
  });

  ///////////////
  // CONTACT PAGE
  ///////////////

  // mobile toggeler
  $('.contacts__sidebar__toggle').on('click', function () {
    $(this).parent().find('.contacts__sidebar__group:not(.contacts__sidebar__group--condenced)').slideToggle();
    $(this).toggleClass('active');
    if ($(this).find('span').text() == 'Показать') {
      $(this).find('span').text('Скрыть');
    } else {
      $(this).find('span').text('Показать');
    }
  });

  ///////////////
  // PROFILE PAGE
  ///////////////

  $('.profile__order__head').on('click', function () {
    // check if selectable
    if ($(this).closest('.profile__orders').is('.profile__adress--selectable')) {
      $(this).closest('.profile__orders').find('input[type=hidden]').val($(this).parent().data('select-id') || 0);
      $(this).closest('.profile__orders').find('.profile__order').removeClass('active');
      $(this).parent().addClass('active');
    } else {
      $(this).parent().toggleClass('active');
      $(this).parent().find('.profile__order__toggable').slideToggle(250);
    }
  });

  // toggle extra phone
  $('.js-addPhone').on('click', function () {
    $(this).fadeOut();

    $('.js-toggablePhone').slideToggle(250);
  });

  ///////////////
  // LOGIN PAGE
  ///////////////

  // screen toggler
  $('.js-toggleLoginForm').on('click', function () {
    var target = $(this).data('form');

    $('.profile__login-action').each(function (i, val) {
      if ($(val).data('form') == target) {
        $(val).slideDown();
      } else {
        $(val).slideUp();
      }
    });
  });

  // ++ validation.js for forms


  ///////////////
  // CART PAGE
  ///////////////
  $('.catalog__card .icon-close').on('click', function () {
    if ($(this).data('action') == 'remove') {
      $(this).parent().fadeOut();
    }
  });

  $('.js-toggleCartSignupSection').on('click', function () {
    $(this).hide();
    $(this).closest('.cart-login__section').find('.cart-login__section__dropdown').slideDown();
  });

  // cart adress for aithorized users
  $('.js-toggleCartAdressSection').on('click', function () {
    $(this).hide();
    $(this).closest('.cart-login__white-bg--toggable').addClass('active');
    $(this).closest('.cart-login__white-bg--toggable').find('.profile__box').slideDown();
  });

  ///////////////
  // UI
  ///////////////
  // Masked input
  $(".js-dateMask").mask("99.99.9999", { placeholder: "__ __ ____" });
  $(".js-dateMask2").mask("99.99.99", { placeholder: "ДД.ММ.ГГ" });

  $(".js-indexMask").mask("999 999", { placeholder: "000 000" });

  $("input[type='tel']").mask("+7 (000) 000-0000", { placeholder: "+7 (___) ___-____" });

  // DATEPICKER
  // $('.js-datepicker').datepicker({
  //   language: 'en',
  //   range: true,
  //   multipleDatesSeparator: " - "
  // });

  // custom selects
  $('.ui-select__visible').on('click', function (e) {
    var that = this;
    // hide parents
    $(this).parent().parent().parent().find('.ui-select__visible').each(function (i, val) {
      if (!$(val).is($(that))) {
        $(val).parent().removeClass('active');
      }
    });

    $(this).parent().toggleClass('active');
  });

  $('.ui-select__dropdown span').on('click', function () {
    // parse value and toggle active
    var value = $(this).data('val');
    if (value) {
      $(this).siblings().removeClass('active');
      $(this).addClass('active');

      // set visible
      $(this).closest('.ui-select').removeClass('active');
      $(this).closest('.ui-select').find('input').val(value).trigger('change');

      $(this).closest('.ui-select').find('.ui-select__visible span').text(value);
    }
  });

  // handle outside click
  $(document).click(function (e) {
    var container = new Array();
    container.push($('.ui-select'));

    $.each(container, function (key, value) {
      if (!$(value).is(e.target) && $(value).has(e.target).length === 0) {
        $(value).removeClass('active');
      }
    });
  });

  // numeric input
  $('.catalog__card__counter span').on('click', function (e) {
    var element = $(this).parent().find('input');
    var currentValue = parseInt($(this).parent().find('input').val()) || 0;

    if ($(this).data('action') == 'minus') {
      if (currentValue <= 1) {
        return false;
      } else {
        element.val(currentValue - 1);
      }
    } else if ($(this).data('action') == 'plus') {
      if (currentValue >= 99) {
        return false;
      } else {
        element.val(currentValue + 1);
      }
    }
  });

  // GOOGLE MAP
  $('.js-toggleGoogleMap input[type=hidden]').on('change', function () {
    var city = $(this).val();
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'address': city
    }, function (results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        map.setCenter(results[0].geometry.location);
      } else {
        // something is wrong
      }
    });
  });

  // INPUTS FOCUS

  // Codedrops - pure javascript
  (function () {
    // trim polyfill : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim
    if (!String.prototype.trim) {
      (function () {
        // Make sure we trim BOM and NBSP
        var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
        String.prototype.trim = function () {
          return this.replace(rtrim, '');
        };
      })();
    }

    [].slice.call(document.querySelectorAll('.input--dynamic input')).forEach(function (inputEl) {
      // in case the input is already filled..
      if (inputEl.value.trim() !== '') {
        classie.add(inputEl.parentNode, 'input--focused');
      }

      // events:
      inputEl.addEventListener('focus', onInputFocus);
      inputEl.addEventListener('blur', onInputBlur);
    });

    function onInputFocus(ev) {
      classie.add(ev.target.parentNode, 'input--focused');
    }

    function onInputBlur(ev) {
      if (ev.target.value.trim() === '') {
        classie.remove(ev.target.parentNode, 'input--focused');
      }
    }
  })();
});