
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
