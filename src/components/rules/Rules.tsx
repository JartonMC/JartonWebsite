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

        <div className={styles.rulesGrid}>
          {sections.map((section, sectionIndex) => (
            <div key={sectionIndex} className={styles.ruleSection}>
              <div className={styles.sectionHeader}>
                <span className={styles.sectionIcon}>{getSectionIcon(section.title)}</span>
                <h3 className={styles.sectionTitle}>{section.title}</h3>
              </div>

              {section.intro && <p className={styles.sectionIntro}>{section.intro}</p>}

              <div className={styles.rulesList}>
                {section.items.map((item, itemIndex) => (
                  <div key={itemIndex} className={styles.ruleItem}>
                    <span className={styles.ruleNumber}>{itemIndex + 1}</span>

                    <div className={styles.ruleBody}>
                      <div className={styles.ruleHeading}>{item.label}</div>

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
                  </div>
                ))}
              </div>
            </div>
          ))}
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

