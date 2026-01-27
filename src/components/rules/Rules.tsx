import { useMemo, useState } from "react";
import rules from "./rules.json";
import styles from "./Rules.module.css";

type RuleItem = {
  label: string;
  details?: string[];
  link?: { text: string; url: string };
};

type RuleSection = {
  title: string;
  intro?: string;
  items: RuleItem[];
};

const Rules = () => {
  const getSectionIcon = (title: string) => {
    const t = title.toLowerCase();

    if (t.includes("chat")) return "🗣️";
    if (t.includes("general minecraft")) return "🎮";
    if (t.includes("unfair")) return "🚫";
    if (t.includes("farming")) return "🧑🏻‍🌾";
    if (t.includes("trading")) return "🤝";
    if (t.includes("notice") || t.includes("warning")) return "⚠️";
    return "📋";
  };

  const sections = rules as RuleSection[];

  const defaultOpen = useMemo(() => {
    // Open Chat Guidelines by default if present, otherwise first section
    const idx = sections.findIndex((s) => s.title.toLowerCase().includes("chat"));
    return idx >= 0 ? idx : 0;
  }, [sections]);

  const [openIndex, setOpenIndex] = useState<number>(defaultOpen);

  return (
    <div className={styles.rules}>
      <div className={styles.card}>
        <header className={styles.header}>
          <h1 className={styles.title}>
            JartonMC <span className={styles.highlight}>Server Rules</span>
          </h1>
          <p className={styles.subtitle}>
            Welcome to JartonMC! To ensure a positive and respectful environment for everyone,
            please read and adhere to the following rules.
          </p>
        </header>

        {/* Accordion Sections */}
        <div className={styles.sections}>
          {sections.map((section, sectionIndex) => {
            const isOpen = openIndex === sectionIndex;

            return (
              <section key={sectionIndex} className={styles.section}>
                <button
                  type="button"
                  className={styles.sectionToggle}
                  onClick={() => setOpenIndex(isOpen ? -1 : sectionIndex)}
                  aria-expanded={isOpen}
                >
                  <span className={styles.sectionLeft}>
                    <span className={styles.sectionIcon}>{getSectionIcon(section.title)}</span>
                    <span className={styles.sectionTitleWrap}>
                      <span className={styles.sectionTitle}>{section.title}</span>
                      <span className={styles.sectionMeta}>
                        {section.items.length} rule{section.items.length === 1 ? "" : "s"}
                      </span>
                    </span>
                  </span>

                  <span className={styles.sectionChevron}>{isOpen ? "▾" : "▸"}</span>
                </button>

                {isOpen && (
                  <div className={styles.sectionBody}>
                    {section.intro && <p className={styles.sectionIntro}>{section.intro}</p>}

                    <div className={styles.itemsGrid}>
                      {section.items.map((item, itemIndex) => (
                        <div key={itemIndex} className={styles.ruleCard}>
                          <div className={styles.ruleCardHeader}>
                            <span className={styles.ruleBadge}>{itemIndex + 1}</span>
                            <span className={styles.ruleHeading}>{item.label}</span>
                          </div>

                          {item.details && item.details.length > 0 && (
                            <ul className={styles.ruleDetails}>
                              {item.details.map((d, i) => (
                                <li key={i}>{d}</li>
                              ))}
                            </ul>
                          )}

                          {item.link?.url && (
                            <a
                              className={styles.ruleLink}
                              href={item.link.url}
                              target="_blank"
                              rel="noreferrer"
                            >
                              {item.link.text || "View Link"}
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </section>
            );
          })}
        </div>

        <div className={styles.footer}>
          <div className={styles.footerContent}>
            <h3>Questions or Issues?</h3>
            <p>Don&apos;t understand a rule? Need to report someone? Our staff team is here to help!</p>
            <div className={styles.contactInfo}>
              <span>🎫 Create a ticket with <code>/ticket</code></span>
              <span>💬 Ask in our Discord server</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rules;


