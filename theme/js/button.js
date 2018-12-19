
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

function playSound(data, animation, volume)
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

  if (animation && animation.elem)
    playAnimation(animation, source);
}

function playAnimation(animation, source)
{
  const {elem} = animation;
  const imagesElem = document.querySelector("#images");
  imagesElem.appendChild(elem);
  elem.style.transition = "opacity 1s ease-out 1s";
  const duration = source.buffer.duration;
  window.setTimeout(() => 
  {
    elem.style.opacity = 0;
  }, duration - duration / 10);
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
  const {audio, volume, animation} = fyeas[fileName];
  if (audio)
  {
    playSound(audio, animation, volume);
  }
  else
  {
    fetchSound(fileName).then((audio) =>
    {
      playSound(audio, animation);
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

