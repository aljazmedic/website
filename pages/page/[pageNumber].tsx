import type { GetStaticProps, GetStaticPaths } from "next";
import Head from "next/head";

import { getPostsMeta, getSlugs, PostMeta } from "@/src/api";
import {title, description, author, pageSize} from '@/src/config'
import ArticleSummary from "@/src/components/ArticleSummary";
import { getSequence } from "@/src/util";

interface PostsPageData {
  pageNumber: number;
  pageCount: number;
  postMetas: PostMeta[];
}

export default function PostsPage({ pageNumber, pageCount, postMetas }:  PostsPageData) {
  let pageTitle = title;
  let pageNum = "1";
  if (pageNumber){
    pageNum = ((pageNumber || 0)+1).toString()
    pageTitle = `${pageNumber} - page ${pageNum}`
  } 
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <h1>
        Posts-wall #{pageNum}
      </h1>
        {postMetas.map(m=><ArticleSummary key={m.slug} meta={m} />)}
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // Get data for each possible path
  const { pageNumber } = params as { pageNumber: string };
  const pageN = parseInt(pageNumber || "1")-1 ;
  const [pageCount, postMetas] = getPostsMeta(pageN);
  return { props: {  pageNumber:pageN, pageCount, postMetas  } };
};

export const getStaticPaths: GetStaticPaths = async () => {
  // Get possible slugs for this page
  const numPosts = getSlugs().length;
  const numPages = Math.ceil(numPosts / pageSize);
  const paths = getSequence(numPages).map(v=>({params:{pageNumber:(v+1).toString()}}));
  return {
    paths,
    fallback: false,
  };
};
