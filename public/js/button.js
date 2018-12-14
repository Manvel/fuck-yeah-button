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
    fetchSound(filename).then((audio) =>
    {
      fyeas[filename].audio = audio;
    });
  }
});

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

function playSound(data, volume)
{
  
  const gainNode = audioCtx.createGain();
  const source = audioCtx.createBufferSource();

  source.buffer = data;
  gainNode.gain.value = 1;
  if (volume)
    gainNode.gain.value = volume;
  source.connect(gainNode);
  
  gainNode.connect(audioCtx.destination);
  source.start(0);
}

function getRandomInt(max)
{
  return Math.floor(Math.random() * Math.floor(max));
}

function clicked()
{
  const fyeasArray = Object.keys(fyeas);
  const fileName = fyeasArray[getRandomInt(fyeasArray.length - 1)];
  const {audio, volume} = fyeas[fileName];
  if (audio)
  {
    playSound(audio, volume);
  }
  else
  {
    fetchSound(fileName).then((audio) =>
    {
      playSound(audio);
    })
  }
}

createListener("mousedown", "mousedown", true);
createListener("mouseup", "mousedown");
createListener("touchstart", "mousedown", true);
createListener("touchend", "mousedown");

},{}]},{},[1]);
