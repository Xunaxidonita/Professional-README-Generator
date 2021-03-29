const generateMarkdown = require("../utils/generateMarkdown");

const data = {
  title: "Friendship is Magic",
  description: "It is a project to make lots of friends through coding.",
  installation: true,
  installationtext: "Let friendship grow into your heart. Keep an open mind.",
  usage: true,
  usagetext: "Say Hello! and smile. Extend your hand. Introduce yourself.",
  image1: true,
  screenshot0:
    "[![mlp1.png](https://i.postimg.cc/63CJcjLD/mlp1.png)](https://postimg.cc/WFpHb7yn)",
  image2: true,
  screenshot1:
    "[![mlp1.png](https://i.postimg.cc/63CJcjLD/mlp1.png)](https://postimg.cc/WFpHb7yn)",
  image3: false,
  credits: true,
  creditstext: "Fluttershy, Twilight Sparkle",
  license: true,
  licensetext: "BSD3",
  features: true,
  featurestext: "Rainbows, ponies and flowers",
  contributing: true,
  contributingtext: "Be polite and kind",
  tests: true,
  teststext: "Everything passes!",
  questions: true,
  github: "Xunaxidonita",
  email: "xunaxidonaji@yahoo.com.mx",
  build: true,
};

console.log(generateMarkdown(data));

//https://drive.google.com/file/d/1VJThXFf3FdunZIBqRQyCK_SBMM58wbTh/view
