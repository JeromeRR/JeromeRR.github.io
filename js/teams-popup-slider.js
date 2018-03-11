$('.teams-popup-slider').slick({
  vertical: true,
  slidesToShow: 3,
  responsive: [{
    breakpoint: 1680,
    settings: {
      slidesToShow: 2
    }
  }]
});

$(window).bind('mousewheel', function (event) {
  if (event.originalEvent.wheelDelta >= 0) {
    $('.teams-popup-slider').find('.slick-prev').click();
  } else {
    $('.teams-popup-slider').find('.slick-next').click();
  }
});