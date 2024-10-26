import ModalBackDrop from "@/components/ModalBackDrop/ModalBackDrop";
import { getFighterBySlug, getAllFighters } from "@/lib/fightersService";
import { notFound } from "next/navigation";

const InterceptedImagePage = async ({ params, searchParams }) => {
  const { slug } = params;
  const { fighter } = searchParams;

  const newsItem = await getFighterBySlug(slug);

  if (!newsItem) {
    notFound();
  }

  let imageUrl = "";
  if (fighter === "profile") {
    imageUrl = `https://fighters-standing.s3.eu-north-1.amazonaws.com/${newsItem.images.fighter}`;
  } else if (fighter === "action") {
    imageUrl = `https://fighters-gifs.s3.eu-north-1.amazonaws.com/${newsItem.images.action}`;
  } else {
    notFound();
  }

  if (!imageUrl) {
    notFound();
  }

  return (
    <>
      <ModalBackDrop />
      <dialog className="modal" open>
        <div className="x-elem">
          <img src={imageUrl} alt={newsItem.title} />
        </div>
      </dialog>
    </>
  );
};

export default InterceptedImagePage;
