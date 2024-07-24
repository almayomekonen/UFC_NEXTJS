import sql from "better-sqlite3";

import { DUMMY_FIGHTERS } from "../data/data";

const db = sql("data.db");

function initDb() {
  db.prepare(
    `CREATE TABLE IF NOT EXISTS news 
    (id INTEGER PRIMARY KEY, 
    slug TEXT UNIQUE, 
    title TEXT, 
    content TEXT, 
    date TEXT, 
    image TEXT, 
    nickname TEXT, 
    weight TEXT, 
    born TEXT, 
    record TEXT, 
    knockouts TEXT,
    firstRoundFinishes TEXT)`
  ).run();

  const { count } = db.prepare("SELECT COUNT(*) as count FROM news").get();

  if (count === 0) {
    const insert = db.prepare(
      "INSERT INTO news (slug, title, content, date, image, nickname, weight, born, record, knockouts, firstRoundFinishes) VALUES (?, ?, ?, ?, ? ,? ,? ,? ,? ,? , ?)"
    );

    DUMMY_FIGHTERS.forEach((fighters) => {
      const { losses, wins, draws } = fighters.record;

      insert.run(
        fighters.slug,
        fighters.title,
        fighters.content,
        fighters.date,
        fighters.image,
        fighters.nickname,
        fighters.weight,
        fighters.born,
        `${wins} - ${losses} - ${draws}`,
        fighters.knockouts,
        fighters.firstRoundFinishes
      );
    });
  }
}

initDb();

export async function getAllNews() {
  const news = db.prepare("SELECT * FROM news").all();
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return news;
}

export async function getNewsItem(slug) {
  const newsItem = db.prepare("SELECT * FROM news WHERE slug = ?").get(slug);
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return newsItem;
}

export async function getLatestNews() {
  const latestNews = db
    .prepare("SELECT * FROM news ORDER BY date DESC LIMIT 3")
    .all();
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return latestNews;
}

export async function getAvailableNewsYears() {
  const years = db
    .prepare("SELECT DISTINCT strftime('%Y', date) as year FROM news")
    .all()
    .map((year) => year.year);
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return years;
}

export function getAvailableNewsMonths(year) {
  return db
    .prepare(
      "SELECT DISTINCT strftime('%m', date) as month FROM news WHERE strftime('%Y', date) = ?"
    )
    .all(year)
    .map((month) => month.month);
}

export async function getNewsForYear(year) {
  const news = db
    .prepare(
      "SELECT * FROM news WHERE strftime('%Y', date) = ? ORDER BY date DESC"
    )
    .all(year);
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return news;
}

export async function getNewsForYearAndMonth(year, month) {
  const news = db
    .prepare(
      "SELECT * FROM news WHERE strftime('%Y', date) = ? AND strftime('%m', date) = ? ORDER BY date DESC"
    )
    .all(year, month);
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return news;
}
