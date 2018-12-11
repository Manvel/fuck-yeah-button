
const button = document.querySelector("button");

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

function clicked()
{
  
}

createListener("mousedown", "mousedown", true);
createListener("mouseup", "mousedown");
