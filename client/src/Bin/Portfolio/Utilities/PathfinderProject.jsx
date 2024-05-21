const images = require.context(
  "../../../Images/Portfolio/Projects/Pathfinder",
  true
);
const imageList = images.keys().map((image) => images(image));

const structuredImages = [
  {
    src: imageList[0],
    priority: 1,
    cols: 12,
    alt: "Pathfinder Step 1",
    title: "Pathfinder Step 1",
  },
  {
    src: imageList[1],
    priority: 1,
    cols: 12,
    alt: "Pathfinder Step 2",
    title: "Pathfinder Step 2",
  },
  {
    src: imageList[2],
    priority: 1,
    cols: 12,
    alt: "Pathfinder Step 3",
    title: "Pathfinder Step 3",
  },
  {
    src: imageList[3],
    priority: 1,
    cols: 12,
    alt: "Pathfinder Step 4",
    title: "Pathfinder Step 4",
  },
  {
    src: imageList[4],
    priority: 0,
    cols: 12,
    alt: "Pathfinder Step 5",
    title: "Pathfinder Step 5",
  },
];

export const PathfidnerProject = {
  images: structuredImages,
  links: [
    { icon: "github", src: "https://github.com/nemgreene/Pathfinder-Pymel" },
  ],

  blocks: [
    {
      priority: 0,
      images: [{ ...structuredImages[0], title: "A* Pathfinder" }],
    },
    {
      videos: [
        {
          alt: "Pathfinder Project Video",
          src: "https://www.youtube.com/embed/_dBJQS0u6cI?si=ZlybGYPWDmO7eQCr",
          priority: 0,
        },
      ],
    },

    {
      p: `This project was a simple implementation of an A* pathfinding algoritm in Pymel, visualized in Maya.
      
      The A* algorithm is one of the simplest pathfinding implementations. It uses a heuristic to guide it's search to the destination, and is an extension of Dijkstra's Algorithm.
      
      Step 1 in this implementation creates a Spot, a class wrapper that represents the current location.
      `,
      priority: 2,
      images: [structuredImages[0]],
    },
    {
      priority: 2,
      images: [structuredImages[1]],
      p: `Step 2 evaluates all possible steps from the current location, and ranks them according to the heuristic. In this case, Manhattan distance is used. 
      
      This is the key distinction compared to Djikstras algorithm, offering improved performance.
      `,
    },
    {
      priority: 2,
      images: [structuredImages[2]],
      p: `Step 3 moves the current location to the nighbor with the lowest score, starting the loop again.

       In the image included, the algorithm has gone to the coordinates marked by a heuristic score of 27, then reevaluates its neighbors. 

       The algorithm also adds the previous spot to a blacklist so it is not evaluated again.
      `,
    },
    {
      priority: 2,
      images: [structuredImages[3]],
      p: `The algorithm continues iteration as described, evaluating the next step that moves it closest to the desitnation, moving to it, adding the previous spot to the blacklist, and looping. 

      The image included shows the path taken by the algorithm, shown by the red squares. Iteration is completed once the final spot has the desitnation in its possible neighbors.

      The algorithm then traces the path back. As seen in the constructor, each spot also keeps track of the spot representing the previous step. By following this back, the algorithm iterates back to the start. 

      This proccess is illustrated by the yellow X's as the path is traced backwards.
      `,
    },
    {
      priority: 2,
      images: [structuredImages[4]],
      p: `Finally, once the path steps are collected, the path can be illustrated.
      `,
    },
  ],
};
