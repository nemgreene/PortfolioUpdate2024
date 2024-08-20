const images = require.context(
  "../../../Images/Portfolio/Projects/PlantApp",
  true
);
const imageList = images.keys().map((image) => images(image));

const structuredImages = [
  {
    src: imageList[0],
    priority: 1,
    cols: 6,
    alt: "Add Plant Form with options",
    title: "Add Plant Form",
  },
  {
    src: imageList[1],
    priority: 1,
    cols: 6,
    alt: "Edit Plant Form with options",
    title: "Edit Plant Form",
  },
  {
    src: imageList[2],
    priority: 1,
    cols: 6,
    alt: "Plant Dashboard Sort Options",
    title: "Dash Sort Options",
  },
  {
    src: imageList[3],
    priority: 1,
    cols: 12,
    alt: "Plant App Issues",
    title: "Issue Backlog",
  },
  {
    src: imageList[4],
    priority: 1,
    cols: 6,
    alt: "Plant App Login",
    title: "Auth/Auth",
  },
  {
    src: imageList[5],
    priority: 1,
    cols: 6,
    alt: "Overview Module",
    title: "Overview Module",
  },
  {
    src: imageList[6],
    priority: 1,
    cols: 8,
    alt: "Plant Cards",
    title: "Plant Card",
  },
  {
    src: imageList[7],
    priority: 1,
    cols: 4,
    alt: "Plant Cards",
    title: "Display Cards, Alternate states",
  },
  {
    src: imageList[8],
    priority: 1,
    cols: 12,
    alt: "Plant App Dash",
    title: "Display Cards",
  },
  {
    src: imageList[9],
    priority: 1,
    cols: 6,
    alt: "Plant App Register",
    title: "Auth/Auth",
  },
];

export const PlantApp = {
  images: structuredImages,
  description: {
    priority: 2,
    image: structuredImages[0],
    p: `Mock up Tech Test for students having completed our Fullstack Developer Bootcamp. 
      
    This Project offers a series of discrete issues ranging in difficulty for junior developers to solve. 16 Issues have been identified across the topics covered in the bootcamp, across many of the most common bugs a junior/mid level developer is most likely to encounter. 
    
    Used to ensure members of the cohort are equipped to stand out in the interview proccess with hands-on experience before even landing their first job.
    
    MERN, AUTH/AUTH, CRUD, MATERIAL UI, FULLSTACK
    `,
  },
  links: [
    { icon: "Github", src: "https://github.com/nemgreene/PlantAppV4.git" },
    {
      icon: "Deployment",
      src: "https://plant-app-pdok.onrender.com/",
    },
  ],

  blocks: [
    {
      priority: 0,
      images: [{ ...structuredImages[0], title: "Plant App" }],
    },

    {
      images: [structuredImages[8]],
      p: `This project was developed as a tool to support ongoing learning for Junior Fullstack Developers, meant to mimic a tech test. 

      It describes a simple App built in 2 different stages. Students are provided an "incomplete" version of the project, with up to 16 issues to solve, ranging in difficulty. The pictures shown here are the "completed" version of the app, included to highlight the features and concepts the students would be working with.


        `,
      priority: 1,
    },
    {
      images: [structuredImages[3]],
      p: `The issues included offer a comprehensive review of the material of the course, rangind in subject. 

      Issues with HTML/CSS, User Input Handling/Validation, UI/UX, Creation of new components in an existing framework, Conversion of legacy code, to more advanced integration with the AUTH/AUTH pipeline, custom middleware, and interacitng with the Database.

      Labels are also included to guide the progression of a developers path. As they complete the simpler issues and get more familiar with the code base, they also become better equipped to handle the more advanced issues.
        `,
      priority: 3,
    },
    {
      images: [structuredImages[6], structuredImages[7]],
      p: `The app is a simple MERN stack app with CRUD and Authorization/Authentication, styled with Material UI. 
      
      Students in the bootcamp are taught Bootstrap, so using MUI serves as a good opportunity to practice the skill essential to a successful developer, learning new libraries via the documentation. In this evolution, we find a library similar conceptually to one they know, but involving new syntax patters, which they'll have to understand to debug.
        `,
      priority: 2,
    },
    {
      images: [structuredImages[0], structuredImages[1]],
      p: `User input is collected with a name, frequency, piority, and an optional picture, which is then added to the database. 
      
      Support of CRUD functionality is one of the core skills of a fullstack developer. In this we offer developers a chance to interact with this pipeline, from handling/validating user data, structuring and validating API calls, AUTH/AUTH, and server side logic, as well as robust error handling around the app.
        `,
      priority: 3,
    },
    {
      images: [structuredImages[4], structuredImages[9]],
      p: `Basic Authentication/Authorization are included in the project, Users must register or login to interact with the app, and a steady stream of Authorization/Session Cookies are maintaned to protect their data. 

      Password encryption with BCrypt, Session cookies with JSON Webtoken, and validation with Passport.js offer a more robust security then explored in the scope of the bootcamp, and chance for students to sink their teeth into more Back-end focused developemnt with focus on best-pracitices and prioritizing protection of user data, even when it's just their plants.
        `,
      priority: 2,
    },

    {
      images: [structuredImages[5], structuredImages[2]],
      p: `Finally some other simple quality of life features are included to introduce some small amount of extra complexity for the developers to maintain.
      
      An overview module includes PieChart library from NPM to debug with its documentation, and a series of sorting options available thorugh a FAB on the Dash.
        `,
      priority: 3,
    },
  ],
};

//
