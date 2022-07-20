import Link from "next/link";
import { PostMeta } from "../api";
import ArticleMeta from "./ArticleMeta";
import styles from "./ArticleSummary.module.css";

export default function ArticleSummary({ meta }: { meta: PostMeta }) {
  return (
    <article className={styles.ArticleSummary}>
      <h2>
        <Link
          href={{
            pathname: `/posts/[slug]`,
            query: {
              slug: meta.slug,
            },
          }}
        >
          {meta.title}
        </Link>
      </h2>
      <ArticleMeta meta={meta} />
      <p>{meta.excerpt}</p>
    </article>
  );
}
