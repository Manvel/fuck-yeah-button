const countContainer = document.querySelector("#count");
const countTextElem = document.querySelector("#count span");

const incrementCount = () =>
{
  const count = countTextElem.textContent;
  countTextElem.textContent = parseInt(count, 10) + 1;
};

const setContainerPosition = (top) =>
{
  countContainer.style.top = top;
}

module.exports = {incrementCount, setContainerPosition};
