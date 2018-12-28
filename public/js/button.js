(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const imagesElem = document.querySelector("#images");

const playAnimation = (animation, source, offset) =>
{
  const {elem} = animation;
  if (imagesElem.children.length % 2 != 0 && Math.random() >= 0.5)
  {
    elem.style.bottom = "20px";
  }
  imagesElem.appendChild(elem);
  elem.style.transition = "opacity ease-out 1s";
  const duration = source.buffer.duration * 1000;
  window.setTimeout(() => 
  {
    elem.style.opacity = 0;
  }, (duration - duration / 3) - offset * 1000);
  source.onended = () =>
  {
    if (imagesElem.contains(elem))
    {
      imagesElem.removeChild(elem);
      elem.style.opacity = 1;
      elem.style.bottom = null;
    }
  };
}

module.exports = {playAnimation};

},{}],2:[function(require,module,exports){
const countContainer = document.querySelector("#count");
const countTextElem = document.querySelector("#count span");

const getCounter = () =>
{
  fetch("https://ksy4fyawu4.execute-api.us-west-2.amazonaws.com/prod/counter")
  .then((response) => response.json()).then((count) =>
  {
    countContainer.classList.add("loaded");
    countTextElem.textContent = count;
  });
};

const incrementCount = () =>
{
  if (!countContainer.classList.contains("loaded"))
    return;

  const count = countTextElem.textContent;
  countTextElem.textContent = parseInt(count, 10) + 1;
  fetch("https://ksy4fyawu4.execute-api.us-west-2.amazonaws.com/prod/counter/increase",
        {method: "POST"});
};

const setContainerPosition = (top) =>
{
  countContainer.style.top = top;
}

getCounter();

module.exports = {incrementCount, setContainerPosition};

},{}],3:[function(require,module,exports){
const {setContainerPosition} = require("./_counter");
const button = document.querySelector("#button");
const imageContainer = document.querySelector("#images");

function setContainerSize()
{
  const {top, bottom} = button.getBoundingClientRect();
  imageContainer.style.width = top + "px";
  setContainerPosition((bottom) + "px");
}

document.addEventListener("DOMContentLoaded", () =>
{
  setContainerSize();
  window.addEventListener("resize", setContainerSize);
});


},{"./_counter":2}],4:[function(require,module,exports){
const {incrementCount} = require("./_counter");
const {playAnimation} = require("./_animation");
require("./_layout");

const button = document.querySelector("#button");
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();

let fyeas = {};

function isOgSupported()
{
  const myAudio = document.createElement("audio");
  return myAudio.canPlayType("audio/ogg");
}

fetch("data.json").then((data) => data.json()).then((data) =>
{
  fyeas = data;
  const format = isOgSupported() ? ".ogg" : ".mp3";
  for (const filename of Object.keys(fyeas))
  {
    const {animation} = fyeas[filename];
    fetchSound(filename + format).then((audio) =>
    {
      fyeas[filename].audio = audio;
    });
    if (animation)
    {
      animation.elem = fetchImg(animation);
    }
  }
});

function fetchImg(animation)
{
  const {url, width, height} = animation;
  const img = document.createElement("img");
  img.setAttribute("src", url);
  if (width)
    img.style.width = width;
  if (height)
    img.style.height = height;
  return img;
}

function fetchSound(fileName)
{
  const subFolder = isOgSupported() ? "" : "fallback/";
  return fetch(`sounds/${subFolder}${fileName}`).then((sound) =>
  {
    return sound.arrayBuffer();
  }).then((buffer) =>
  {
    return new Promise((resolve, reject) => {
      audioCtx.decodeAudioData(buffer, (buffer) =>
      {
        resolve(buffer);
      });
    });
  });
}

function createListener(eventName, classname, action)
{
  button.addEventListener(eventName, () =>
  {
    audioCtx.resume();
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

function getKey(obj)
{
  const urlKeys = new URLSearchParams(window.location.search).getAll("play");
  const keys = urlKeys.length ? urlKeys : Object.keys(obj);
  return keys[keys.length * Math.random() << 0];
};

function playSound({audio, animation, volume, offset = 0})
{
  const gainNode = audioCtx.createGain();
  const source = audioCtx.createBufferSource();

  source.buffer = audio;
  gainNode.gain.value = 1;
  if (volume)
    gainNode.gain.value = volume;
  source.connect(gainNode);
  
  gainNode.connect(audioCtx.destination);
  source.start(0, offset);

  if (animation && animation.elem)
    playAnimation(animation, source, offset);
}

function clicked()
{
  incrementCount();
  const fileName = getKey(fyeas);
  const data = fyeas[fileName];
  if (data.audio)
  {
    playSound(data);
  }
  else
  {
    fetchSound(fileName).then((audio) =>
    {
      data.audio = audio;
      playSound(data);
    })
  }
}

if ("ontouchstart" in document.documentElement)
{
  createListener("touchstart", "mousedown", true);
  createListener("touchend", "mousedown");
}
else
{
  createListener("mousedown", "mousedown", true);
  createListener("mouseup", "mousedown");
}

},{"./_animation":1,"./_counter":2,"./_layout":3}]},{},[4]);
