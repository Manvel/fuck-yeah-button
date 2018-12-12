(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){

const button = document.querySelector("button");

let fyeas = [];

fetch("data.json").then((data) => data.json()).then((data) =>
{
  fyeas = data.map((file) => new Audio(file));
  
});

function createListener(eventName, classname, action)
{
  button.addEventListener(eventName, () =>
  {
    if (action)
    {
      clicked();
      button.classList.add(classname);
    }
    else
    {
      button.classList.remove(classname);
    }
  });
}

function getRandomInt(max)
{
  return Math.floor(Math.random() * Math.floor(max));
}

function clicked()
{
  fyeas[getRandomInt(fyeas.length - 1)].play();
}

createListener("mousedown", "mousedown", true);
createListener("mouseup", "mousedown");
createListener("touchstart", "mousedown", true);
createListener("touchend", "mousedown");

},{}]},{},[1]);
