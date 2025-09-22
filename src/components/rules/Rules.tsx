import rules from "./rules.json";
import styles from "./Rules.module.css";

const Rules = () => {
  const getSectionIcon = (title: string) => {
    if (title.includes("Basic")) return "👥";
    if (title.includes("Gameplay")) return "⚖️"; 
    if (title.includes("Building")) return "🏗️";
    if (title.includes("Chat")) return "💬";
    return "📋"; // fallback
  };

  return (
    <div className={styles.rules}>
      <div className={styles.card}>
        <header className={styles.header}>
          <h1 className={styles.title}>
            Server <span className={styles.highlight}>Rules</span>
          </h1>
          <p className={styles.subtitle}>
            Welcome to JartonMC! These rules help keep our community fun and fair for everyone. 
            Breaking these rules may result in warnings, mutes, or bans depending on severity.
          </p>
        </header>

        <div className={styles.rulesGrid}>
          {rules.map((section, sectionIndex) => (
            <div key={sectionIndex} className={styles.ruleSection}>
              <div className={styles.sectionHeader}>
                <span className={styles.sectionIcon}>{getSectionIcon(section.title)}</span>
                <h3 className={styles.sectionTitle}>{section.title}</h3>
              </div>
              
              <div className={styles.rulesList}>
                {section.items.map((item, itemIndex) => (
                  <div key={itemIndex} className={styles.ruleItem}>
                    <span className={styles.ruleNumber}>{itemIndex + 1}</span>
                    <span className={styles.ruleText}>{item}</span>
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
