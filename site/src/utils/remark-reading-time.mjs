import getReadingTime from "reading-time";
import { toString as mdastToString } from "mdast-util-to-string";

export const remarkReadingTime =
  () =>
  (tree, { data }) => {
    const textContent = mdastToString(tree);
    const readingTime = getReadingTime(textContent);

    // Inject reading time data into frontmatter
    data.astro.frontmatter.readingTime = readingTime.text;
    data.astro.frontmatter.minutesRead = Math.ceil(readingTime.minutes);
    data.astro.frontmatter.wordCount = readingTime.words;
  };
