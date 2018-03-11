$(function () {
  var w = window.innerWidth;
  if (w >= 1024) {
    var header = $('.header');

    var mainScreenTimeline = new TimelineMax().to(header, .7, {
      opacity: 1,
      y: 0
    }, .2);
  }
});