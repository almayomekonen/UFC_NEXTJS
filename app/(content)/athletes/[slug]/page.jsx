import { notFound } from "next/navigation";
import Link from "next/link";
import { getNewsItem } from "@/lib/news";

import imageMap from "@/data/imageMap";

import classes from "./page.module.css";

const NewsDetailPage = async ({ params }) => {
  const newsSlug = params.slug;
  const newsItem = await getNewsItem(newsSlug);

  if (!newsItem) {
    notFound();
  }

  const imageUrl = imageMap[newsItem.slug];

  return (
    <>
      <div className={classes.newsContainer}>
        <article className={classes.newsArticle}>
          <section className={classes.section}>
            <Link href={`/athletes/${newsItem.slug}/image`}></Link>
          </section>
          <header>
            <Link href={`/athletes/${newsItem.slug}/image`}>
              <img src={imageUrl} alt={newsItem.title} />
            </Link>
          </header>

          <div className={classes.fighterDetails}>
            <p>"{newsItem.nickname}"</p>
            <h2>{newsItem.title}</h2>
            <span>{newsItem.weight} division</span>
            <span>{newsItem.record} [W, L, D]</span>
          </div>

          <div className={classes.fighterResume}>
            <div className={classes.finishes}>
              <h2>{newsItem.firstRoundFinishes}</h2>
              <hr />
              <p>FIRST ROUND FINISHES</p>
            </div>

            <div className={classes.finishes}>
              <h2>{newsItem.knockouts}</h2>
              <hr />
              <p>WINS BY KNOCKOUT</p>
            </div>
          </div>
        </article>
      </div>
    </>
  );
};

export default NewsDetailPage;

{
  /* <time dateTime={newsItem.date}>{newsItem.date}</time>
<p>{newsItem.content}</p> */
}
