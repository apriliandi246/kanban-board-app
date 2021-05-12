import styles from "../styles/modal-delete.module.css";
import { useDispatch } from "react-redux";
import { deleteTask } from "../store/tasks/tasks";
import { updateDeleteTaskModal } from "../store/ui/ui";

export default function ModalDelete({ taskId, groupId }) {
   const dispatch = useDispatch();

   function onDeleteTask() {
      dispatch(deleteTask(groupId === 4 ? 6 : groupId, taskId));
      dispatch(updateDeleteTaskModal(-1));
   }

   return (
      <div className={styles.modal_area}>
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
               Are you sure want to delete this task? <br /> your action can't
               be reverted.
            </p>

            <div className={styles.modal__buttons}>
               <button
                  className={styles.modal__cancel_btn}
                  onClick={() => dispatch(updateDeleteTaskModal(-1))}
               >
                  Cancel
               </button>

               <button
                  onClick={onDeleteTask}
                  className={styles.modal__delete_btn}
               >
                  Delete
               </button>
            </div>
         </div>
      </div>
   );
}
