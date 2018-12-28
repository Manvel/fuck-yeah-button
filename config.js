const {readdirSync, readFileSync, writeFileSync} = require("fs");
const path = require("path");

const description = "Fuck Yeah Button, for Fuck Yeah Sound and Animation! Turn on the volume to the top - hit the button YEAH!";

const shareButtons = [
  {
    "name": "Facebook",
    "image": "/images/social/facebook.svg",
    "path": "https://www.facebook.com/sharer/sharer.php?u="
  },
  {
    "name": "Twitter",
    "image": "/images/social/twitter.svg",
    "path": "https://twitter.com/home?status=",
    "text": ` - ${description}`
  },
  {
    "name": "Google Plus",
    "image": "/images/social/gplus.svg",
    "path": "https://plus.google.com/share?url="
  },
  {
    "name": "Linkedin",
    "image": "/images/social/linkedin.svg",
    "path": "https://www.linkedin.com/shareArticle?url="

  }
];

const templateData =
{
  site: {
    countText: "Fuck Yeah Counter:",
    shareButtons, description
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

const configReloadWatchers = ["fycontrol.json"];

module.exports = {templateData, configReloadWatchers};
