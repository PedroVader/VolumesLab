import type { PostBlock } from "./blog";

export const paragraph = (text: string): PostBlock => ({ type: "paragraph", text });
export const linkedParagraph = (text: string, linkText: string, href: string): PostBlock => ({
  type: "paragraph",
  text,
  linkText,
  href,
});
export const heading = (text: string, level: 2 | 3 = 2): PostBlock => ({
  type: "heading",
  text,
  level,
});
export const bulletList = (items: string[]): PostBlock => ({ type: "list", items });
export const table = (headers: string[], rows: string[][]): PostBlock => ({
  type: "table",
  headers,
  rows,
});
