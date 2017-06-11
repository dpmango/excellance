'use strict';

$(document).ready(function () {
  ////////////////
  // FORM VALIDATIONS
  ////////////////

  // jQuery validate plugin
  // https://jqueryvalidation.org


  // GENERIC FUNCTIONS
  ////////////////////

  var validateErrorPlacement = function validateErrorPlacement(error, element) {
    error.addClass('ui-input__validation');
    error.appendTo(element.parent("div"));
  };
  var validateHighlight = function validateHighlight(element) {
    $(element).parent('div').addClass("has-error");
  };
  var validateUnhighlight = function validateUnhighlight(element) {
    $(element).parent('div').removeClass("has-error");
  };
  var validateSubmitHandler = function validateSubmitHandler(form) {
    $(form).addClass('loading');
    $.ajax({
      type: "POST",
      url: $(form).attr('action'),
      data: $(form).serialize(),
      success: function success(response) {
        $(form).removeClass('loading');
        var data = $.parseJSON(response);
        if (data.status == 'success') {
          // do something I can't test
        } else {
          $(form).find('[data-error]').html(data.message).show();
        }
      }
    });
  };

  var validatePhone = {
    required: true,
    normalizer: function normalizer(value) {
      var PHONE_MASK = '+X (XXX) XXX-XXXX';
      if (!value || value === PHONE_MASK) {
        return value;
      } else {
        return value.replace(/[^\d]/g, '');
      }
    },
    minlength: 11,
    digits: true

    ////////
    // FORMS


    /////////////////////
    // REGISTRATION FORM
    ////////////////////
  };$(".js-registration-form").validate({
    errorPlacement: validateErrorPlacement,
    highlight: validateHighlight,
    unhighlight: validateUnhighlight,
    submitHandler: validateSubmitHandler,
    rules: {
      last_name: "required",
      first_name: "required",
      email: {
        required: true,
        email: true
      },
      password: {
        required: true,
        minlength: 6
        // phone: validatePhone
      } },
    messages: {
      last_name: "Заполните это поле",
      first_name: "Заполните это поле",
      email: {
        required: "Заполните это поле",
        email: "Email содержит неправильный формат"
      },
      password: {
        required: "Заполните это поле",
        email: "Пароль мимимум 6 символов"
      }
      // phone: {
      //     required: "Заполните это поле",
      //     minlength: "Введите корректный телефон"
      // }
    }
  });

  ///////////////
  // LOGIN FORM
  ///////////////
  $(".js-login-form").validate({
    errorPlacement: validateErrorPlacement,
    highlight: validateHighlight,
    unhighlight: validateUnhighlight,
    submitHandler: validateSubmitHandler,
    rules: {
      email: {
        required: true,
        email: true
      },
      password: {
        required: true
      }
    },
    messages: {
      email: {
        required: "Пожалуйста, введите электронную почту",
        email: "Email содержит неправильный формат"
      },
      password: {
        required: "Введите пароль"
      }
    }
  });

  ///////////////
  // RECOVER FORM
  ///////////////
  $(".js-recover-form").validate({
    errorPlacement: validateErrorPlacement,
    highlight: validateHighlight,
    unhighlight: validateUnhighlight,
    submitHandler: validateSubmitRecoverHandler,
    rules: {
      email: {
        required: true,
        email: true
      }
    },
    messages: {
      email: {
        required: "Пожалуйста, введите электронную почту",
        email: "Email содержит неправильный формат"
      }
    }
  });

  // recover handler
  var validateSubmitRecoverHandler = function validateSubmitRecoverHandler(form) {
    $(form).addClass('loading');

    $.ajax({
      type: "POST",
      url: $(form).attr('action'),
      data: $(form).serialize(),
      success: function success(response) {
        $(form).removeClass('loading');
        var data = $.parseJSON(response);
        if (data.status == 'success') {
          // do something I can't test
        } else {
          $(form).find('[data-error]').html(data.message).show();
        }
      },
      complete: function complete(response) {
        // move this to sucess
        var sucessMessage = 'Пароль отправлен на вашу электронную почту';
        $(form).find('[data-ok]').html(sucessMessage).show();
        $(form).find('.profile__box__cta .btn span').text('Вернуться в форму регистрации') % form.find('.profile__box__cta .profile__help-link span').text('Отправить повторно');
      }
    });
  };

  /////////////////////
  // ORDER ADRES FORM
  ////////////////////
  $(".js-orderAdress-form").validate({
    errorPlacement: validateErrorPlacement,
    highlight: validateHighlight,
    unhighlight: validateUnhighlight,
    submitHandler: validateSubmitHandler,
    rules: {
      last_name: "required",
      first_name: "required",
      email: {
        required: true,
        email: true
      }
    },
    messages: {
      last_name: "Заполните это поле",
      first_name: "Заполните это поле",
      email: {
        required: "Заполните это поле",
        email: "Email содержит неправильный формат"
      }
    }
  });

  /////////////////////
  // ORDER PICKUP FORM
  ////////////////////
  $(".js-orderPickup-form").validate({
    errorPlacement: validateErrorPlacement,
    highlight: validateHighlight,
    unhighlight: validateUnhighlight,
    submitHandler: validateSubmitHandler,
    rules: {
      pickup_date: "required"
    },
    messages: {
      pickup_date: "Введите дату самовывоза"
    }
  });
});