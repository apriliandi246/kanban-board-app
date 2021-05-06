import styles from "../styles/modal-create.module.css";

export default function ModalCreate({ onSetStatusModal }) {
   return (
      <div className={styles.modal}>
         <div className={styles.modal__container}>
            <h1 className={styles.modal__title}>Edit Task</h1>

            <form>
               <div className={styles.modal__input_form}>
                  <label htmlFor="task-name" className={styles.modal__label}>
                     Task Name
                  </label>

                  <input
                     type="text"
                     id="task-name"
                     className={styles.modal__input}
                     placeholder="example: Build rocket to Mars."
                  />
               </div>

               <div className={styles.modal__input_form}>
                  <label htmlFor="progress" className={styles.modal__label}>
                     Progress
                  </label>

                  <input
                     type="text"
                     id="progress"
                     placeholder="0%"
                     style={{ width: "99px" }}
                     className={styles.modal__input}
                  />
               </div>

               <div className={styles.modal__buttons}>
                  <button
                     type="button"
                     className={styles.modal__cancel_btn}
                     onClick={() =>
                        onSetStatusModal((status) => (status = !status))
                     }
                  >
                     Cancel
                  </button>

                  <button type="submit" className={styles.modal__save_btn}>
                     Save Task
                  </button>
               </div>
            </form>
         </div>
      </div>
   );
}
