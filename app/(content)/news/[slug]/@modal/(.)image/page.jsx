import ModalBackDrop from "@/components/ModalBackDrop/ModalBackDrop";
import { getNewsItem } from "@/lib/news";
import { notFound } from "next/navigation";

const IntreceptedImagePage = async ({ params }) => {
  const newsItemSlug = params.slug;
  const imageItem = await getNewsItem(newsItemSlug);

  if (!imageItem) {
    notFound();
  }

  return (
    <>
      <ModalBackDrop />
      <dialog className="modal" open>
        <button className="back-btn">back</button>
        <img src={`/images/news/${imageItem.image}`} alt={imageItem.title} />
      </dialog>
    </>
  );
};

export default IntreceptedImagePage;
