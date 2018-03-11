$('.roadmap').slick({
  initialSlide: 19,
  slidesToShow: 9,
  speed: 500,
  slidesToScroll: 1,
  centerMode: true,
  infinite: false,
  arrows: false,
  responsive: [{
    breakpoint: 1920,
    settings: {
      slidesToShow: 7
    }
  }, {
    breakpoint: 1366,
    settings: {
      slidesToShow: 7
    }
  }, {
    breakpoint: 1024,
    settings: {
      slidesToShow: 3
    }
  }, {
    breakpoint: 768,
    settings: {
      slidesToShow: 1,
      variableWidth: true
    }
  }]
});

$('.roadmap .slick-current').prevAll().addClass('roadmap__slide_past');

$('.roadmap-btn_prev').click(function () {
  $('.roadmap').slick('slickGoTo', 0);
});

$('.roadmap-btn_next').click(function () {
  $('.roadmap').slick('slickGoTo', $('.roadmap__slide').length - 1);
});