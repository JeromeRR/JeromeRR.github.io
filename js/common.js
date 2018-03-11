var menuBtn = document.querySelector('.js-menu-btn');
var menu = document.querySelector('.js-menu');
var header = document.getElementById('header');
menuBtn.addEventListener('click', function () {
  this.classList.toggle('menu-opened');
  header.classList.toggle('menu-opened');
  menu.classList.toggle('is-opened');
});

var controller = new ScrollMagic.Controller();

//header changes color
new ScrollMagic.Scene({ triggerElement: "#potential", triggerHook: 'onLeave' }).setClassToggle("#header", "fixed") // add class toggle
.addTo(controller);

var now = new Date();
var today = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
var preicoStartDate = new Date("March 21, 2018 13:00");

function mosstimer(_date, _target, _fn) {

  var timer = new Timer();
  var thedate = _date;
  var diffdate = thedate - today;
  var sec = diffdate / 1000;

  timer.start({ countdown: true, startValues: { seconds: sec } });
  timer.addEventListener('secondsUpdated', function (e) {
    var time = timer.getTimeValues();
    $(_target).find(".js-timer-days").html(time.days);
    $(_target).find(".js-timer-hours").html(time.hours);
    $(_target).find(".js-timer-minutes").html(time.minutes);
    $(_target).find(".js-timer-seconds").html(time.seconds);
  });

  // timer.addEventListener('targetAchieved', function (e) {

  //     if(_fn == "preicostart"){
  //         $("#upcomming").removeClass("active");
  //         $("#preico").addClass("active");
  //         loadeth();
  //     };

  // });
}

mosstimer(preicoStartDate, ".js-timer", "preicostart");

//team slider
$('.js-founders-slider').slick({
  slidesToShow: 4,
  prevArrow: $('.js-founders-slider-prev'),
  nextArrow: $('.js-founders-slider-next'),
  responsive: [{
    breakpoint: 1366,
    settings: {
      slidesToShow: 3
    }
  }, {
    breakpoint: 1024,
    settings: {
      slidesToShow: 2
    }
  }, {
    breakpoint: 768,
    settings: {
      slidesToShow: 1
    }
  }]
});

$('.js-team-slider').slick({
  slidesToShow: 5,
  prevArrow: $('.js-team-slider-prev'),
  nextArrow: $('.js-team-slider-next'),
  responsive: [{
    breakpoint: 1366,
    settings: {
      slidesToShow: 4
    }
  }, {
    breakpoint: 1024,
    settings: {
      slidesToShow: 2
    }
  }, {
    breakpoint: 768,
    settings: {
      slidesToShow: 1
    }
  }]
});

$('.js-advisor-slider').slick({
  slidesToShow: 4,
  prevArrow: $('.js-advisor-slider-prev'),
  nextArrow: $('.js-advisor-slider-next'),
  responsive: [{
    breakpoint: 1366,
    settings: {
      slidesToShow: 3
    }
  }, {
    breakpoint: 1024,
    settings: {
      slidesToShow: 2
    }
  }, {
    breakpoint: 768,
    settings: {
      slidesToShow: 1
    }
  }]
});

$(document).on('click', 'a[href^="#"]', function (event) {
  event.preventDefault();

  $('html, body').animate({
    scrollTop: $($.attr(this, 'href')).offset().top - 100
  }, 500);
});