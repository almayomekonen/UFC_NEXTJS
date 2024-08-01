// app/archive/[[...filter]]/page.js

import Athletes from "@/components/Athletes/Athletes";
import classes from "./page.module.css";
import {
  getAvailableFighterYears,
  getFightersForYear,
  getFightersForMonth,
  getFightersForYearAndMonth,
} from "@/lib/fightersService";
import ErrorBoundary from "@/components/ErrorBoundary/ErrorBoundary";
import Link from "next/link";
import { Suspense } from "react";

export const generateStaticParams = async () => {
  const years = await getAvailableFighterYears();
  const params = [];

  for (const year of years) {
    const months = await getFightersForMonth(year);

    params.push({ filter: [year.toString()] }); // For /archive/[year]

    for (const month of months) {
      params.push({ filter: [year.toString(), month] }); // For /archive/[year]/[month]
    }
  }

  return params;
};

const FilterHeader = async ({ year, month }) => {
  const availableYears = await getAvailableFighterYears();
  let links = availableYears;

  if (
    (year && !availableYears.includes(+year)) ||
    (month && !(await getFightersForMonth(+year)).includes(month))
  ) {
    throw new Error("Invalid path.");
  }

  if (year && !month) {
    links = await getFightersForMonth(year);
  }

  if (year && month) {
    links = [];
  }

  return (
    <header id={classes.archiveHeader}>
      <nav>
        <ul>
          {links.map((link) => {
            const href = year ? `/archive/${year}/${link}` : `/archive/${link}`;
            return (
              <li key={link}>
                <Link href={href}>{link}</Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
};

const FilteredNews = async ({ year, month }) => {
  let news;

  if (year && !month) {
    news = await getFightersForYear(year);
  } else if (year && month) {
    news = await getFightersForYearAndMonth(year, month);
  }

  let newsContent = <p>No news found for the selected period.</p>;

  if (news && news.length > 0) {
    newsContent = <Athletes athletes={news} />;
  }

  return newsContent;
};

const FilteredNewsPage = async ({ params }) => {
  const filter = params.filter || [];
  const selectedYear = filter[0];
  const selectedMonth = filter[1];

  return (
    <>
      <ErrorBoundary>
        <Suspense fallback={<p>Loading filter ...</p>}>
          <FilterHeader year={selectedYear} month={selectedMonth} />
        </Suspense>

        <Suspense fallback={<p>Loading news ...</p>}>
          <FilteredNews year={selectedYear} month={selectedMonth} />
        </Suspense>
      </ErrorBoundary>
    </>
  );
};

export default FilteredNewsPage;
