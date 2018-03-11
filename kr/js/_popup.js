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
});

$('.js-popup-in, .js-open-popup, #second_submit').click(function (event) {
	event.stopPropagation();
});

//hide popup on Escape press
$(document).keydown(function (e) {
	if (e.keyCode == 27) {
		$('.js-popup').removeClass('is-open');
		$('body').removeClass('popup-open');
		$("iframe").each(function () {
			var src = $(this).attr('src');
			$(this).attr('src', src);
		});
	}
});

//stop video in popup on close
$('.js-close-popup[data-close="video"]').click(function () {
	$("iframe").each(function () {
		var src = $(this).attr('src');
		$(this).attr('src', src);
	});
});