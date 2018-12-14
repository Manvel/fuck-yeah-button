const {readdirSync, readFileSync, writeFileSync} = require("fs");
const path = require("path");

const templateData =
{
  site: {
    title: "Fuck Yeah Project" // See "layouts/_head.ejs"
  }
};

const fyeaControls = JSON.parse(readFileSync("./fycontrol.json"));
const fyeas = readdirSync("./public/sounds").reduce((acc, filePath) => 
{
  const {base} = path.parse(filePath);
  if (!acc[base])
    acc[base] = {}
  return acc;
}, fyeaControls);

writeFileSync("./public/data.json", JSON.stringify(fyeas));

module.exports = {templateData};
