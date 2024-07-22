import News from "@/components/News/News";
import { getAllNews } from "@/lib/news";

const NewsPage = async () => {
  const news = await getAllNews();
  return (
    <>
      <h1>News Page</h1>
      <News news={news} />
    </>
  );
};

export default NewsPage;
