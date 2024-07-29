// pages/fighters.js
import Athletes from "@/components/Athletes/Athletes";
import { getAllFighters } from "@/lib/fightersService";

const AthletesPage = async () => {
  const athletes = await getAllFighters();

  return (
    <>
      <h1>ATHLETES</h1>
      <Athletes athletes={athletes} />
    </>
  );
};

export default AthletesPage;
