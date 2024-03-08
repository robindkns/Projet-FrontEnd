'use client'

import { Inter } from "next/font/google";
import "./globals.sass";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Providers } from "./redux/Providers";

const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "GameHaven",
//   description: "The best video game store in the world",
// };

export default function RootLayout({ children }) {

  return (
    <Providers>
        <html lang="fr">
          <head>
            <title>GameHaven</title>
          </head>
          <body className={inter.className}>
            <Navbar />
            {children}
            <Footer />
          </body>
        </html>
    </Providers>
  );
}
