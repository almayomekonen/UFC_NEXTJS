import ModalBackDrop from "@/components/ModalBackDrop/ModalBackDrop";
import Button from "@/components/Button/Button";
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
        <div className="x-elem">
          <img src={`/images/news/${imageItem.image}`} alt={imageItem.title} />
        </div>
      </dialog>
    </>
  );
};

export default IntreceptedImagePage;
