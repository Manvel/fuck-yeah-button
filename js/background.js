(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
// wait until DOM is ready
document.addEventListener("DOMContentLoaded", function(event) {

  function ground() {

    var tl = new TimelineMax({
      repeat: -1
    });

    tl.to("#ground", 20, {
        backgroundPosition: "1301px 0px",
        force3D:true,
        rotation:0.01,
        z:0.01,
        autoRound:false,
        ease: Linear.easeNone
      });

    return tl;
  }

  function clouds() {

    var tl = new TimelineMax({
      repeat: -1
    });

    tl.to("#clouds", 52, {
      backgroundPosition: "-2247px bottom",
      force3D:true,
      rotation:0.01,
      z:0.01,
      //autoRound:false,
      ease: Linear.easeNone
    });
    
    return tl;
  }

  var masterTL = new TimelineMax({
    repeat: -1
  });
  
  // window load event makes sure image is 
// loaded before running animation
window.onload = function() {
  
  masterTL
  .add(ground(),0)
  .add(clouds(),0)
  .timeScale(0.7)
  .progress(1).progress(0)
  .play();

};
  
});
},{}]},{},[1]);
