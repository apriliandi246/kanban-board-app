import styles from "../styles/menus.module.css";

export default function Menus() {
   return (
      <div className={styles.menus}>
         <button className={styles.menus__btn}>
            <img
               alt="Left arrow icon"
               src="./left-arrow.png"
               className={styles.menus__icon}
            />
            Move Left
         </button>

         <button className={styles.menus__btn}>
            <img
               alt="Right arrow icon"
               src="./right-arrow.png"
               className={styles.menus__icon}
            />
            Move Right
         </button>

         <button className={styles.menus__btn}>
            <img
               alt="Edit icon"
               src="./edit.png"
               className={styles.menus__icon}
            />
            Edit
         </button>

         <button className={styles.menus__btn}>
            <img
               alt="Trash icon"
               src="./trash.png"
               className={styles.menus__icon}
            />
            Delete
         </button>
      </div>
   );
}
