import Athletes from "@/components/Athletes/Athletes";
import { getAllNews } from "@/lib/news";

const AthletesPage = async () => {
  const athletes = await getAllNews();
  return (
    <>
      <h1>ATHLETES</h1>
      <Athletes athletes={athletes} />
    </>
  );
};

export default AthletesPage;
