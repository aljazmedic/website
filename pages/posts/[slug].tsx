import type { GetStaticProps, GetStaticPaths } from "next";
import Image from "next/image";
import Head from "next/head";

import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeHighlight from "rehype-highlight";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import { getPostFromSlug, getSlugs, PostMeta } from "@/src/api";

import YouTube from "@/src/components/Youtube";
import "highlight.js/styles/atom-one-dark.css";
import ArticleMeta from "@/src/components/ArticleMeta";

interface MDXPost {
  source: MDXRemoteSerializeResult<Record<string, unknown>>;
  meta: PostMeta;
}

export default function PostPage({ post }: { post: MDXPost }) {
  return (
    <>
      <Head>
        <title>{post.meta.title}</title>
        <meta name="description" content={post.meta.excerpt}/>
        <link rel='stylesheet' href="https://cdn.jsdelivr.net/npm/katex@0.15.0/dist/katex.min.css" />
      </Head>
      <h1>{post.meta.title}</h1>
      < ArticleMeta meta={post.meta} />
      <MDXRemote {...post.source} components={{ YouTube, Image }} />
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params as { slug: string };
  const { content, meta } = getPostFromSlug(slug);
  const katexOptions: katex.KatexOptions = {
    output:"htmlAndMathml",
  };
  const mdxSource = await serialize(content, {
    mdxOptions: {
      rehypePlugins: [
        rehypeSlug,
        [rehypeAutolinkHeadings, { behavior: "wrap" }],
        [rehypeKatex, katexOptions],
        rehypeHighlight,
      ],
      remarkPlugins: [remarkMath],
    },
  });

  return { props: { post: { source: mdxSource, meta } } };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getSlugs().map((slug) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
};
