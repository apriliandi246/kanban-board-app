import styles from "../styles/modal-create.module.css";
import { updateNewTaskModal } from "../store/ui/ui";
import { useState } from "react";
import { addTask } from "../store/tasks/tasks";
import { useDispatch } from "react-redux";

export default function ModalCreate({ groupId }) {
   const dispatch = useDispatch();
   const [taskName, setTaskName] = useState("");
   const [progress, setProgress] = useState("");

   function addNewTask(event) {
      event.preventDefault();

      dispatch(
         addTask(groupId === 4 ? 6 : groupId, {
            name: taskName,
            progress_percentage: progress,
         })
      );

      dispatch(updateNewTaskModal(-1));
   }

   return (
      <div className={styles.modal}>
         <div className={styles.modal__container}>
            <h1 className={styles.modal__title}>Create Task</h1>

            <form onSubmit={addNewTask}>
               <div className={styles.modal__input_form}>
                  <label htmlFor="task-name" className={styles.modal__label}>
                     Task Name
                  </label>

                  <input
                     type="text"
                     id="task-name"
                     className={styles.modal__input}
                     placeholder="example: Build rocket to Mars."
                     onChange={(event) => setTaskName(event.target.value)}
                  />
               </div>

               <div className={styles.modal__input_form}>
                  <label htmlFor="progress" className={styles.modal__label}>
                     Progress
                  </label>

                  <input
                     type="number"
                     id="progress"
                     placeholder="0"
                     className={styles.modal__input}
                     style={{ width: "99px", fontWeight: "400" }}
                     onChange={(event) => setProgress(event.target.value)}
                  />
               </div>

               <div className={styles.modal__buttons}>
                  <button
                     type="button"
                     className={styles.modal__cancel_btn}
                     onClick={() => dispatch(updateNewTaskModal(-1))}
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
