(function() {
    'use strict';

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
        },{
            iconLayout: 'default#image',
            iconImageClipRect: [[0,0], [26, 47]],
            iconImageHref: 'templates/_ares/images/sprite-img.png',
            iconImageSize: [75, 53],
            iconImageOffset: [-20, -55]
        });

        myMap.geoObjects.add(myPlacemark);
    }




        $(window).scroll(function(){
        	 var $buttons = $(".btn-round");
        	//console.log($(window).scrollTop());
            if ( $(this).scrollTop() > 700 && $buttons.hasClass("default") ){
                $buttons.removeClass("default").addClass("fixed");
            } else if($(this).scrollTop() <= 700 && $buttons.hasClass("fixed")) {
                $buttons.removeClass("fixed").addClass("default");
            }
        });
})();


