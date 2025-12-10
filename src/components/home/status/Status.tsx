"use client";

import Link from "next/link";
import { FaDiscord } from "react-icons/fa";
import { TbBrandMinecraft } from "react-icons/tb";

import notificationsStore from "@/store/notificationStore";

import { data } from "../data";

import styles from "../Home.module.css";

type StatusProps = {
  playersCount: number;
  onlineMembersCount: number;
};

const Status = ({ playersCount, onlineMembersCount }: StatusProps) => {
  const notify = notificationsStore((state) => state.notify);

  return (
    <div className={styles.home_status}>
      <div
        onClick={() => {
          navigator.clipboard.writeText(data.status.ip);

          notify({
            type: "success",
            message: "Server IP copied to clipboard",
          });
        }}
        className={styles.home_status_card}
      >
        <div className={styles.home_status_card_left}>
          <span className={styles.home_status_card_left_title}>
            {playersCount} Online
          </span>
          <span className={styles.home_status_card_left_content}>
            {data.status.ip}
          </span>
        </div>
        <div className={styles.home_status_card_right}>
          <TbBrandMinecraft />
          <hr />
        </div>
      </div>
      <Link
        href={`https://discord.com/invite/${data.status.discord.invite}`}
        target="_blank"
        className={styles.home_status_card}
      >
        <div className={styles.home_status_card_left}>
          <span className={styles.home_status_card_left_title}>
            {onlineMembersCount} Online
          </span>
          <span className={styles.home_status_card_left_content}>
            {`discord.gg/${data.status.discord.invite}`}
          </span>
        </div>
        <div className={styles.home_status_card_right}>
          <FaDiscord />
          <hr />
        </div>
      </Link>
    </div>
  );
};

export default Status;
