// var animData = {
//     container: document.getElementById('bm'),
//     renderer: 'svg',
//     loop: true,
//     autoplay: true,
//     path: 'crown-animation.json'
// };

// var anim2Data = {
//     container: document.getElementById('bm2'),
//     renderer: 'svg',
//     loop: true,
//     autoplay: true,
//     path: 'ufo-animation.json'
// };

// var anim3Data = {
//   container: document.getElementById('bm4'),
//   renderer: 'svg',
//   loop: true,
//   autoplay: true,
//   path: 'pacman-animation.json'
// };

// var anim4Data = {
//   container: document.getElementById('bm5'),
//   renderer: 'svg',
//   loop: true,
//   autoplay: true,
//   path: 'rocket-animation.json'
// };
// var anim3Data = {
//     container: document.getElementById('bm3').addEventListener('mouseover', function(){ anim.play(); }),
//     renderer: 'svg',
//     loop: false,
//     autoplay: true,
//     path: 'folder-opening.json'
// };

// var anim4Data = {
//     container: document.getElementById('bm4'),
//     renderer: 'svg',
//     loop: false,
//     autoplay: true,
//     path: 'folder-closing.json'
// };




var anim = document.getElementById("bm");
var anim2 = document.getElementById("bm2");
var anim3 = document.getElementById("bm4");
var anim4 = document.getElementById("bm5");
var loader1 = document.getElementById("bm3");


function loadOpenAnimation(loader) {
  
  if(loader == loader1){
  var animationIn = bodymovin.loadAnimation({
    container: loader,
    renderer: "svg",
    loop: false,
    autoplay: false,
    path: 'folder-closing.json'
  });}
  else{
    var animationIn = bodymovin.loadAnimation({
      container: loader,
      renderer: "svg",
      loop: false,
      autoplay: false,
      path: 'ufo-animation.json'
    });
  }


  loader.addEventListener("mouseenter", function() {
    animationIn.setDirection(1);
    animationIn.play();
  });

  loader.addEventListener("mouseleave", function() {
    animationIn.setDirection(-1);
    animationIn.play();
  });

}


function crownAnimation(loader) {

if(loader == anim){
  var animationIn = bodymovin.loadAnimation({
  container: loader,
  renderer: "svg",
  loop: false,
  autoplay: false,
  path: 'crown-animation.json'
});}
else if(loader == anim4){
  var animationIn = bodymovin.loadAnimation({
    container: loader,
    renderer: "svg",
    loop: false,
    autoplay: false,
    path: 'rocket-animation.json'
  });}
  else{
    var animationIn = bodymovin.loadAnimation({
      container: loader,
      renderer: "svg",
      loop: false,
      autoplay: false,
      path: 'pacman-animation.json'
    });
  }



loader.addEventListener("mouseenter", function() {
  animationIn.setDirection(-1);
  animationIn.play();
  animationIn.loop = true;
});

loader.addEventListener("mouseleave", function() {
  animationIn.setDirection(1);
  animationIn.play();
  animationIn.loop = false;
});

}


loadOpenAnimation(loader1);  
crownAnimation(anim);  
loadOpenAnimation(anim2);  
crownAnimation(anim3);  
crownAnimation(anim4); 

