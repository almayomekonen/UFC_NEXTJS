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

const FilterHeader = async ({ year, month }) => {
  const availableYears = await getAvailableFighterYears();
  let links = availableYears;

  if (
    (year && !availableYears.includes(+year)) ||
    (month && !getFightersForMonth(+month))
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
  const filter = params.filter;

  const selectedYear = filter ? filter[0] : undefined;

  const selectedMonth = filter ? filter[1] : undefined;

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

export async function generateStaticParams() {
  const availableYears = await getAvailableFighterYears();
  const staticParams = [];

  for (const year of availableYears) {
    staticParams.push({ filter: [year.toString()] }); // Year only
    const months = await getFightersForYear(year); // Await here
    for (const month of months) {
      staticParams.push({ filter: [year.toString(), month.toString()] }); // Year and month
    }
  }

  console.log("Generated static params:", staticParams); // Debugging output

  return staticParams;
}

export default FilteredNewsPage;
