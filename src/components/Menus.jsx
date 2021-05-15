import { useDispatch } from "react-redux";
import { moveTask } from "../store/tasks";
import styles from "../styles/menus.module.css";
import {
   updateMenuItem,
   updateDeleteTaskModal,
   updateEditTaskModal,
} from "../store/ui";

export default function Menus({ groupId, taskId }) {
   const dispatch = useDispatch();

   function moveLeft() {
      dispatch(
         moveTask(
            groupId === 4 ? 6 : groupId,
            taskId,
            moveGroups[groupId - 1].moveLeft
         )
      );
      dispatch(updateMenuItem(-1));
   }

   function moveRight() {
      dispatch(
         moveTask(
            groupId === 4 ? 6 : groupId,
            taskId,
            moveGroups[groupId - 1].moveRight
         )
      );
      dispatch(updateMenuItem(-1));
   }

   return (
      <div className={styles.menus}>
         {groupId !== 1 && (
            <button className={styles.menus__btn} onClick={moveLeft}>
               <img
                  alt="Left arrow icon"
                  src="./left-arrow.png"
                  className={styles.menus__icon}
               />
               Move Left
            </button>
         )}

         {groupId !== 4 && (
            <button className={styles.menus__btn} onClick={moveRight}>
               <img
                  alt="Right arrow icon"
                  src="./right-arrow.png"
                  className={styles.menus__icon}
               />
               Move Right
            </button>
         )}

         <button
            className={styles.menus__btn}
            onClick={() => dispatch(updateEditTaskModal(taskId))}
         >
            <img
               alt="Edit icon"
               src="./edit.png"
               className={styles.menus__icon}
            />
            Edit
         </button>

         <button
            className={styles.menus__btn}
            onClick={() => dispatch(updateDeleteTaskModal(taskId))}
         >
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

const moveGroups = [
   {
      moveLeft: -1,
      moveRight: 2,
   },
   {
      moveLeft: 1,
      moveRight: 3,
   },
   {
      moveLeft: 2,
      moveRight: 6,
   },
   {
      moveLeft: 3,
      moveRight: -1,
   },
];
