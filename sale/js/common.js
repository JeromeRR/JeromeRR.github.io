$('.select').niceSelect();

$('.js-scroll').each(function () {
	$(this).niceScroll();
});

var menuBtn = document.querySelector('.js-menu-btn');
var menu = document.querySelector('.js-menu');
var header = document.getElementById('header');
menuBtn.addEventListener('click', function () {
	this.classList.toggle('menu-opened');
	menu.classList.toggle('is-opened');
	if (header) {
		header.classList.toggle('menu-opened');
	}
});

var sidebarBtn = document.querySelector('.js-sidebar-open');
var sidebar = document.querySelector('.js-sidebar');
if (sidebarBtn && sidebar) {
	sidebarBtn.onclick = function () {
		this.classList.toggle('active');
		sidebar.classList.toggle('opened');
	};
}

//copy button
var copyBtn = document.querySelector('.js-copy');
var linkElem = document.querySelector('.js-link');
if (copyBtn && linkElem) {
	var link = document.querySelector('.js-link').textContent;
	copyBtn.onclick = function () {
		var textArea = document.createElement('textarea');

		textArea.style.cssText = 'position: absolute; \
		top: 0; \
		left: 0; \
		width: 0; \
		height: 0; \
		opacity: 0; ';

		textArea.textContent = link;
		document.body.appendChild(textArea);
		textArea.select();
		document.execCommand('Copy');
		document.body.removeChild(textArea);
	};
}

var controller = new ScrollMagic.Controller();

//header changes color
new ScrollMagic.Scene({ triggerElement: "#potential", triggerHook: 'onLeave' }).setClassToggle("#header", "fixed") // add class toggle
.addTo(controller);

//agree button
var checker = document.getElementById("agreeCheckbox");
var sendbtn = document.getElementById("bnt_next");