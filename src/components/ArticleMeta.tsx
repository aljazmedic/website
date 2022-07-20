import Link from "next/link";
import { formatReadingTime, formatDate, formatTag, tagComparator } from "../util";
import type { PostMeta } from "@/src/api";
import styles from "./ArticleMeta.module.css";

export default function ArticleMeta({ meta }: { meta: PostMeta }) {
  let readingTimeElement;
  const { date, tags } = meta;
  if (meta.readingTime) {
    let minutes = Math.max(Math.round(meta.readingTime.minutes), 1);
    readingTimeElement = (
      <>
        {" "}
        &bull;{" "}
        <span className={styles.readingTime}>{formatReadingTime(minutes)}</span>
      </>
    );
  }

  return (
    <small className={styles.ArticleMeta}>
      <time dateTime={date}>{formatDate(date)}</time>
      {tags && tags.length && (
        <>
          {" "}
          &bull;{" "}
          <ul className={styles.tags}>
            {tags.sort(tagComparator).map((tag: string) => (
              <li key={tag}>
                <Link href={{ pathname: `/tags/[tag]`, query: { tag } }}>
                  {formatTag(tag)}
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
      {readingTimeElement || null}
    </small>
  );
}
