const images = require.context(
  "../../../Images/Portfolio/Projects/MouthRig",
  true
);
const imageList = images.keys().map((image) => images(image));

console.log(imageList);
const structuredImages = [
  {
    src: imageList[0],
    priority: 1,
    cols: 12,
    alt: "Mouth Rig Jaw Open",
  },
  {
    src: imageList[6],
    priority: 1,
    cols: 12,
    alt: "Mouth Rig Jaw Open",
  },
  {
    src: imageList[2],
    priority: 1,
    cols: 12,
    alt: "Mouth Rig Muzzle Deformation",
  },
  {
    src: imageList[3],
    priority: 1,
    cols: 12,
    alt: "Mouth Rig Dynamic LOD",
  },
  {
    src: imageList[4],
    priority: 1,
    cols: 12,
    alt: "Mouth Rig Sticky Lips",
  },
  {
    src: imageList[5],
    priority: 1,
    cols: 12,
    alt: "Mouth Rig Purse Flatten",
  },
  {
    src: imageList[1],
    priority: 1,
    cols: 12,
    alt: "Mouth Rig Animator Control",
  },
  {
    src: imageList[7],
    priority: 1,
    cols: 12,
    alt: "Mouth Rig Jaw Open",
  },
  {
    src: imageList[8],
    priority: 0,
    cols: 12,
    alt: "Mouth Rig Muzzle Deformation",
  },
  {
    src: imageList[9],
    priority: 1,
    cols: 12,
    alt: "Mouth Rig Dynamic LOD",
  },
  {
    src: imageList[10],
    priority: 1,
    cols: 12,
    alt: "Mouth Rig Sticky Lips",
  },
  {
    src: imageList[11],
    priority: 1,
    cols: 12,
    alt: "Mouth Rig Purse Flatten",
  },
  {
    src: imageList[12],
    priority: 1,
    cols: 12,
    alt: "Mouth Rig Animator Control",
  },
  {
    src: imageList[13],
    priority: 1,
    cols: 12,
    alt: "Mouth Rig Animator Control",
  },
];
export const MouthRig = {
  images: structuredImages.slice(7),
  links: [
    { icon: "github", src: "https://github.com/nemgreene/Pathfinder-Pymel" },
  ],

  blocks: [
    {
      priority: 0,
      images: [{ ...structuredImages[0], title: "Mouth Rig" }],
    },
    {
      videos: [
        {
          alt: "Rubix Project Video",
          src: "https://www.youtube.com/embed/CdPDAfeRe6U?si=tlG7MYvGxRasbJfd",
          priority: 0,
        },
      ],
      p: `This is the alpha version of a script for creating a mouth rig. This rig prioritizes naturalistic deformation of the mouth over the muzzle form and a high level of control, allowing the animators to have vertex specific deformation if needed, while offering an abstraction of contol when unneccessary.
      
      A series of joint chains are created for every vertex along the circumference of the deformed area, which are orchestrated to move as a unit. This rig allows the user to define the center of a muzzle shape that the joints move around, simulating real life deformation and sliding.
      
      Additionally, centralizing the behavior of every joint chain as a whole allows for smoother deformation that can be automated, improving mass retention of the lips.`,
      priority: 1,
    },

    {
      priority: 3,
      images: [structuredImages[1]],
      p: `Here the general movement of the rig can be seen. Movement to the jaw control is distributed along the joint chains. This movement is spread at wieghted values along the joint chains, updating the origin of deformation. The rig at rest has this origin at the center of the muzzle, but this will move as the mouth opens.
      
      The main driving force of the mesh is a NURBS curve that dictates where each joint is aimed. By driving the rig with aim constriants (rotation) instead of translation, the muzzle shape can be simulated. 
      
      This NURBS curve is driven by a series of generated deformers, in this gif can be seen the automatically generated "Football" shape that describes the open mouth. These deformers are exposed to the rigger/animator, so they can be edited to improve deformation
      `,
    },
    {
      priority: 2,
      images: [structuredImages[2]],
      p: `With a rig that prioritizes high definition control, the biggest drawback is the overhead for the animator to manage all the controls. In order to minimize this, required LODS are automatically generated. This is a recursive proccess that starts with a base 5 controls, for general animation. The script will find verts between known controls and construct increasing LODS, until all verts have been accounted for.
      
      This level of control can then be used by the animators to have as specific or general control of the mouth shapes as they need. This means that animators have the ability to move individual edge loops of the mouth for perfecting the mouth shapes needed.`,
    },
    {
      priority: 2,
      images: [structuredImages[3]],
      p: `One of the layered deformers in the rig is the system that drives the sticky lips system. 
      
      The rig includes automatic sticky lips as pictured, or the ability to tweak it per side manually`,
    },
    {
      priority: 2,
      images: [structuredImages[4]],
      p: `Another deformer flattens the mouth curves in forward, and scale them inwards.
      
      By affecting the NURBS driver curve directly, the rig can recieve holistic deformations to the curve that still maintain important relationship, like vertex spacing relative to total curve width. `,
    },
    {
      priority: 2,
      images: [structuredImages[5]],
      p: `The last key feature is that all rules are able to be overriden. This rig seeks to offer more realistic deformation thanks to a series of constraints. 
      
      The animator can at any time choose to override the position of the mouth joints to no longer observe the structure of the rig, and use the rig directly in world space as would be expected from a more traditional rig.
      
      This flexibility seeks to offer the best of both worlds. `,
    },
  ],
};
