import Menus from "./Menus";
import styles from "../styles/item.module.css";
import { updateMenuItem } from "../store/ui/ui";
import { useDispatch, useSelector } from "react-redux";

export default function Item({ task, groupId }) {
   const dispatch = useDispatch();
   const itemMenusId = useSelector((state) => state.ui.currentItemMenu);

   function toggleMenusItem() {
      dispatch(updateMenuItem(task.id));
   }

   return (
      <>
         <div className={styles.item}>
            <h1 className={styles.item__desc}>{task.name}</h1>

            <div className={styles.item__menus}>
               <div className={styles.item__progress}>
                  <div className={styles.item__container_bar}>
                     <div
                        className={styles.item__progress_bar}
                        style={{
                           width: `${task.progress_percentage}%`,
                           backgroundColor:
                              task.progress_percentage === 100
                                 ? "#52C41A"
                                 : "#1890ff",
                        }}
                     ></div>
                  </div>

                  {task.progress_percentage === 100 ? (
                     <img src="./fill.png" alt="Complete icon" />
                  ) : (
                     <span className={styles.item__percentage_progress}>
                        {task.progress_percentage}%
                     </span>
                  )}
               </div>

               <button
                  onClick={toggleMenusItem}
                  className={styles.item__menus_btn}
               >
                  <img
                     alt="Menu icon"
                     src="./dot.png"
                     className={styles.item__menus_icon}
                  />
               </button>

               {itemMenusId === task.id && (
                  <Menus groupId={groupId} taskId={task.id} />
               )}
            </div>
         </div>
      </>
   );
}
