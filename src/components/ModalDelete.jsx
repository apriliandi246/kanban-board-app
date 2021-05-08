import styles from "../styles/modal-delete.module.css";

export default function ModalDelete() {
   return (
      <div className={styles.modal}>
         <div className={styles.modal__head}>
            <img
               alt="Warn icon"
               src="./warn.png"
               className={styles.modal__head_icon}
            />

            <h1 className={styles.modal__head_title}>Delete Task</h1>
         </div>

         <p className={styles.modal__desc}>
            Are you sure want to delete this task? <br /> your action can't be
            reverted.
         </p>

         <div className={styles.modal__buttons}>
            <button className={styles.modal__cancel_btn}>Cancel</button>
            <button className={styles.modal__delete_btn}>Delete</button>
         </div>
      </div>
   );
}
