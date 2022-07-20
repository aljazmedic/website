import { getPostsMeta, PostMeta } from "@/src/api";
import ArticleSummary from "@/src/components/ArticleSummary";
import Bio from "@/src/components/Bio";
import { author, description, title } from "@/src/config";
import '@/styles/PostsPage.module.css'
import { GetStaticProps } from "next";
import Head from "next/head";
import { Fragment } from "react";


interface PostsPageData {
  pageNumber: number;
  pageCount: number;
  postMetas: PostMeta[];
}

export default function Home({ pageNumber, pageCount, postMetas }:  PostsPageData) {
  let pageTitle = title;
  return (
    <Fragment>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={description}/>
        <meta name="author" content={author}/>
      </Head>
      <h1>
        Welcome to my blog!
      </h1>
      <Bio />
        {postMetas.map(m=><ArticleSummary key={m.slug} meta={m} />)}
        
    </Fragment>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const pageNumber = 0;
  const pageN = parseInt(pageNumber || "1")-1 ;
  const [, postMetas] = getPostsMeta(pageN);
  return { props: {  postMetas  } };
};