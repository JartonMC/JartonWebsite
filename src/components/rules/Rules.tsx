import rules from "./rules.json";
import styles from "./Rules.module.css";

const UNFAIR_MODS_URL =
  "https://docs.google.com/spreadsheets/d/1fmzU3741SVE8cL9-QN15WaK3oPoiaDrc3U0OaRq9Sno/edit?usp=sharing";

const Rules = () => {
  const getSectionIcon = (title: string) => {
    if (title.includes("Chat")) return "🗣️";
    if (title.includes("General")) return "🎮";
    if (title.includes("Unfair")) return "🚫";
    if (title.includes("Farming")) return "🧑🏻‍🌾";
    if (title.includes("Trading")) return "🤝";
    return "📋";
  };

  const isWideSection = (title: string) => {
    return (
      title.includes("Chat Guidelines") ||
      title.includes("General Minecraft Rules")
    );
  };

  const renderRuleText = (text: string) => {
    if (text.startsWith("Unfair Modification List")) {
      return (
        <>
          <span>Unfair Modification List ↪ </span>
          <a
            href={UNFAIR_MODS_URL}
            target="_blank"
            rel="noreferrer"
            className={styles.inlineLinkButton}
          >
            Click here
          </a>
        </>
      );
    }

    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(urlRegex);

    return (
      <>
        {parts.map((part, idx) => {
          if (part.match(urlRegex)) {
            return (
              <a
                key={idx}
                href={part}
                target="_blank"
                rel="noreferrer"
                className={styles.ruleLink}
              >
                {part}
              </a>
            );
          }
          return <span key={idx}>{part}</span>;
        })}
      </>
    );
  };

  return (
    <div className={styles.rules}>
      <div className={styles.card}>
        <header className={styles.header}>
          <h1 className={styles.title}>
            JartonMC <span className={styles.highlight}>Server Rules</span>
          </h1>

          <p className={styles.subtitle}>
            Welcome to JartonMC! These rules exist to keep the server safe, fair,
            and fun for everyone. Punishments vary by severity and context.
          </p>

          <div className={styles.notice}>
            <div className={styles.noticeIcon}>⚠️</div>
            <div className={styles.noticeText}>
              <strong>Important:</strong> This is not the full and final list of
              every rule. Staff reserve the right to judge each case
              individually and punish or forgive at their discretion.
            </div>
          </div>
        </header>

        <div className={styles.rulesGrid}>
          {rules.map((section, sectionIndex) => (
            <div
              key={sectionIndex}
              className={`${styles.ruleSection} ${
                isWideSection(section.title) ? styles.wideSection : ""
              }`}
            >
              <div className={styles.sectionHeader}>
                <span className={styles.sectionIcon}>
                  {getSectionIcon(section.title)}
                </span>
                <h3 className={styles.sectionTitle}>{section.title}</h3>
              </div>

              <div className={styles.rulesList}>
                {section.items.map((item, itemIndex) => (
                  <div key={itemIndex} className={styles.ruleItem}>
                    <span className={styles.ruleNumber}>{itemIndex + 1}</span>
                    <span className={styles.ruleText}>
                      {renderRuleText(item)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className={styles.footer}>
          <div className={styles.footerContent}>
            <h3>Questions or Issues?</h3>
            <p>
              Don&apos;t understand a rule? Need to report someone? Our staff
              team is here to help.
            </p>

            <div className={styles.contactInfo}>
              <span className={styles.ctaPill}>
                🎫 Create a ticket with <code>/ticket</code>
              </span>

              <a
                href="https://discord.gg/jartonmc"
                target="_blank"
                rel="noreferrer"
                className={styles.ctaButton}
              >
                💬 Join our Discord
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rules;
