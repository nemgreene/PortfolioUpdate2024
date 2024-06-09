// const rubix0 =
//   "https://drive.google.com/file/d/1IHTgXNh3nsuU5t1YpOw4coaEbb0xB2iW/view?usp=sharing";
// const rubix1 =
//   "https://drive.google.com/file/d/1HNHQYkgrUvjGg_dmZWmiEoevV1lMOYMX/view?usp=sharing";
// const rubix2 =
//   "https://drive.google.com/file/d/1HPKlVMCZFPUFANZ1EPHbhrHSaB0om_OO/view?usp=sharing";
// const rubix3 =
//   "https://drive.google.com/file/d/1HPuhzb7o0t5xVy-W-I4QPKHzdtbiMjUT/view?usp=sharing";
// const rubix4 =
//   "https://drive.google.com/file/d/1H_AUoatdudTI07UGieIlPGHKpaPsSaWv/view?usp=sharing";
// const rubix5 =
//   "https://drive.google.com/file/d/1Hmk02jUm41LEgYviu0Lm34rM2YanxnNg/view?usp=sharing";
// const rubix6 =
//   "https://drive.google.com/file/d/1Hy48h1bMfaX1OWXJz4TTk_isXxjO4O6_/view?usp=sharing";
// const rubix7 =
//   "https://drive.google.com/file/d/1I2nJP8clhk5WtAPS0HAoghrhZnV8jvMR/view?usp=sharing";
// const rubix8 =
//   "https://drive.google.com/file/d/1IAkdDDpi7UewTWXZFDQkitCoCc5LNeUh/view?usp=sharing";
// const rubix9 =
//   "https://drive.google.com/file/d/1IBeILrzaupIyMl_EK0WDLCMfzLvp9KWZ/view?usp=sharing";

const images = require.context(
  "../../../Images/Portfolio/Projects/rubix",
  true
);
const imageList = images.keys().map((image) => images(image));
const [
  rubix0,
  rubix1,
  rubix2,
  rubix3,
  rubix4,
  rubix5,
  rubix6,
  rubix7,
  rubix8,
  rubix9,
] = imageList;

const structuredImages = [
  { src: rubix0, priority: 0, alt: "rubixProjectBanner" },
  {
    src: rubix1,
    priority: 1,
    alt: "rubixProjectMachineVisualization",
  },
  { src: rubix9, priority: 1, alt: "rubixProjectTestingLog" },
  {
    src: rubix2,
    priority: 3,
    cols: 4,
    alt: "rubixSolverStage1",
    title: "Step 2",
  },
  {
    src: rubix3,
    priority: 3,
    cols: 4,
    alt: "rubixSolverStage3",
    title: "Step 3",
  },
  {
    src: rubix4,
    priority: 3,
    cols: 4,
    alt: "rubixSolverStage4",
    title: "Step 4",
  },
  {
    src: rubix5,
    priority: 3,
    cols: 4,
    alt: "rubixSolverStage5",
    title: "Step 5",
  },
  {
    src: rubix6,
    priority: 3,
    cols: 4,
    alt: "rubixSolverStage6",
    title: "Step 6",
  },
  {
    src: rubix7,
    priority: 3,
    cols: 4,
    alt: "rubixSolverStage7",
    title: "Step 7",
  },
  {
    src: rubix8,
    priority: 3,
    cols: 4,
    alt: "rubixSolverStage8",
    title: "Step 8",
  },
];

export const RubixContent = {
  title: "Rubix Project",
  images: structuredImages,
  links: [
    { icon: "Github", src: "https://github.com/nemgreene/RubixSolver.git" },
    { icon: "Youtube", src: "https://youtu.be/cpJc0scX97w" },
  ],
  description: {
    priority: 2,
    image: structuredImages[0],
    p: `All of the algorithms require a world-vector nostalgic understanding of the cube. 
    
    Algorithms need to be run facing one of the 4 lateral faces of the cube, and has to understand how to rotate a section relative to its understanding. 
    
    One algorithm might require the “Machine” to be viewing the cube from [-1, 0,0] world space, and rotate the left side clockwise, or to view the cube from [0,0,1] and rotate the top counter clockwise. `,
  },
  blocks: [
    {
      title: "Rubix Cube Solver",
      images: [structuredImages[0]],
      priority: 0,
    },
    {
      videos: [
        {
          alt: "Rubix Project Video",
          src: "https://www.youtube.com/embed/cpJc0scX97w?si=rGzBfOJgktVlPQH9",
          priority: 0,
        },
      ],
    },
    {
      priority: 2,
      images: [structuredImages[1]],
      p: `All of the algorithms require a world-vector nostalgic understanding of the cube. 
      
      Algorithms need to be run facing one of the 4 lateral faces of the cube, and has to understand how to rotate a section relative to its understanding. 
      
      One algorithm might require the “Machine” to be viewing the cube from [-1, 0,0] world space, and rotate the left side clockwise, or to view the cube from [0,0,1] and rotate the top counter clockwise. `,
    },
    {
      priority: 3,
      images: structuredImages.slice(3, 10),
      p: `The algorithm takes 8 steps to solve a scrambled cube (Step 1 not showed). `,
    },
    {
      priority: 1,
      images: [structuredImages[2]],
      p: `Each step in the testing is also timed and rotations counted, and the data is collected in a log file. This offers me insight into what steps need the most optimization: 

      Most steps execute in under 5 seconds with an average of 15 rotations, with the exception of steps 2/3 which average 15 seconds and 55 rotations. This is as expected, and highlights where optimization can be made when development is continued on it. 

      The average runtime of execution without testing is around 35 seconds. 
       `,
    },
  ],
};
