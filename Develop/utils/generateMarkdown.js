const licenseBagdes = require("./licenses.js");

String.prototype.toProperCase = function () {
  return this.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
function renderLicenseBadge(license) {
  let myLicense = licenseBagdes[license];
  let badge = myLicense.badge;
  return badge;
}

// TODO: Create a function that returns the license link
// If there is no license, return an empty string
function renderLicenseLink(license) {
  let myLicense = licenseBagdes[license];
  let link = myLicense.link;
  return link;
}

// TODO: Create a function that returns the license section of README
// If there is no license, return an empty string
function renderLicenseSection(license) {
  let myName = licenseBagdes[license].license;
  let myBadge = renderLicenseBadge(license);
  let myLink = renderLicenseLink(license);
  var myLicense = [myName, myBadge, myLink];
  return myLicense;
}

const screenshotChecker = function (data) {
  const images = [];
  for (let i = 1; i < 4; i++) {
    let myvar = "image" + i;
    if (data[myvar]) {
      let newImage = "screenshot" + (i - 1);
      images.push(data[newImage]);
    }
  }
  return images;
};

const getGitAccount = function (githubName) {
  let gitLink = `[Github](https://github.com/${githubName})`;
  return gitLink;
};

const genEmailLink = function (email) {
  let emailLink = `[${email}](mailto:${email})`;
  return emailLink;
};

const possibleContent = [
  "installation",
  "usage",
  "credits",
  "license",
  "badges",
  "features",
  "contributing",
  "tests",
  "questions",
];

const dataToContentGenerator = function (availableContent, data) {
  let myContents = {
    table: [],
    sections: [],
  };
  if (availableContent.length >= 3) {
    const tableOfContent = ["## Table of contents: \n"];
    availableContent.forEach((element) =>
      tableOfContent.push(`* [${element.toProperCase()}](#${element})`)
    );
    myContents.table = tableOfContent;
  }
  const titleContent = [];
  availableContent.forEach((element) => {
    let contentText;
    if (element === "license") {
      const licenseContent = renderLicenseSection(data.licensetext);
      contentText = licenseContent[0];
    } else if (element === "questions") {
      let gitAccount = getGitAccount(data.github);
      let linkToMail = genEmailLink(data.email);
      contentText = [gitAccount, linkToMail];
    } else {
      contentText = data[element + "text"];
    }
    let newContent = {
      title: element.toProperCase(),
      content: contentText,
    };
    titleContent.push(newContent);
  });

  const sections = [];
  titleContent.forEach((element) => {
    let toPush = `## ${element.title}\n\n${element.content}`;
    if (element.title === "Usage") {
      let screenshots = screenshotChecker(data);
      screenshots.forEach((image) => (toPush = toPush + `\n\n${image}`));
    } else if (element.title === "Questions") {
      toPush = `## ${element.title}`;
      let contactWay = element.content;
      contactWay.forEach((way) => (toPush = toPush + `\n\n${way}`));
    } else if (element.title === "License") {
      let licenseInfo = renderLicenseSection(data.licensetext);
      toPush = `## ${element.title}\n\n[${licenseInfo[0]}](${licenseInfo[2]})`;
    }
    sections.push(toPush);
  });
  myContents.sections = sections;
  return myContents;
};

// TODO: Create a function to generate markdown for README
function generateMarkdown(data) {
  const availableContent = possibleContent.filter((key) => data[key]);
  let myLicense = ["", "", ""];
  if (data.license) {
    myLicense = renderLicenseSection(data.licensetext);
  }

  myContents = dataToContentGenerator(availableContent, data);

  return `# ${data.title}

${myLicense[1]}

## Description:

${data.description}

${myContents.table.join("\n")}

${myContents.sections.join("\n\n\n")}
`;
}

module.exports = generateMarkdown;
