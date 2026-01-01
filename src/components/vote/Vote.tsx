"use client";

import { useEffect, useState } from "react";
import voteData from "./vote.json";
import styles from "./Vote.module.css";

const Vote = () => {
  const [copyText, setCopyText] = useState("Copy");

  const handleCopyIP = async () => {
    try {
      await navigator.clipboard.writeText(voteData.serverIp);
      setCopyText("Copied!");
      setTimeout(() => setCopyText("Copy"), 1100);
    } catch {
      setCopyText("Ctrl+C");
      setTimeout(() => setCopyText("Copy"), 1300);
    }
  };

  const ChevronIcon = () => (
    <svg className={styles.chevron} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M9 6l6 6-6 6"
        stroke="var(--color2)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const LeaderboardFallback = () => {
    const [rows, setRows] = useState<Array<{ rank: number; player: string; votes: number }>>([]);

    useEffect(() => {
      let isMounted = true;

      (async () => {
        try {
          const res = await fetch(`/api/votes/top?period=monthly&limit=10&nocache=${Date.now()}`, {
            cache: "no-store",
          });
          if (!res.ok) return;

          const data = await res.json();
          if (!isMounted) return;

          const src = Array.isArray(data?.top) ? data.top : [];

          if (src.length > 0) {
            const next = src.map((item: { username: string; votes: number }, i: number) => ({
              rank: i + 1,
              player: item.username,
              votes: item.votes,
            }));
            setRows(next);
          }
        } catch {}
      })();

      return () => {
        isMounted = false;
      };
    }, []);

    if (rows.length === 0) {
      return (
        <tr>
          <td colSpan={3}>
            <span className={styles.muted}>No votes recorded yet this month.</span>
          </td>
        </tr>
      );
    }

    return rows.map((r) => (
      <tr key={r.player}>
        <td>#{r.rank}</td>
        <td>{r.player}</td>
        <td>{r.votes}</td>
      </tr>
    ));
  };

  return (
    <div className={styles.vote}>
      <div className={styles.card}>
        <header className={styles.header}>
          <h1 className={styles.title}>
            {voteData.title.split("JartonMC")[0]}
            <span className={styles.highlight}>JartonMC</span>
          </h1>
          <p className={styles.subtitle}>{voteData.subtitle}</p>
          <div className={styles.ipContainer}>
            <span>IP:</span>
            <strong>{voteData.serverIp}</strong>
            <button className={styles.copyButton} onClick={handleCopyIP}>
              {copyText}
            </button>
          </div>
        </header>

        <div className={styles.voteLinks} aria-label="Vote links">
          {voteData.voteLinks.map((link, index) => (
            <a
              key={index}
              className={styles.voteLink}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className={styles.linkLeft}>
                <span className={styles.dot} aria-hidden="true"></span>
                <strong>{link.name}</strong>
              </span>
              <ChevronIcon />
            </a>
          ))}
        </div>

        <div className={styles.sections}>
          <div className={styles.panel}>
            <h3>How to vote</h3>
            <ol className={styles.instructionsList}>
              <li>
                Click each site above and enter your <strong>exact username</strong>
              </li>
              <li>Complete any captchas and hit submit</li>
              <li>Join the server to collect your rewards!</li>
            </ol>
            <p className={styles.muted}>
              Sites reset daily at <strong>midnight UTC</strong>. Bedrock players can vote too!
            </p>
          </div>

          <div className={styles.panel}>
            <h3>What you get</h3>
            <ul className={styles.rewardsList}>
              {voteData.rewards.daily.map((reward, index) => (
                <li key={index}>{reward}</li>
              ))}
            </ul>
            <ul className={styles.rewardsList}>
              {voteData.rewards.streaks.map((streak, index) => (
                <li key={index}>{streak}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.sections}>
          <div className={styles.panel}>
            <h3>Top voters (monthly)</h3>
            <table className={styles.votersTable}>
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Player</th>
                  <th>Votes</th>
                </tr>
              </thead>
              <tbody>
                <LeaderboardFallback />
              </tbody>
            </table>
            <p className={styles.muted}>Updated monthly - keep voting to climb the ranks!</p>
          </div>

          <div className={styles.panel}>
            <h3>Common issues</h3>
            {voteData.faq.map((faqItem, index) => (
              <details key={index} open={index === 0}>
                <summary>
                  <strong>{faqItem.question}</strong>
                </summary>
                <p className={styles.muted}>{faqItem.answer}</p>
              </details>
            ))}
          </div>
        </div>

        <div className={styles.discord}>
          <span>{voteData.discord.text}</span>
          <a className={styles.joinDiscord} href={voteData.discord.url} target="_blank" rel="noopener noreferrer">
            Join Discord
          </a>
        </div>

        <footer className={styles.footer}>© 2026 JartonMC</footer>
      </div>
    </div>
  );
};

export default Vote;
