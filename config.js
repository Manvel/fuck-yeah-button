const {readdirSync, writeFileSync} = require("fs");
const path = require("path");

const templateData =
{
  site: {
    title: "Fuck Yeah Project" // See "layouts/_head.ejs"
  }
};

const fyeas = readdirSync("./public/sounds").map((filePath) => 
{
  const {base} = path.parse(filePath);
  return path.join("sounds", base);
});

writeFileSync("./public/data.json", JSON.stringify(fyeas));

module.exports = {templateData};
