import { notFound } from "next/navigation";
import Link from "next/link";
import { getFighterBySlug } from "@/lib/fightersService";

import classes from "./page.module.css";

const NewsDetailPage = async ({ params }) => {
  const newsSlug = params.slug;
  const newsItem = await getFighterBySlug(newsSlug);

  if (!newsItem) {
    notFound();
  }

  return (
    <div className={classes.newsContainer}>
      <article className={classes.newsArticle}>
        <header>
          <Link href={`/athletes/${newsItem.slug}/image?fighter=profile`}>
            <img
              src={`${process.env.BUCKET_STANDING_FIGHTERS_URL}/${newsItem.images.fighter}`}
              alt={newsItem.title}
            />
          </Link>

          <div className={classes.actionImage}>
            <p>{newsItem.event}</p>
            <p>{newsItem.fightDate}</p>
            <Link href={`/athletes/${newsItem.slug}/image?fighter=action`}>
              <img
                src={`${process.env.BUCKET_GIFS_FIGHTERS_URL}/${newsItem.images.action}`}
                alt={newsItem.title}
              />
            </Link>
            <p>{newsItem.knockoutDetail}</p>
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
