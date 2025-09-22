import styles from "./Loading.module.css";

const Loading = () => {
  return (
    <section className={styles.loading}>
      <span className={styles.loading_title}>Loading...</span>
      <span className={styles.loading_text}>
        Looks like many people are trying to get into the hive. Fear not there
        is space for everyone!
      </span>
    </section>
  );
};

export default Loading;
