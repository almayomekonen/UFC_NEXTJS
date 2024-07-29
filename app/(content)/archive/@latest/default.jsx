import Athletes from "@/components/Athletes/Athletes";
import { getLatestFighters } from "@/lib/fightersService";

const LatestNewsPage = async () => {
  const latestNews = await getLatestFighters();

  return (
    <>
      <h1>LATEST ATHLETES RESULTS</h1>
      <Athletes athletes={latestNews} />
    </>
  );
};

export default LatestNewsPage;
