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
  _window.scrolled(10, function () {
    // scrolled is a constructor for scroll delay listener
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

  // HEADER SEARCH
  $('.header__search .icon-search').on('click', function () {
    $(this).parent().addClass('active');
    $(this).closest('.header__cta').addClass('searching');
  });

  $('.header__search .icon-close').on('click', function () {
    $(this).parent().removeClass('active');
    $(this).closest('.header__cta').removeClass('searching');
  });

  // scrollbars
  $('.scrollbar-dynamic').scrollbar();
  $('.scrollbar-macosx').scrollbar();

  // Hamburger
  $('.hamburger').on('click', function () {
    $('.hamburger').toggleClass('active');
    $('.mobile-navi').toggleClass('active');
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
  $('.hero__bg').each(function (i, val) {
    var bg = $(val).find('img').attr('src');
    $(val).css('background-image', 'url(' + bg + ')');
  });

  // VIDEO PLAY
  $('.promo-video .icon').on('click', function () {
    $(this).closest('.promo-video').toggleClass('playing');
    $(this).closest('.promo-video').find('iframe').attr("src", $("iframe").attr("src").replace("autoplay=0", "autoplay=1"));
  });

  $('.js-toggleDocsSection').on('click', function () {
    $(this).closest('.text-docs').toggleClass('active');

    if ($(this).find('span').text() == 'Подробнее') {
      $(this).find('span').text('скрыть');
      $(this).addClass('active');
    } else {
      $(this).find('span').text('Подробнее');
      $(this).removeClass('active');
    }
  });

  //////////
  // MODALS
  //////////
  $('*[data-modal]').on('click', function () {
    // remove all active first
    $('.modal').removeClass('opened');

    // find by id
    var target = $(this).data('modal');
    $('#' + target).addClass('opened');

    window.location.hash = target;
  });

  $('.modal__close').on('click', function () {
    $(this).closest('.modal').removeClass('opened');
    window.location.hash = "";
  });

  // CHECK SAVED STATE
  if (window.location.hash) {
    var hash = window.location.hash.substring(1);
    $('#' + hash).addClass('opened');
  }

  // Magnific Popup
  // var startWindowScroll = 0;
  // $('.popup-with-zoom-anim').magnificPopup({
  //   type: 'inline',
  //   fixedContentPos: true,
  //   fixedBgPos: true,
  //   overflowY: 'auto',
  //   closeBtnInside: true,
  //   preloader: false,
  //   midClick: true,
  //   removalDelay: 300,
  //   mainClass: 'my-mfp-zoom-in',
  //   callbacks: {
  //     beforeOpen: function() {
  //       startWindowScroll = _window.scrollTop();
  //       $('html').addClass('mfp-helper');
  //     },
  //     close: function() {
  //       $('html').removeClass('mfp-helper');
  //       _window.scrollTop(startWindowScroll);
  //     }
  //   }
  // });
  //
  // $('.popup-with-move-anim').magnificPopup({
  //   type: 'inline',
  //   fixedContentPos: false,
  //   fixedBgPos: true,
  //   overflowY: 'auto',
  //   closeBtnInside: true,
  //   preloader: false,
  //   midClick: true,
  //   removalDelay: 300,
  //   mainClass: 'my-mfp-slide-bottom'
  // });
  //
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

  // Masked input
  $("#date").mask("99/99/9999", { placeholder: "mm/dd/yyyy" });
  $("input[name='phone']").mask("9 (999) 999-9999");
  $("#tin").mask("99-9999999");
  $("#ssn").mask("999-99-9999");

  // DATEPICKER
  $('.js-datepicker').datepicker({
    language: 'en',
    range: true,
    multipleDatesSeparator: " - "
  });

  // RANGESLIDER
  var rangeSlider = document.querySelector('.js-rangeslider');

  if ($('.js-rangeslider').length > 0) {
    noUiSlider.create(rangeSlider, {
      start: [90, 120],
      connect: true,
      tooltips: true,
      step: 1,
      // pips: { // Show a scale with the slider
      // 	mode: 'steps',
      // 	stepped: true,
      // 	density: 4
      // },
      range: {
        'min': [80],
        'max': [120]
      }
    });

    // method to get current value
    // rangeSlider.noUiSlider.get();

    // docs on noUiSlider
    // https://refreshless.com/nouislider/slider-read-write/
  }

  // UI
  $('.ui-select__visible').on('click', function () {
    // hide parents
    $(this).parent().parent().parent().find('.ui-select').removeClass('active');

    $(this).parent().toggleClass('active');
  });

  $('.ui-select__dropdown span').on('click', function () {
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

    $.each(container, function (key, value) {
      if (!$(value).is(e.target) && $(value).has(e.target).length === 0) {
        $(value).removeClass('active');
      }
    });
  });

  // INPUTS FOCUS

  // Codedrops based - pure javascript
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