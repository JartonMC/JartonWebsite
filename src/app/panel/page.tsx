import Link from "next/link";
import styles from "./panel.module.css";

export const metadata = {
  title: "Admin Links | JartonMC",
  description: "Choose an admin destination: Coolify or Panel",
};

const PanelChooser = () => {
  return (
    <section className={styles.wrapper}>
      <div className={styles.card}>
        <h1 className={styles.title}>Admin Destinations</h1>
        <p className={styles.subtitle}>Choose where you want to go</p>

        <div className={styles.grid}>
          <Link
            href="https://web.jarton.me/"
            target="_blank"
            className={`${styles.tile} ${styles.coolify}`}
          >
            <span className={styles.tileTitle}>Coolify</span>
            <span className={styles.tileDesc}>Deployments · Logs · Services</span>
          </Link>

          <Link
            href="https://panel.jarton.me/"
            target="_blank"
            className={`${styles.tile} ${styles.panel}`}
          >
            <span className={styles.tileTitle}>Panel</span>
            <span className={styles.tileDesc}>Server control · Utilities</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PanelChooser;


