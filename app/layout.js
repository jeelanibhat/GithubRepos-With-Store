import localFont from "next/font/local";
import "./globals.css";
import Header from "./components/Header";
import { CartProvider } from "./context/cartContext"

export const metadata = {
  title: "Github Repos: Nextjs App",
  description: "Nextjs Application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Header />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
