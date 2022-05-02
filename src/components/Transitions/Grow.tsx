import { mergeComponents } from "../../utils/mergeComponents";
import { Fade } from "./Fade";
import { Zoom } from "./Zoom";

export const Grow = mergeComponents(Fade, Zoom);
