import type { GetStaticProps, GetStaticPaths } from "next";
import Head from "next/head";
import { getAllPosts, getPostsMeta, PostMeta } from "@/src/api";
import { pageSize } from "@/src/config";
import { getSequence } from "@/src/util";
import ArticleSummary from "@/src/components/ArticleSummary";

interface TagPageProps {
  tag: string;
  postMetas: PostMeta[];
  pageCount: number;
  pageNumber?: string;
}

export default function TagPage({
  tag,
  postMetas,
  pageCount,
  pageNumber,
}: TagPageProps) {
  return (
    <>
      <Head>
        <title>Blog posts with {tag}</title>
      </Head>
      <h1>Looking at /tags/{tag}</h1>
      {postMetas.map(m=><ArticleSummary key={m.slug} meta={m} />)}
    </>
  );
}

export const getStaticProps: GetStaticProps<TagPageProps> = async ({ params }) => {
  const { tag: tagQuery } = params as { tag: string[] };
  let pageN = 0;
  if(tagQuery.length == 2) {
    pageN = parseInt(tagQuery[1] || "1") -1;
  }
  const tag = tagQuery[0];
  const [pageCount, postMetas] = getPostsMeta(pageN, tag);
  return {
    props: {
      tag,
      postMetas,
      pageCount,
      pageNumber:((pageN || 0)+1).toString()
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getAllPosts();
  const tagPageCount: { [key: string]: number } = {};
  posts.forEach((post) =>
    post.meta.tags.forEach((t) => {
      if (!(t in tagPageCount)) tagPageCount[t] = 1;
      else tagPageCount[t]++;
    })
  );
  const paths = Object.entries(tagPageCount)
    .map(([tag, numPosts]) => [
      { params: { tag: [tag] } }, // Path no page
      getSequence(Math.ceil(numPosts / pageSize)).map((pageNo) => ({
        params: { tag: [tag, (pageNo + 1).toString()] },
      })),
    ])
    .flat(2);
  return {
    paths,
    fallback: false,
  };
};
