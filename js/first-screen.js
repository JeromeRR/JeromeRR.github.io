$(function () {
  var w = window.innerWidth;
  if (w >= 1024) {
    var header = $('.header');
    var title = $('.hero__title');
    var timer = $('.hero__timer');
    var button = $('.hero__button');
    var phone = $('.hero__phone');
    var scroll = $('.hero__scroll-down');

    var mainScreenTimeline = new TimelineMax().to(header, .7, {
      opacity: 1,
      y: 0
    }, .2).to(title, .5, {
      opacity: 1,
      y: 0
    }, .5).to(timer, .7, {
      opacity: 1,
      y: 0
    }, .7).to(button, .5, {
      opacity: 1,
      y: 0
    }, 1).to(phone, .7, {
      className: '+=is-active'
    }, 1.5).to(scroll, .7, {
      className: '+=is-active'
    }, 2);
  }
});