$(function () {
  var w = window.innerWidth;
  if (w >= 1024) {
    let controllerAnimations = new ScrollMagic.Controller();

    let potential = new TimelineMax().staggerTo('.potential__col', 1, {
      className: '+=is-active'
    }, .5);
    let potentialScene = new ScrollMagic.Scene({
      triggerElement: ".potential",
      triggerHook: 0.8,
      reverse: false
    });
    potentialScene.setTween(potential).addTo(controllerAnimations);

    let about = new TimelineMax().staggerTo('.about', 1, {
      className: '+=is-active'
    }, .5);
    let aboutScene = new ScrollMagic.Scene({
      triggerElement: "#about",
      triggerHook: 0.4,
      reverse: false
    });
    aboutScene.setTween(about).addTo(controllerAnimations);

    let roadmap = new TimelineMax().staggerTo('.roadmap__item', 1, {
      className: '+=is-active'
    }, .5);
    let roadmapScene = new ScrollMagic.Scene({
      triggerElement: "#roadmap",
      triggerHook: 0.4,
      reverse: false
    });
    roadmapScene.setTween(roadmap).addTo(controllerAnimations);
  }
});