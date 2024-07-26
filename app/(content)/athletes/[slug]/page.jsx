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

  const profileImageUrl =
    imageMap[newsItem.slug]?.profile || `/images/news/${newsItem.image}`;
  const actionImageUrl =
    imageMap[newsItem.slug]?.action || `/images/news/${newsItem.image}`;

  return (
    <div className={classes.newsContainer}>
      <article className={classes.newsArticle}>
        <header>
          <Link href={`/athletes/${newsItem.slug}/image?fighter=profile`}>
            <img src={profileImageUrl} alt={newsItem.title} />
          </Link>

          <div className={classes.actionImage}>
            <p>{newsItem.event}</p>
            <p>{newsItem.fightDate}</p>
            <Link href={`/athletes/${newsItem.slug}/image?fighter=action`}>
              <p>{newsItem.knockoutDetail}</p>
              <img src={actionImageUrl} alt={newsItem.title} />
            </Link>
            <p>{newsItem.location}</p>
            <h4>{newsItem.highlight}</h4>
            <button>VIEW FIGHT HISTORY</button>
          </div>
        </header>

        <div className={classes.detailsAndResume}>
          <div className={classes.fighterDetails}>
            <h3>"{newsItem.nickname}"</h3>
            <h2>{newsItem.title}</h2>
            <span>{newsItem.weight} division</span>
            <span>{newsItem.record} [W, L, D]</span>
          </div>

          <div className={classes.fighterResume}>
            <div className={classes.finishes}>
              <h2>{newsItem.firstRoundFinishes}</h2>
              <hr />
              <p>
                FIRST <br />
                ROUND
                <br /> FINISHES
              </p>
            </div>

            <div className={classes.finishes}>
              <h2>{newsItem.knockouts}</h2>
              <hr />
              <p>
                WINS
                <br /> BY <br />
                TKO
              </p>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default NewsDetailPage;
