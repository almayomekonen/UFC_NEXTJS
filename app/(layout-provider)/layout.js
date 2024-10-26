import "../globals.css";

export const metadata = {
  title: "UFC NEWS UPDATES",
  description: "Stay updated with the latest UFC news and fighter details!",

  openGraph: {
    title: "UFC NEWS UPDATES",
    description: "Stay updated with the latest UFC news and fighter details!",
    url: "https://ufc-nextjs.vercel.app/",
    siteName: "UFC News",
    images: [
      {
        url: "https://ufc-nextjs.vercel.app/images/ufc.png",
        width: 800,
        height: 600,
        alt: "UFC News Image",
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content={metadata.openGraph.title} />
        <meta
          property="og:description"
          content={metadata.openGraph.description}
        />
        <meta property="og:url" content={metadata.openGraph.url} />
        <meta property="og:image" content={metadata.openGraph.images[0].url} />
        <meta
          property="og:image:width"
          content={metadata.openGraph.images[0].width}
        />
        <meta
          property="og:image:height"
          content={metadata.openGraph.images[0].height}
        />
      </head>
      <body>
        <div id="page">{children}</div>
      </body>
    </html>
  );
}
