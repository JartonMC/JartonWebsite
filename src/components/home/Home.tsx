"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import Status from "./status/Status";
import Cards from "./cards/Cards";

import styles from "./Home.module.css";
import { data } from "./data";

const Home = () => {
  const [playersCount, setPlayersCount] = useState(0);
  const [onlineMembersCount, setOnlineMembersCount] = useState(0);

  useEffect(() => {
    const fetchServerStatus = async () => {
      try {
        const res = await fetch(
          `https://mcstatsapi.dramaticscripts.com/status/minecraft/java?ip=${data.status.ip}`
        );
        if (res.ok) {
          const body = await res.json();
          setPlayersCount(body?.players?.online ?? 0);
        }
      } catch (error) {
        console.log(error);
      }
    };

    const fetchDiscordMembers = async () => {
      try {
        const res = await fetch(
          `https://discord.com/api/guilds/${data.status.discord.id}/widget.json`
        );
        if (res.ok) {
          const body = await res.json();
          setOnlineMembersCount(
            body.members.filter(
              (member: { status: string }) => member.status !== "offline"
            ).length
          );
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchServerStatus();
    fetchDiscordMembers();
  }, []);

  return (
    <div className={styles.home}>
      <div className={styles.home_websiteLogo}>
        <Image src="/logos/jarton.webp" alt="" fill priority />
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
