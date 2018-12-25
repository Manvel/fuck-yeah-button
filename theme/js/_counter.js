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
