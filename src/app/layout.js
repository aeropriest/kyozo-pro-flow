import { Inter } from "next/font/google";
import Link from "next/link";
import "../styles/globals.scss";
import styles from "./layout.module.scss";
import Footer from "./components/Footer";
import FixedFooter from "./components/FixedFooter";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});


export const metadata = {
  title: "Kyozo Flow Pro",
  description: "A Next.js project with Sass styling based on Kyozo design",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        {/* <nav className={styles.nav}>
          <div className={styles.logo}>Kyozo Flow Pro</div>
          <ul className={styles.navLinks}>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/showcase">Design Showcase</Link>
            </li>
          </ul>
        </nav> */}
        <main className={styles.main}>
          {children}
        </main>
        {/* <Footer /> */}
        <FixedFooter />
      </body>
    </html>
  );
}
