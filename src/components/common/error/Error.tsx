import Link from "next/link";

import errors from "./errors.json";

import styles from "./Error.module.css";

type ErrorProps = {
  code: 404 | 500;
};

const Error = ({ code }: ErrorProps) => {
  return (
    <section className={styles.error}>
      <span className={styles.error_code}>{code}</span>
      <span className={styles.error_title}>{errors[code].title}</span>
      <span className={styles.error_text}>{errors[code].text}</span>
      <Link href="/" target="_self" className={styles.error_homeButton}>
        Home
      </Link>
    </section>
  );
};

export default Error;
