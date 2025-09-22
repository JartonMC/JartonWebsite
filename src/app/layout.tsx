import NavBar from "@/components/common/nav-bar/NavBar";
import Background from "./Background";
import Footer from "@/components/common/footer/Footer";

import "./globals.css";

import styles from "./layout.module.css";

export const metadata = {
  title: "JartonMC",
  description: "JartonMC",
  icons: {
    icon: "/logos/server-logo.webp",
    shortcut: "/logos/server-logo.webp",
    apple: "/logos/server-logo.webp",
    other: {
      rel: "apple-touch-icon-precomposed",
      url: "/favicon.ico",
    },
  },
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body>
        <NavBar />
        <div className={styles.contentContainer}>
          <Background />
          <div className={styles.contentContainer_content}>{children}</div>
        </div>
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;
