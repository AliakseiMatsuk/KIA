(function() {
    'use strict';
    //MAP
    ymaps.ready(initMap);
    var myMap,
        myPlacemark;

    function initMap() {
        myMap = new ymaps.Map("map", {
            center: [53.953479, 27.717943],
            zoom: 16,
            controls: ['fullscreenControl']
        });

        myPlacemark = new ymaps.Placemark([53.953479, 27.717943], {
            balloonContent: 'Автоцентр KIA Атлант-м на Независимости Автопалас-м'
        }, {
            iconLayout: 'default#image',
            iconImageClipRect: [
                [0, 0],
                [26, 47]
            ],
            iconImageHref: 'templates/_ares/images/sprite-img.png',
            iconImageSize: [75, 53],
            iconImageOffset: [-20, -55]
        });

        myMap.geoObjects.add(myPlacemark);
    }

    //Fixed buttons
    (function fixedButtons() {
        var $window = $(window),
            $buttons = $(".btn-round"),
            defaultPosition = 'default',
            fixedPosition = 'fixed',
            toFixed;

        function scrollPosition(toFixed) {
            if ($(window).scrollTop() > toFixed && $buttons.hasClass(defaultPosition)) {
                $buttons.removeClass(defaultPosition).addClass(fixedPosition);
            } else if ($(window).scrollTop() <= toFixed && $buttons.hasClass(fixedPosition)) {
                $buttons.removeClass(fixedPosition).addClass(
                    defaultPosition);
            }
        }
        $(window).scroll(function() {
            var windowWidth = $(this).width();
            if (windowWidth > 1900) {
                scrollPosition(700);
            } else if (windowWidth <= 1900 && windowWidth > 1800) {
                scrollPosition(665);
            } else if (windowWidth <=1800 && windowWidth > 1700) {
                scrollPosition(630);
            } else if (windowWidth <=1700 && windowWidth > 1600) {
                scrollPosition(595);
            } else if (windowWidth <=1600 && windowWidth > 1500) {
                scrollPosition(555);
            } else {
                $buttons.addClass('')
            }
        });
    })()

    //Parallax
    var scene = document.getElementById('scene');
    var parallax = new Parallax(scene);
    //Select
    $('.select').selectize();

    $('.showForm').on('click', function(event) {
        event.preventDefault();
        event.stopPropagation();
        var $this = $(this),
            $callForm = $('request-call'),
            $interestAuto = $('interest-auto'),
            $layout = $('.layout'),
            formToShowIndex = $this.data('form'),
            $formToShow = $layout.find('.' + formToShowIndex),
            fadeInAnimation = 'animated fadeInDown',
            fadeOutAnimation = 'animated fadeOutUp',
            animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        $layout.add($formToShow).fadeIn();
        $formToShow.addClass(fadeInAnimation);
        if (formToShowIndex == 'interest-auto') {
            var modelID = $this.closest('.model').find('.model__id').text();
            $formToShow.find('.form__input_modelId').prop('value', modelID);
            console.log($('.form__input_modelId').val());
        }
        $formToShow.one(animationEnd, function() {
            $(this).removeClass(fadeInAnimation);
        });

        $('.form__close').on('click', function(event) {
            event.preventDefault();
            $formToShow.addClass('animated fadeOutUp');
            $layout.fadeOut();
            setTimeout(function() {
                $formToShow.find('form').validationEngine('hide');
                $formToShow.find('form')[0].reset();
                $formToShow.removeClass(fadeOutAnimation).hide();
            }, 500);
        });
    });


    $(".scroll-top").click(function(e) {
        e.preventDefault();
        var scroll_el = $(this).attr('data-href');
        if ($(scroll_el).length != 0) {
            $('html, body').animate({ scrollTop: $(scroll_el).offset().top }, 1000);
        }
        return false;
    });


    $('.clear').on('click', function(event) {
        event.preventDefault();
        $('.filters').find('input[type="checkbox"]').prop('checked', false);
    });



    //form
    $("#interest-auto-form,#request-call-form").validationEngine('attach', {
        //отображение стрелки возле подсказки
        showArrow: false,
        //отображение стрелки возле подсказоки радио и чекбокс
        showArrowOnRadioAndCheckbox: false,
        //установливает позицию для показа подсказок о ошибках
        promptPosition: "topRight",
        //сколл к ошибочному инпуту
        scroll: false,
        //показывать ошибку только для первого поля
        showOneMessage: true,
        //фокус на первом поле
        focusFirstField: true,
        //обновление позиции подсказки при резайзе окна
        autoPositionUpdate: false,
        onValidationComplete: function(form, status) { // Когда валидация включена и сканирование формы завершено
            if (status == true) {
                $.ajax({
                        type: form.attr('method'),
                        cache: false,
                        data: form.serialize(), //отправляем собранные данные полей
                    })
                    .done(function(answer) {
                        console.log("Отправлено");
                        form[0].reset(); //очищаем форму после отправки
                        $('#answer').html(answer);
                    })
                    .fail(function() {
                        console.log("Ошибка отправки");
                    })
                    .always(function() {
                        console.log("Всегда");
                    });
            } else {
                console.log(form);
                $(".formErrorContent br").remove();
                form.addClass("animated shake");
                form.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
                    $(this).removeClass("animated shake"); //убираем класс после окончания анимации
                });
            }
        }
    });
    $('.phone').mask("+375-99-999-99-99"); // маска для полей ввода
})();
