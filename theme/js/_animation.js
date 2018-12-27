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
    }
  };
}

module.exports = {playAnimation};
