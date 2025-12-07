import { AppProvider } from "../context/AppContext";
import "../styles/globals.css";
import LayoutClient from "./LayoutClient";

export const metadata = {
  title: "A Plus Mart BD",
  description: "A Plus Mart BD - Your Trusted Online Shop",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AppProvider>
          <LayoutClient>{children}</LayoutClient>
        </AppProvider>
      </body>
    </html>
  );
}
