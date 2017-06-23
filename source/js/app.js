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
    $(window).scroll(function() {
        var $buttons = $(".btn-round");
        //console.log($(window).scrollTop());
        if ($(this).scrollTop() > 700 && $buttons.hasClass("default")) {
            $buttons.removeClass("default").addClass("fixed");
        } else if ($(this).scrollTop() <= 700 && $buttons.hasClass("fixed")) {
            $buttons.removeClass("fixed").addClass("default");
        }
    });
    //Parallax
    var scene = document.getElementById('scene');
    var parallax = new Parallax(scene);
    //Select
    $('.select').selectize();

    //form
    // пример валидации и отправки формы ajax
    $("#interest-auto-form,#request-call-form").validationEngine('attach', {
        //отображение стрелки возле подсказоки
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
        focusFirstField: false,
        //обновление позиции подсказки при резайзе окна
        autoPositionUpdate: true,
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
            	$(".formErrorContent br").remove();
            	$(".form").addClass("animated shake");
            	$(".form").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
            	    $(this).removeClass("animated shake"); //убираем класс после окончания анимации
            	});
                console.log("Ошибка валидации");
            }
        }
    });
    $('.phone').mask("+375-99-999-99-99"); // маска для полей ввода
})();
