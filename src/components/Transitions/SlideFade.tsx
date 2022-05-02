import { mergeComponents } from "../../utils/mergeComponents";
import { Fade } from "./Fade";
import { Slide } from "./Slide";

export const SlideFade = mergeComponents(Fade, Slide);
