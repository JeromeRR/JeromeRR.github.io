var main = "/";
var main_kr = "/";
$(document).ready(function(){	
	$.getJSON("http://ip-api.com/json/?callback=?", function(data) {
		if(data.countryCode == "KR" && document.location.pathname.indexOf("kr") == -1){
			document.location.replace(main_kr);
		}else if(data.countryCode != "KR" && document.location.pathname.indexOf("kr") != -1){
			document.location.replace(main);
		}
    });
});
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



var controller = new ScrollMagic.Controller();

//header changes color
// new ScrollMagic.Scene({ triggerElement: "#potential", triggerHook: 'onLeave' }).setClassToggle("#header", "fixed") // add class toggle
// .addTo(controller);

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

class Popup {
  constructor(opt) {
    this.options = opt;

    this.popup = $(opt.popup);
    this.popupIn = $(opt.popupIn);
    this.popupClose = $(opt.popupClose);
    this.popupOpen = $(opt.popupOpen);

    this.afterOpen = opt.afterOpen;
    this.beforeOpen = opt.beforeOpen;
    this.afterClose = opt.afterClose;

    this.popupOpen.on('click', this.open.bind(this));
    this.popupClose.on('click', this.hide.bind(this));

    if (this.options.hideFromParent) this.popup.on('click', this._hideFromParent.bind(this));
  }

  open(e, dataPopup) {
    let target = $(e.currentTarget) || {};
    let data = dataPopup || target.data('open');
    let popup = this.popup.filter(`[data-popup="${data}"]`);

    if ($('.popup').hasClass('is-open')) {

      let zIndexList = [].map.call($('.popup.is-open'), item => +getComputedStyle(item).zIndex);
      let zIndex = Math.max(zIndexList);

      popup.css("zIndex", zIndex + 1);
    }

    if (this.beforeOpen && isFunction(this.beforeOpen)) this.beforeOpen(this.popup, e);

    // popup.fadeIn('fast');
    $('.js-popup').removeClass('is-open');
    $('.js-open-popup').removeClass('active');
    popup.addClass('is-open');
    target.addClass('active');

    //this._scrollTop = $(window).scrollTop();
    $('body')
    //.css('top', -this._scrollTop)
    .addClass('popup-open');

    //callback
    function isFunction(functionToCheck) {
      let getType = {};
      return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
    }

    if (this.afterOpen && isFunction(this.afterOpen)) this.afterOpen(this.popup);

    e.preventDefault();
  }

  hide(e, dataPopup) {
    let target = $(e.currentTarget) || {};
    let data = dataPopup || target.data('open');
    let popup = dataPopup ? this.popup.filter(`[data-popup="${data}"]`) : target.closest(this.options.popup);

    $('body').removeAttr('style').removeClass('popup-open');
    //.scrollTop(this._scrollTop);


    // popup.fadeOut('fast');
    popup.removeClass('is-open');
    $('.js-open-popup').removeClass('active');

    function isFunction(functionToCheck) {
      let getType = {};
      return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
    }

    if (this.afterClose && isFunction(this.afterClose)) this.afterClose(this.popup);

    e.preventDefault();
  }

  _hideFromParent(e) {

    if (!$(e.target).closest(this.options.popupIn).length) {}
  }

}

//data-open / data-popup

let popup = new Popup({
  popup: '.js-popup',
  popupClose: '.js-close-popup',
  popupOpen: '.js-open-popup',
  popupIn: '.js-popup-in',
  hideFromParent: true,
  beforeOpen(popup, e) {
    let target = $(e.currentTarget);
  }
});

//hide popup on click anywhere
$(window).click(function () {
  $('.js-popup').removeClass('is-open');
  $('body').removeClass('popup-open');
  $("iframe").each(function () {
    var src = $(this).attr('src');
    $(this).attr('src', src);
  });
    setTimeout(function(){
        stopVideo(player);
    },200);
});


var player = $('#main_video');
function startVideo(id){
  player=$('#'+id);
  if( player.prop('src').indexOf("?autoplay=1") == -1){
      player.prop('src', player.prop('src')+"?autoplay=1");
  }
}


function stopVideo(player){
    var videoURL = player.prop('src');
    videoURL = videoURL.replace("?autoplay=1", "");
    player.prop('src','');
    player.prop('src',videoURL);
}

$('.js-popup-in, .js-open-popup, #second_submit').click(function (event) {
  event.stopPropagation();
  startVideo('main_video');
});

//hide popup on Escape press
$(document).keydown(function (e) {
  if (e.keyCode == 27) {
    $('.js-popup').removeClass('is-open');
    $('body').removeClass('popup-open');
    $("iframe").each(function () {
      var src = $(this).attr('src');
      $(this).attr('src', src);
        setTimeout(function(){
            stopVideo(player);
        },200);
    });
  }
});

//stop video in popup on close
$('.js-close-popup[data-close="video"]').click(function () {
  $("iframe").each(function () {
    var src = $(this).attr('src');
    $(this).attr('src', src);
  });
  setTimeout(function(){
      stopVideo(player);
  },200);
});
