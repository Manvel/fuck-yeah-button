(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){

const button = document.querySelector("button");
const fyeahBuffer = {};
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();

let fyeas = {};

fetch("data.json").then((data) => data.json()).then((data) =>
{
  fyeas = data;
  for (const filename of Object.keys(fyeas))
  {
    const {animation} = fyeas[filename];
    fetchSound(filename).then((audio) =>
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
    img.width = width;
  if (height)
    img.height = height;
  img.style.zIndex = 2;
  img.style.marginLeft = "auto";
  img.style.marginRight = "auto";
  img.style.left = 0;
  img.style.right = 0;
  img.style.position = "absolute";
  return img;
}

function fetchSound(fileName)
{
  return fetch(`sounds/${fileName}`).then((sound) =>
  {
    return sound.arrayBuffer();
  }).then((buffer) =>
  {
    return audioCtx.decodeAudioData(buffer);
  });
}

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

function getKey(obj)
{
  const urlKey = new URLSearchParams(window.location.search).get("play");
  if (urlKey)
    return urlKey;
  const keys = Object.keys(obj)
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

function playAnimation(animation, source, offset)
{
  const {elem} = animation;
  const imagesElem = document.querySelector("#images");
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
    }
  };
}

function clicked()
{
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


},{}]},{},[1]);
