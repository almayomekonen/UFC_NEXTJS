import News from "@/components/News/News";
import { getLatestNews } from "@/lib/news";

const LatestNewsPage = async () => {
  const latestNews = await getLatestNews();

  return (
    <>
      <h1>Latest News Page</h1>
      <News news={latestNews} />
    </>
  );
};

export default LatestNewsPage;
