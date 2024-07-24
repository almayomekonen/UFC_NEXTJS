import Athletes from "@/components/Athletes/Athletes";

import classes from "./page.module.css";
import {
  getAvailableNewsMonths,
  getAvailableNewsYears,
  getNewsForYear,
  getNewsForYearAndMonth,
} from "@/lib/news";
import ErrorBoundary from "@/components/ErrorBoundary/ErrorBoundary";

import Link from "next/link";
import { Suspense } from "react";

const FilterHeader = async ({ year, month }) => {
  const availableYears = await getAvailableNewsYears();
  let links = availableYears;

  if (
    (year && !availableYears.includes(year)) ||
    (month && !getAvailableNewsMonths(year).includes(month))
  ) {
    throw new Error("Invalid path.");
  }

  if (year && !month) {
    links = getAvailableNewsMonths(year);
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
    news = await getNewsForYear(year);
  } else if (year && month) {
    news = await getNewsForYearAndMonth(year, month);
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

export default FilteredNewsPage;
