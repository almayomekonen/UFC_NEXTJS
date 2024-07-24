import Link from "next/link";
import classes from "../Athletes/Athletes.module.css";

const Athletes = ({ athletes }) => {
  return (
    <ul className={classes.athletesList}>
      {athletes.map((athletes) => (
        <li key={athletes.id}>
          <Link href={`/athletes/${athletes.slug}`}>
            <img src={`/images/news/${athletes.image}`} alt={athletes.title} />
            <h3>{athletes.nickname}</h3>
            <span>{athletes.title}</span>
            <div className={classes.mrbAthletes}>
              <p>{athletes.weight}</p>
              <p>{athletes.record} | [W - L - D]</p>
              <p>{athletes.born}</p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Athletes;
