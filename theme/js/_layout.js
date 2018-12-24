const {setContainerPosition} = require("./_counter");
const button = document.querySelector("#button");
const imageContainer = document.querySelector("#images");

function setContainerSize()
{
  const {top, bottom} = button.getBoundingClientRect();
  imageContainer.style.width = top + "px";
  imageContainer.style.height = top + "px";
  setContainerPosition((bottom + 50) + "px");
}

document.addEventListener("DOMContentLoaded", () =>
{
  setContainerSize();
  window.addEventListener("resize", setContainerSize);
});

