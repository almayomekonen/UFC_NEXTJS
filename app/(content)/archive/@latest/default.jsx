import Athletes from "@/components/Athletes/Athletes";
import { getLatestNews } from "@/lib/news";

const LatestNewsPage = async () => {
  const latestNews = await getLatestNews();

  return (
    <>
      <h1>LATEST ATHLETES RESULTS</h1>
      <Athletes athletes={latestNews} />
    </>
  );
};

export default LatestNewsPage;
