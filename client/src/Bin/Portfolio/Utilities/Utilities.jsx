import { BaseScripter } from "./BasescripterProject";
import { IKFKProject } from "./IKFKProject";
import { MouthRig } from "./MouthRigProject";
import { PathfidnerProject } from "./PathfinderProject";
import { RubixContent } from "./RubixProject";
import { UniversalProject } from "./UniversalTopologyProject";
import GitHubIcon from "@mui/icons-material/GitHub";
import YouTubeIcon from "@mui/icons-material/YouTube";
import PaletteIcon from "@mui/icons-material/Palette";
import { DevBlog } from "./DevBlog";
import { SudokuApp } from "./SudokuApp";
import { PlantApp } from "./PlantAppProject";
import WebIcon from "@mui/icons-material/Web";

export const letters = Array.from("abcdefghijklmnopqrstuvwx");

export const path404 = "/badUrl";

export const categories = [
  {
    title: "Web Dev",
    projects: [
      { title: "Development Blog", content: DevBlog },
      { title: "Plant App", content: PlantApp },
      { title: "Sudoku Generator", content: SudokuApp },
    ],
  },
  {
    title: "Tehcnical Art",
    projects: [
      { title: "Rubix Solver", content: RubixContent },
      { title: "IK FK Script", content: IKFKProject },
      { title: "BaseScripter", content: BaseScripter },
      { title: "Pathfinder Project", content: PathfidnerProject },
      { title: "Mouth Rig Alpha", content: MouthRig },
    ],
  },
  {
    title: "Modeling/Rigging",
    projects: [{ title: "Universal Topology", content: UniversalProject }],
  },
  // { title: "WebDev" },
  // { title: "VisDev" },
  // { title: "GamesDev" },
];

export const iconDictionary = {
  Github: (sx = {}) => <GitHubIcon sx={sx} />,
  Youtube: (sx = {}) => <YouTubeIcon sx={sx} />,
  Artstation: (sx = {}) => <PaletteIcon sx={sx} />,
  Deployment: (sx = {}) => <WebIcon sx={sx} />,
};
