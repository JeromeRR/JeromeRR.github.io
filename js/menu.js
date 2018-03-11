$(document).ready(function () {
  $('.nav-btn').mouseenter(function () {
    $('.nav').addClass('is-active');
  });
  $('.nav').mouseleave(function () {
    $('.nav').removeClass('is-active');
  });
  // Init controller
  var controllerMenu = new ScrollMagic.Controller({
    globalSceneOptions: {
      triggerHook: 0.2,
      reverse: true
    }
  });
  // build scenes
  new ScrollMagic.Scene({
    triggerElement: "#home",
    duration: $('#home').outerHeight()
  }).setClassToggle(".home-a", "active").addTo(controllerMenu);
  new ScrollMagic.Scene({
    triggerElement: "#team",
    duration: $('#team').outerHeight()
  }).setClassToggle(".team-a", "active").addTo(controllerMenu);
  new ScrollMagic.Scene({
    triggerElement: "#paper",
    duration: $('#paper').outerHeight(true)
  }).setClassToggle(".paper-a", "active").addTo(controllerMenu);
  new ScrollMagic.Scene({
    triggerElement: "#token",
    duration: $('#token').outerHeight()
  }).setClassToggle(".token-a", "active").addTo(controllerMenu);
  new ScrollMagic.Scene({
    triggerElement: "#roadmap",
    duration: $('#roadmap').height() + $('#advisors').height() + $('#media').outerHeight()
  }).setClassToggle(".roadmap-a", "active").addTo(controllerMenu);
  new ScrollMagic.Scene({
    triggerElement: "#vision",
    duration: $('#vision').outerHeight()
  }).setClassToggle(".vision-a", "active").addTo(controllerMenu);

  $('.nav__link').click(function (e) {
    e.preventDefault();
    $('html, body').animate({
      scrollTop: $($.attr(this, 'href')).offset().top
    }, 500);
  });

  $('.mob-menu').click(function () {
    $('.nav').toggleClass('is-active-mob');
    $(this).toggleClass('active');
  });
  $('.nav__link').click(function () {
    if ($(window).width() <= 1024) {
      $('.nav').toggleClass('is-active-mob');
      $(this).toggleClass('active');
    }
  });
});