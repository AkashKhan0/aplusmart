import "../styles/globals.css";

export const metadata = {
  title: "A Plus Mart BD",
  description:
    "A Plus Mart BD - Your Trusted Online Shope",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={``}>{children}</body>
    </html>
  );
}
