import {
  createAnimatedComponent,
  mergeAnimatedComponents,
} from "../../utils/createAnimatedComponent";
import { Fade } from "./Fade";
import { Zoom } from "./Zoom";

export const Grow = mergeAnimatedComponents(Fade, Zoom);
