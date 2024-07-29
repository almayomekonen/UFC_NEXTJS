import { notFound } from "next/navigation";
import { getFighterBySlug } from "@/lib/fightersService";
import classes from "./page.module.css";

const ImagePage = async ({ params }) => {
  const newsItemSlug = params.slug;

  const imageItem = await getFighterBySlug(newsItemSlug);

  if (!imageItem) {
    notFound();
  }

  return (
    <div className={classes.image}>
      <img
        src={`${process.env.BUCKET_STANDING_FIGHTERS_URL}/${imageItem.images.fighter}`}
        alt={imageItem.title}
      />
    </div>
  );
};

export default ImagePage;
