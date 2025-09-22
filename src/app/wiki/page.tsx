import Link from "next/link";
import styles from "./Wiki.module.css";

const WikiPage = () => {
  const wikiSections = [
    {
      title: "Getting Started",
      description: "New to JartonMC? Start here!",
      link: "/wiki/overview",
      icon: "🌟"
    },
    {
      title: "Economy",
      description: "Learn about Gold, Nectar, and trading",
      link: "/wiki/economy", 
      icon: "💰"
    },
    {
      title: "Wilderness",
      description: "Explore biomes, dungeons, and structures",
      link: "/wiki/wilderness",
      icon: "🌲"
    },
    {
      title: "Rules",
      description: "Server rules and conduct guidelines", 
      link: "/rules",
      icon: "📋"
    },
    {
      title: "FAQ",
      description: "Frequently asked questions",
      link: "/wiki/faq",
      icon: "❓"
    },
  
    {
      title: "Changelog",
      description: "Latest updates and changes",
      link: "/wiki/changelog", 
      icon: "📝"
    },
    {
      title: "Dungeons",
      description: "Dungeon guides and strategies",
      link: "/wiki/dungeons",
      icon: "🏰"
    }
  ];

  return (
    <div className={styles.wiki}>
      <div className={styles.card}>
        <header className={styles.header}>
          <h1 className={styles.title}>
            JartonMC <span className={styles.highlight}>Wiki</span>
          </h1>
          <p className={styles.subtitle}>
            Everything you need to know about our Minecraft server
          </p>
        </header>

        <div className={styles.sectionsGrid}>
          {wikiSections.map((section, index) => (
            <Link key={index} href={section.link} className={styles.sectionCard}>
              <div className={styles.sectionIcon}>{section.icon}</div>
              <h3 className={styles.sectionTitle}>{section.title}</h3>
              <p className={styles.sectionDescription}>{section.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WikiPage;
