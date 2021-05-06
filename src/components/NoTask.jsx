import styles from "../styles/no-task.module.css";

export default function NoTask() {
   return (
      <div className={styles.notask}>
         <p className={styles.notask__desc}>No Task Available</p>
      </div>
   );
}
