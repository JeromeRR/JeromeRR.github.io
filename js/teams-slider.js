$('.teams-slider').slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  fade: true,
  adaptiveHeight: false,
  asNavFor: '.teams-slider-nav',
  arrows: false
});
$('.teams-slider-nav').slick({
  slidesToShow: 5,
  slidesToScroll: 1,
  asNavFor: '.teams-slider',
  focusOnSelect: true,
  variableWidth: true,
  centerMode: true
});

$('.teams-slider').on('afterChange', function (event, slick, currentSlide, nextSlide) {
  $('.teams-slider .slick-slide').removeClass("is-active");
  $('.teams-slider .slick-active').addClass("is-active");
});

var stHeight = $('.teams-slider').find('.slick-track').height();
$('.teams-slider').find('.container_slider').css('height', stHeight + 'px');

//setting top postion of nav slider
/*(function(){
  if ($(window).width() >= 1680) {
    var coordinate = $('.member__name').outerHeight(true) + $('.member__position').outerHeight(true) + $('.member__descr').outerHeight(true) + 400;
    $('.container-slider-nav').css('top', coordinate + 'px');
    //var coordinateBtn = $('.member__name').outerHeight(true) + $('.member__position').outerHeight(true) + $('.member__descr').outerHeight(true) + $('.teams-slider-nav').outerHeight(true)  + 450;
    //$('.js-teams-btn').css('top', coordinateBtn + 'px');
  }
  if ($(window).width() >= 1024) {
    var coordinate = $('.member__name').outerHeight(true) + $('.member__position').outerHeight(true) + $('.member__descr').outerHeight(true) + 200;
    $('.container-slider-nav').css('top', coordinate + 'px');
    //var coordinateBtn = $('.member__name').outerHeight(true) + $('.member__position').outerHeight(true) + $('.member__descr').outerHeight(true) + $('.teams-slider-nav').outerHeight(true)  + 450;
    //$('.js-teams-btn').css('top', coordinateBtn + 'px');
  }
})();*/