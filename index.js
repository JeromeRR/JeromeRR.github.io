var animData = {
    container: document.getElementById('bm'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: 'crown-animation.json'
};

var anim2Data = {
    container: document.getElementById('bm2'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: 'ufo-animation.json'
};

var anim3Data = {
  container: document.getElementById('bm4'),
  renderer: 'svg',
  loop: true,
  autoplay: true,
  path: 'pacman-animation.json'
};

var anim4Data = {
  container: document.getElementById('bm5'),
  renderer: 'svg',
  loop: true,
  autoplay: true,
  path: 'rocket-animation.json'
};
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




var anim = bodymovin.loadAnimation(animData);
var anim2 = bodymovin.loadAnimation(anim2Data);
var anim3 = bodymovin.loadAnimation(anim3Data);
var anim4 = bodymovin.loadAnimation(anim4Data);
var loader1 = document.getElementById("bm3");


function loadOpenAnimation(loader) {
  var animationIn = bodymovin.loadAnimation({
    container: loader,
    renderer: "svg",
    loop: false,
    autoplay: false,
    path: 'folder-opening.json'
  });

  loader1.addEventListener("mouseenter", function() {
    animationIn.setDirection(-1);
    animationIn.play();
  });

  loader1.addEventListener("mouseleave", function() {
    animationIn.setDirection(1);
    animationIn.play();
  });

}


loadOpenAnimation(loader1);  
