const images = require.context("../../../Images/Portfolio/Projects/IKFK", true);

const imageList = images.keys().map((image) => images(image));

const structuredImages = [
  {
    src: imageList[0],
    priority: 0,
    cols: 12,
    alt: "IKFK image",
  },
];
export const IKFKProject = {
  images: structuredImages,

  blocks: [
    {
      videos: [
        {
          alt: "Rubix Project Video",
          src: "https://www.youtube.com/embed/l-Me9mReodQ?si=pw7AGa_liuza5gea",
          priority: 0,
        },
      ],
    },
    {
      priority: 2,
      images: [structuredImages[0]],
      p: `Script developed in Pymel to automate the riggins proccess. The script generates a simple IK/FK blend system. 
      
      The rig created includes:
      • Global Control
      •	Color coded Nurbs curves controls 
      • IK/FK Blend 
      • Stretcy IK rig with Nudge for animation
      • Stretchy FK
      • Orientation agnostic
      • Joint number agnostic
      `,
    },
  ],
};
