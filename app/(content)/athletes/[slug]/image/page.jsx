import { getNewsItem } from "@/lib/news";
import { notFound } from "next/navigation";

const ImagePage = async ({ params }) => {
  const newsItemSlug = params.slug;
  const imageItem = await getNewsItem(newsItemSlug);

  if (!imageItem) {
    notFound();
  }

  return (
    <div>
      <img src={`/images/news/${imageItem.image}`} alt={imageItem.title} />
    </div>
  );
};

export default ImagePage;
