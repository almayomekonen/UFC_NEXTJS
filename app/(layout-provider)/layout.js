import "../globals.css";

export const metadata = {
  title: " News App",
  description: "Generated by Almayo Mekonen",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div id="page">{children}</div>
      </body>
    </html>
  );
}
