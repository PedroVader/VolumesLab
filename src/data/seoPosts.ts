import type { Post } from "./blog";
import { dexaBiaPost } from "./dexaBiaPost";
import { restingEnergyPost } from "./restingEnergyPost";
import { vo2maxPost } from "./vo2maxPost";

// The three optimized editorial articles supplied for this site. The CMS
// currently has no entries with these slugs, so each appears at its existing URL.
export const editorialPosts: Post[] = [vo2maxPost, dexaBiaPost, restingEnergyPost];
