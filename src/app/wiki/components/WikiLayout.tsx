"use client";

import Link from "next/link";
import { ReactNode } from "react";
import styles from "./WikiLayout.module.css";

interface WikiLayoutProps {
  children: ReactNode;
  title: string;
  nextPage?: string;
  nextText?: string;
  prevPage?: string;
  prevText?: string;
}

const WikiLayout = ({ children, title, nextPage, nextText, prevPage, prevText }: WikiLayoutProps) => {
  return (
    <div className={styles.wiki}>
      <div className={styles.card}>
        <header className={styles.header}>
          <Link href="/wiki" className={styles.backLink}>
            ← Back to Wiki
          </Link>
          <h1 className={styles.title}>{title}</h1>
        </header>
        
        <div className={styles.content}>
          {children}
        </div>

        {(nextPage || prevPage) && (
          <div className={styles.navigation}>
            {prevPage && (
              <Link href={prevPage} className={styles.navButton}>
                ← {prevText}
              </Link>
            )}
            {nextPage && (
              <Link href={nextPage} className={styles.navButton}>
                {nextText} →
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default WikiLayout;
