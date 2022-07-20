import type { GetStaticProps } from "next";
import Head from "next/head";
import { getAllPosts, getPostsMeta, PostMeta } from "@/src/api";
import Link from 'next/link'
import styles from '@/styles/TagIndexPage.module.css'

interface Tag {
  count: number
  name: string
}

interface TagIndexPageData {
  tags: Tag[]
}

export default function TagIndexPage({ tags }: TagIndexPageData) {
  return (
    <div className={styles.TagIndexPage}>
      <h1>Tags</h1>
      <ul>
        {tags.map(tag => (
          <li key={tag.name}>
            <Link href={{
                pathname:"/tags/[tagname]",
                query:{tagname:tag.name}
            }}>
              <a> {tag.name} ({tag.count}) </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
export const getStaticProps: GetStaticProps = async () => {
    const posts = getAllPosts();
  const tagPageCount: { [key: string]: number } = {};
  posts.forEach((post) =>
    post.meta.tags.forEach((t) => {
      if (!(t in tagPageCount)) tagPageCount[t] = 1;
      else tagPageCount[t]++;
    })
  );
  const tags:Tag[] = Object.entries(tagPageCount).map(([name,count])=>({
        count,
        name
  })) 
  
  return {
    props: {
        tags
    },
  };
};