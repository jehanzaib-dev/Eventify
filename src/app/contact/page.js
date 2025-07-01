import styles from "./Contact.module.css";

export default function ContactPage() {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.heading}>Contact Us</h1>
      <p className={styles.paragraph}>You can reach us at:</p>
      <ul className={styles.contactList}>
        <li>Email: support@eventify.com</li>
        <li>Phone: +92 123 4567890</li>
      </ul>
    </div>
  );
}