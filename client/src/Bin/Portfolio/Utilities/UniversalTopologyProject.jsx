const images = require.context(
  "../../../Images/Portfolio/Projects/UniversalTopology",
  true
);
const imageList = images.keys().map((image) => images(image));
const [
  guideProportions,
  headCompA,
  headCompB,
  detailBodyA,
  detailBodyB,
  detailBodyC,
  detailBodyD,
  detailFaceA,
  detailFaceB,
  detailHands,
  hero,
] = imageList;

const structuredImages = [
  {
    src: detailFaceA,
    priority: 1,
    alt: "Universal Topology Face Detail",
  },
  {
    src: detailFaceB,
    priority: 1,
    alt: "Universal Topology Face Detail",
    cols: 3,
  },
  {
    src: detailHands,
    priority: 3,
    alt: "Universal Topology Face Detail",
    cols: 9,
  },

  {
    src: detailBodyA,
    priority: 2,
    alt: "Universal Topology Face Detail",
  },
  { src: detailBodyB, priority: 2, alt: "Universal Topology Face Detail" },
  { src: detailBodyC, priority: 2, alt: "Universal Topology Face Detail" },
  { src: detailBodyD, priority: 2, alt: "Universal Topology Face Detail" },

  {
    src: guideProportions,
    priority: 3,
    alt: "Universal Topology Face Detail",
    title: "Credit BlueSky Studios",
  },
  {
    src: headCompA,
    priority: 3,
    alt: "Universal Topology Face Detail",
    title: "Credit BlueSky Studios",
  },
  {
    src: headCompB,
    priority: 3,
    alt: "Universal Topology Face Detail",
    title: "Credit BlueSky Studios",
  },
  {
    src: hero,
    priority: 3,
    alt: "Universal Topology Hero Banner",
    title: "Universal Topology",
  },
];

export const UniversalProject = {
  images: structuredImages,
  description: {
    image: structuredImages[0],
    p: `Universal Topology for a base humanoid character that offers a flexible start to the rigging pipeline`,
  },
  blocks: [
    {
      title: "Universal Topology",
      images: [structuredImages[10]],
      priority: 0,
    },
    {
      videos: [
        {
          alt: "Rubix Project Video",
          src: "https://www.youtube.com/embed/wI9aMy9t6cg?si=rFT0sLsHf6bUa9ln",
          priority: 0,
        },
      ],
    },
    {
      videos: [
        {
          alt: "Rubix Project Video",
          src: "https://www.youtube.com/embed/aGWIPP5UyDs?si=Ojg3I6pFGT8gjDfm",
          priority: 0,
        },
      ],
    },

    {
      priority: 1,
      //   images: [structuredImages[2]],
      images: structuredImages.slice(7, 10),
      p: `This project is heavily inspired by a video published by Blue Sky studio about their character creation pipeline (Above)
       I’ll be integrating this into the pipeline for a series of projects I’ll be working on.
         `,
    },
    {
      priority: 3,
      images: [structuredImages[1], structuredImages[2]],
      p: `The focus of development for this asset was to create a baseline, universal asset, that is flexible enough to offer geometry for film-quality deformation, and also generic enough to be reshaped into a wide range of humanoid characters. 
      
      With a unified starting point, character rigging can then also be automated which I’ll be focusing on in the next step of development.
      
     `,
    },
    {
      priority: 2,
      images: structuredImages.slice(3, 6),
      p: `
      Some of the important features of this mesh are:

      •	Good topology for deformation and animation
      •	Good general face size distribution, for a rig that is as light as possible
      •	The ability to add edge loops around key areas (Eyes, Mouth) that will not circle the entire mesh for unwanted density, if needed
      •	Zbrush Polygroup division for easy control during sculpting.
      •	Color coded zones to help inform modeling and rigging pipeline,
      •	Skeleton inside to further inform modeling and rigging, (credit to Hippydrome)`,
    },
  ],
};
