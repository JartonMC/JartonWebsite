import Image from "next/image";

import Status from "./status/Status";
import Cards from "./cards/Cards";

import styles from "./Home.module.css";

type HomeProps = {
  playersCount: number;
  onlineMembersCount: number;
};

const Home = ({ playersCount, onlineMembersCount }: HomeProps) => {
  return (
    <div className={styles.home}>
      <div className={styles.home_websiteLogo}>
        <Image src="/logos/website-logo.webp" alt="" fill priority />
      </div>
      <Status
        playersCount={playersCount}
        onlineMembersCount={onlineMembersCount}
      />
      <Cards />
    </div>
  );
};

export default Home;
