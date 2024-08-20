const images = require.context(
  "../../../Images/Portfolio/Projects/PlantApp",
  true
);
const imageList = images.keys().map((image) => images(image));

const structuredImages = [
  {
    src: imageList[0],
    priority: 1,
    cols: 12,
    alt: "Add Plant Form with options",
    title: "Add Plant Form",
  },
  {
    src: imageList[1],
    priority: 1,
    cols: 12,
    alt: "Edit Plant Form with options",
    title: "Edit Plant Form",
  },
  {
    src: imageList[2],
    priority: 1,
    cols: 12,
    alt: "Plant Dashboard Filter Options",
    title: "Dash Filters",
  },
  {
    src: imageList[3],
    priority: 1,
    cols: 12,
    alt: "Plant App Login",
    title: "Auth/Auth",
  },
  {
    src: imageList[4],
    priority: 1,
    cols: 12,
    alt: "Overview Module",
    title: "Overview Module",
  },
  {
    src: imageList[5],
    priority: 1,
    cols: 12,
    alt: "Plant Cards",
    title: "Plant Card",
  },
  {
    src: imageList[6],
    priority: 1,
    cols: 12,
    alt: "Plant Cards",
    title: "Display Cards",
  },
  {
    src: imageList[7],
    priority: 1,
    cols: 12,
    alt: "Plant App Dash",
    title: "Dashboard",
  },
  {
    src: imageList[7],
    priority: 1,
    cols: 12,
    alt: "Plant App Register",
    title: "Auth/Auth",
  },
];

export const PlantApp = {
  images: structuredImages,
  description: {
    priority: 2,
    image: structuredImages[0],
    p: `Mock up Tech Test for students coming out 
      
      Offering a lifecycle to support development without artifacts and a series of methods commonly used for scripting jobs. 
      
      This represents an ongoing body of development that supports my progress as a techincal artist
  
       MERN, AUTH/AUTH, CRUD, MATERIAL UI, FULLSTACK
      `,
  },
  links: [
    { icon: "Github", src: "https://github.com/nemgreene/Pathfinder-Pymel" },
  ],

  blocks: [
    {
      priority: 0,
      images: [{ ...structuredImages[0], title: "Base Scripter" }],
    },

    {
      images: [structuredImages[7]],
      p: `This project was developed as a tool to support ongoing learning for Junior Fullstack Developers, meant to mimic a simple tech test. 

      
        `,
      priority: 1,
    },
  ],
};
