import { notFound } from "next/navigation";
import Link from "next/link";
import { getFighterBySlug, getAllFighters } from "@/lib/fightersService";

import classes from "./page.module.css";

export const generateStaticParams = async () => {
  const fighters = await getAllFighters();

  return fighters.map((fighter) => ({
    slug: fighter.slug,
  }));
};

const NewsDetailPage = async ({ params }) => {
  const newsSlug = params.slug;
  const newsItem = await getFighterBySlug(newsSlug);

  if (!newsItem) {
    notFound();
  }

  return (
    <>
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
              <p>FIRST ROUND FINISHES</p>
            </div>

            <div className={classes.finishes}>
              <h2>{newsItem.knockouts}</h2>
              <hr />
              <p>WINS BY TKO</p>
            </div>
          </div>
        </div>
      </article>

      <section className={classes.fightHistory}>
        <h2 className={classes.h2}>ATHLETE RECORD</h2>
        {newsItem.fightesDetails.fightHistory &&
          newsItem.fightesDetails.fightHistory.map((fight, index) => (
            <div key={index} className={classes.athleteResultsInfo}>
              <div className={classes.athleteResultsContent}>
                <img
                  className={classes.athleteResultsImage}
                  src={`https://fightes-details-images.s3.eu-north-1.amazonaws.com/${fight.image}`}
                  alt="fighter"
                />
                <div className={classes.athleteResultsDetails}>
                  <h3 className={classes.athleteResultsHeadline}>
                    {fight.opponent}
                  </h3>
                  <div className={classes.athleteResultsDate}>{fight.date}</div>

                  <div className={classes.athleteResultsResults}>
                    <div className={classes.athleteResultsResult}>
                      <div className={classes.athleteResultsResultLabel}>
                        Round
                      </div>
                      <div className={classes.athleteResultsResultText}>
                        {fight.round || "N/A"}
                      </div>
                    </div>

                    <div className={classes.athleteResultsResult}>
                      <div className={classes.athleteResultsResultLabel}>
                        Time
                      </div>
                      <div className={classes.athleteResultsResultText}>
                        {fight.time || "N/A"}
                      </div>
                    </div>

                    <div className={classes.athleteResultsResult}>
                      <div className={classes.athleteResultsResultLabel}>
                        Method
                      </div>
                      <div className={classes.athleteResultsResultText}>
                        {fight.method || "N/A"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </section>
    </>
  );
};

export default NewsDetailPage;
