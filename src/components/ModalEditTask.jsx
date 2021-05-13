import { useState } from "react";
import { useDispatch } from "react-redux";
import { editTask } from "../store/tasks";
import { updateEditTaskModal } from "../store/ui";
import styles from "../styles/modal-create.module.css";

export default function ModalEditTask({
   groupId,
   taskId,
   taskName,
   taskProgress,
}) {
   const dispatch = useDispatch();
   const [newTaskName, setNewTaskName] = useState(taskName);
   const [newTaskProgress, setNewTaskProgress] = useState(taskProgress);

   function updateTask(event) {
      event.preventDefault();

      dispatch(
         editTask(groupId === 4 ? 6 : groupId, taskId, {
            name: newTaskName,
            target_todo_id: groupId,
            progress: newTaskProgress,
         })
      );

      dispatch(updateEditTaskModal(-1));
   }

   return (
      <div className={styles.modal}>
         <div className={styles.modal__container}>
            <h1 className={styles.modal__title}>Edit Task</h1>

            <form onSubmit={updateTask}>
               <div className={styles.modal__input_form}>
                  <label htmlFor="task-name" className={styles.modal__label}>
                     Task Name
                  </label>

                  <input
                     required
                     type="text"
                     id="task-name"
                     autoComplete="off"
                     value={newTaskName}
                     className={styles.modal__input}
                     placeholder="example: Build rocket to Mars."
                     onChange={(event) => setNewTaskName(event.target.value)}
                  />
               </div>

               <div className={styles.modal__input_form}>
                  <label htmlFor="progress" className={styles.modal__label}>
                     Progress
                  </label>

                  <input
                     min="1"
                     required
                     max="100"
                     type="number"
                     id="progress"
                     placeholder="1%"
                     autoComplete="off"
                     value={newTaskProgress}
                     style={{ width: "99px" }}
                     className={styles.modal__input}
                     onChange={(event) =>
                        setNewTaskProgress(event.target.value)
                     }
                  />
               </div>

               <div className={styles.modal__buttons}>
                  <button
                     type="button"
                     className={styles.modal__cancel_btn}
                     onClick={() => dispatch(updateEditTaskModal(-1))}
                  >
                     Cancel
                  </button>

                  <button
                     type="submit"
                     className={styles.modal__save_btn}
                     disabled={newTaskName === "" || newTaskProgress === 0}
                  >
                     Save Task
                  </button>
               </div>
            </form>
         </div>
      </div>
   );
}
