import ModalBackDrop from "@/components/ModalBackDrop/ModalBackDrop";
import { getNewsItem } from "@/lib/news";
import { notFound } from "next/navigation";
import imageMap from "@/data/imageMap";

const IntreceptedImagePage = async ({ params, searchParams }) => {
  const { slug } = params;
  const { fighter } = searchParams;
  const newsItem = await getNewsItem(slug);

  if (!newsItem) {
    notFound();
  }

  const imageUrl = imageMap[newsItem.slug]?.[fighter];

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

export default IntreceptedImagePage;
