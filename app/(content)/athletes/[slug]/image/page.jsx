import { notFound } from "next/navigation";
import { getFighterBySlug, getAllFighters } from "@/lib/fightersService";
import classes from "./page.module.css";

const ImagePage = async ({ params }) => {
  const { slug } = params;
  const imageItem = await getFighterBySlug(slug);

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

export async function generateStaticParams() {
  const fighters = await getAllFighters();
  return fighters.map((fighter) => ({
    slug: fighter.slug,
  }));
}

export default ImagePage;
