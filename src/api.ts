import path from "path";
import fs from "fs";
import { sync } from "glob";
import matter from "gray-matter";
import readingTime, { ReadTimeResults } from "reading-time";
import { pageSize, postsPath } from "./config";

export const getSlugs = (): string[] => {
  const paths = sync(`${postsPath}/*.mdx`, {dot:false});

  return paths.map((_path:string) => {
    const [slug, _ext] = path.basename(_path).split(".")
    return slug;
  });
};

export const getAllPosts = () => {
  const posts = getSlugs()
    .map((slug) => getPostFromSlug(slug))
    .sort((a, b) => {
      if (a.meta.date > b.meta.date) return 1;
      if (a.meta.date < b.meta.date) return -1;
      return 0;
    })
    .reverse();
  return posts;
};

interface Post {
  content: string;
  meta: PostMeta;
}

export interface PostMeta {
  excerpt: string;
  slug: string;
  title: string;
  tags: string[];
  date: string;
  readingTime?:ReadTimeResults;
}

export const getPostFromSlug = (slug: string): Post => {
  const postPath = path.join(postsPath, `${slug}.mdx`);
  const source = fs.readFileSync(postPath);
  const { content, data } = matter(source);

  return {
    content,
    meta: {
      slug,
      excerpt: data.excerpt ?? "",
      title: data.title ?? slug,
      tags: (data.tags ?? []).sort(),
      date: (data.date ?? new Date()).toUTCString(),
      readingTime:readingTime(content)
    },
  };
};

export const getPostsMeta = (pageIndex: number, filterTag?:string):[number, PostMeta[]] => {
  let allPosts;
  allPosts = getAllPosts();
  if(filterTag){
    allPosts = allPosts.filter((p => p.meta.tags.some(tagName => (tagName == filterTag))));
  }
  const pageCount = Math.ceil(allPosts.length / pageSize); 
  const startIndex = pageIndex*pageSize
  return [pageCount, allPosts.slice(startIndex,startIndex+pageSize).map(post=>post.meta)];
}