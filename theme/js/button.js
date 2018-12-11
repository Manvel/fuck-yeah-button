
const button = document.querySelector("button");

const fyeas = ["sounds/f1.mp3", "sounds/f2.mp3", "sounds/f3.mp3", "sounds/f4.mp3"].map((file) => new Audio(file));

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
  fyeas[getRandomInt(3)].play();
}

createListener("mousedown", "mousedown", true);
createListener("mouseup", "mousedown");
createListener("touchstart", "mousedown", true);
createListener("touchend", "mousedown");
