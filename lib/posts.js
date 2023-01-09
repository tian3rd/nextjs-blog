// In Next.js, the lib folder does not have an assigned name like the pages folder, so you can name it anything. It's usually convention to use lib or utils.
// fs is a Node.js module that let's you read files from the file system.
import fs from "fs";
// path is a Node.js module that let's you manipulate file paths.
import path from "path";
// matter is a library that let's you parse the metadata in each markdown file.
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

//
const postsDirectory = path.join(process.cwd(), "posts");

export function getSortedPostsData() {
  // get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // remove .md from file name to get id
    const id = fileName.replace(/\.md$/, "");
    // read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf-8");
    // use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);
    // combine the data with id
    return {
      id,
      ...matterResult.data,
    };
  });
  // sort posts by date
  // .sort in-place modification
  return allPostsData.sort((a, b) => {
    // because the returned dic is {id, ...matterResult.data} of which the matterResult.data has a date field (in our posts)
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);
  // Returns an array that looks like this:
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   }
  // ]
  return fileNames.map((fileName) => {
    // The returned list is not just an array of strings — it must be an array of objects that look like the comment
    // Each object must have the params key and contain an object with the id key (because we’re using [id] in the file name). Otherwise, getStaticPaths will fail.
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
}

// use async to process markdown content
export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf-8");
  const matterResult = matter(fileContents);
  // use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();
  return {
    id,
    contentHtml,
    ...matterResult.data,
  };
}
