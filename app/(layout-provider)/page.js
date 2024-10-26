import logo from "../icon.png";
import Link from "next/link";

export default function HomePage() {
  return (
    <div id="home">
      <img src={logo.src} alt="A newspaper" />
      <h1>Ultimate Fight Night: Your Source for UFC Updates</h1>
      <p>NextFight: The Ultimate Destination for UFC Fans</p>

      <p>
        NextFight is here to bring you the latest and most exciting updates from
        the world of UFC. Our mission is to deliver news, analysis, and
        highlights about UFC fighters in a concise and unbiased manner.
      </p>

      <p>
        We aim to keep you on the edge of your seat with timely updates and
        in-depth coverage of your favorite fighters. From breaking news to
        exclusive interviews and fight breakdowns, we ensure that you get all
        the essential information without unnecessary fluff.
      </p>

      <p>
        <Link href="/athletes">Catch the Latest UFC Updates Now</Link>
      </p>
    </div>
  );
}
