$(document).ready(function () {

  // Init controller
  var controllerSections = new ScrollMagic.Controller({
    globalSceneOptions: {
      triggerHook: 0.5,
      reverse: true
    }
  });
  // build scenes
  new ScrollMagic.Scene({
    triggerElement: "#home",
    duration: $('#home').outerHeight()
  }).setClassToggle(".nav", "is-active-first").addTo(controllerSections);
  new ScrollMagic.Scene({
    triggerElement: "#team",
    duration: $('#team').outerHeight()
  }).setClassToggle("#team", "active").addTo(controllerSections);
  new ScrollMagic.Scene({
    triggerElement: "#paper",
    duration: $('#paper').outerHeight()
  }).setClassToggle("#paper", "active").addTo(controllerSections);
  new ScrollMagic.Scene({
    triggerElement: "#token",
    duration: $('#token').outerHeight()
  }).setClassToggle("#token", "active").addTo(controllerSections);
  new ScrollMagic.Scene({
    triggerElement: "#roadmap",
    duration: $('#roadmap').height()
  }).setClassToggle("#roadmap", "active").addTo(controllerSections);
  new ScrollMagic.Scene({
    triggerElement: "#advisors",
    duration: $('#advisors').outerHeight()
  }).setClassToggle("#advisors", "active").addTo(controllerSections);
  new ScrollMagic.Scene({
    triggerElement: "#media",
    duration: $('#media').outerHeight()
  }).setClassToggle("#media", "active").addTo(controllerSections);
  new ScrollMagic.Scene({
    triggerElement: "#vision",
    duration: $('#vision').outerHeight()
  }).setClassToggle("#vision", "active").addTo(controllerSections);
});