import type { Post } from "./blog";
import { dexaBiaPost } from "./dexaBiaPost";
import { indirectCalorimetryBmrPost } from "./indirectCalorimetryBmrPost";
import { lactateStressVo2maxPost } from "./lactateStressVo2maxPost";
import { restingEnergyPost } from "./restingEnergyPost";
import { vo2maxPost } from "./vo2maxPost";

// Editorial posts supplied for the Volumes Lab site.
export const editorialPosts: Post[] = [
  vo2maxPost,
  dexaBiaPost,
  restingEnergyPost,
  indirectCalorimetryBmrPost,
  lactateStressVo2maxPost,
];
