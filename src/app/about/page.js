import styles from "./About.module.css";

export default function AboutPage() {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.heading}>About Eventify</h1>
      <p className={styles.paragraph}>
        Eventify is a simple event listing app powered by Ticketmaster.
      </p>
      <p className={styles.paragraph}>
        It helps you find events by city and explore their details with ease.
      </p>
    </div>
  );
}
