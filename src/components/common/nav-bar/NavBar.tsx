import Image from "next/image";
import Link from "next/link";
import { headers } from "next/headers";
import { ToastContainer } from "react-toastify";

import Dynamic from "./dynamic/Dynamic";

import styles from "./NavBar.module.css";

const NavBar = async () => {
  const h = await headers();
  const forwarded = h.get("x-forwarded-for") || h.get("x-real-ip") || "";
  const clientIp = forwarded.split(",")[0].trim();

  return (
    <>
      <section className={styles.navBar}>
        <Link href="/" target="_self" className={styles.navBar_logo}>
          <Image src="/logos/server-logo.webp" alt="JartonMC" fill priority />
        </Link>
        <Dynamic clientIp={clientIp} />
        <div className={styles.navBar_emptyDiv} />
      </section>
      <div className={styles.emptyMargin} />
      <ToastContainer style={{ marginTop: "var(--headerHeight)" }} />
    </>
  );
};

export default NavBar;
