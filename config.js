const {readdirSync, readFileSync, writeFileSync} = require("fs");
const path = require("path");

const templateData =
{
  site: {
    title: "Fuck Yeah Project",
    countText: "Fuck Yeah Counter:"
  }
};

const fyeaControls = JSON.parse(readFileSync("./fycontrol.json"));
const fyeas = readdirSync("./public/sounds").filter((item) => item != "fallback").reduce((acc, filePath) => 
{
  const {name} = path.parse(filePath);
  if (!acc[name])
    acc[name] = {}
  return acc;
}, fyeaControls);

writeFileSync("./public/data.json", JSON.stringify(fyeas));

module.exports = {templateData};
