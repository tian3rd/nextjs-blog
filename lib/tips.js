import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const tipsDirectory = path.join(process.cwd(), "tips");

export function getSortedTipsData() {
  const fileNames = fs.readdirSync(tipsDirectory);
  console.log(fileNames);
  const allTipsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, "");
    const fullPath = path.join(tipsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf-8");
    const matterResult = matter(fileContents);
    return {
      id,
      ...matterResult.data,
    };
  });
  return allTipsData.sort((a, b) => {
    if (a.update < b.update) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllTipIds() {
  const fileNames = fs.readdirSync(tipsDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
}

export async function getTipData(id) {
  const fullPath = path.join(tipsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf-8");
  const matterResult = matter(fileContents);
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
