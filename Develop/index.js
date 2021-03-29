// TODO: Include packages needed for this application
const fs = require("fs");

const generatePage = require("./utils/generateMarkdown.js");

const inquirer = require("inquirer");

const licenseBagdes = require("./utils/licenses.js");
const { exit } = require("process");

const licenseList = Object.keys(licenseBagdes);

const profileDataArgs = process.argv.slice(2);

// TODO: Create an array of questions for user input
const questions = [
  "What is the name of your project?",
  "Provide a description of the project (Required)",
  "Do you have installation instructions?",
  "Provide your Installation instructions",
  "Do you have usage instructions or examples?",
  "Provide your examples",
  "Do you have screenshots to add?",
  "Enter the screenshot url",
  "Want to add another screenshot",
  "Did you have collaborators?",
  "Enter the names of your collaborators",
  "Do you have a License?",
  "What type of license?",
  "Does your project has special features?",
  "List them",
  "Would you like to have other developers contribuite to your project?",
  "Enter the guidelines any contributor should follow",
  "Do you have tests for your project?",
  "Enter an example of your tests",
  "Do you want to add Info for contact with Questions?",
  "Add Github Name:",
  "Add E-mail:",
  "Would you like to create the README?",
];

// TODO: Create a function to write README file
function writeToFile(data) {
  fs.writeFile("./README.md", generatePage(data), (err) => {
    if (err) throw new Error(err);

    console.log("README complete! Check out README.md to see the output!");
  });
}

// TODO: Create a function to initialize app
const initApp = () => {
  console.log(`
  =================
  Create new README
  =================
  `);
  return inquirer
    .prompt([
      {
        type: "input",
        name: "title",
        message: questions[0],
      },
      {
        type: "input",
        name: "description",
        message: questions[1],
      },
      {
        type: "confirm",
        name: "installation",
        message: questions[2],
        default: false,
      },

      {
        type: "input",
        name: "installationtext",
        message: questions[3],
        when: (answers) => answers.installation,
      },
      {
        type: "confirm",
        name: "usage",
        message: questions[4],
        default: false,
      },
      {
        type: "input",
        name: "usagetext",
        message: questions[5],
        when: (answers) => answers.usage,
      },
      {
        type: "confirm",
        name: "image1",
        message: questions[6],
        when: (answers) => answers.usage,
        default: false,
      },
      {
        type: "input",
        name: "screenshot0",
        message: questions[7],
        when: (answers) => answers.image1,
      },
      {
        type: "confirm",
        name: "image2",
        message: questions[8],
        when: (answers) => answers.image1,
        default: false,
      },
      {
        type: "input",
        name: "screenshot1",
        message: questions[7],
        when: (answers) => answers.image2,
      },
      {
        type: "confirm",
        name: "image3",
        message: questions[8],
        when: (answers) => answers.image2,
        default: false,
      },
      {
        type: "input",
        name: "screenshot2",
        message: questions[7],
        when: (answers) => answers.image3,
      },
      {
        type: "confirm",
        name: "credits",
        message: questions[9],
        default: false,
      },
      {
        type: "input",
        name: "creditstext",
        message: questions[10],
        when: (answers) => answers.credits,
      },
      {
        type: "confirm",
        name: "license",
        message: questions[11],
        default: false,
      },
      {
        type: "list",
        name: "licensetext",
        message: questions[12],
        choices: licenseList,
        when: (answers) => answers.license,
      },
      {
        type: "confirm",
        name: "features",
        message: questions[13],
        default: false,
      },
      {
        type: "input",
        name: "featurestext",
        message: questions[14],
        when: (answers) => answers.features,
      },
      {
        type: "confirm",
        name: "contributing",
        message: questions[15],
        default: false,
      },
      {
        type: "input",
        name: "contributingtext",
        message: questions[16],
        when: (answers) => answers.contributing,
      },
      {
        type: "confirm",
        name: "tests",
        message: questions[17],
        default: false,
      },
      {
        type: "input",
        name: "teststext",
        message: questions[18],
        when: (answers) => answers.tests,
      },
      {
        type: "confirm",
        name: "questions",
        message: questions[19],
        default: false,
      },
      {
        type: "input",
        name: "github",
        message: questions[20],
        when: (answers) => answers.questions,
      },
      {
        type: "input",
        name: "email",
        message: questions[21],
        when: (answers) => answers.questions,
      },
      {
        type: "confirm",
        name: "build",
        message: questions[22],
        default: false,
      },
    ])
    .then((answers) => {
      if (answers.build) {
        writeToFile(answers);
      }
    })

    .catch((error) => {
      if (error.isTtyError) {
        console.error("Something went wrong!");
        exit(1);
      } else {
        console.error(error);
      }
    });
};
// Function call to initialize app
initApp();
