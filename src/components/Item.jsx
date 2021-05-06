import Menus from "./Menus";
import styles from "../styles/item.module.css";
import { useState } from "react";

export default function Item({ todo }) {
   const [isMenusShow, setStatusMenus] = useState(false);

   return (
      <>
         <div className={styles.item}>
            <h1 className={styles.item__desc}>{todo.todo}</h1>

            <div className={styles.item__menus}>
               <div className={styles.item__progress}>
                  <div className={styles.item__container_bar}>
                     <div
                        className={styles.item__progress_bar}
                        style={{
                           width: `${todo.percentage}%`,
                           backgroundColor:
                              todo.percentage === 100 ? "#52C41A" : "#1890ff",
                        }}
                     ></div>
                  </div>

                  {todo.percentage === 100 ? (
                     <img src="./fill.png" alt="Complete icon" />
                  ) : (
                     <span className={styles.item__percentage_progress}>
                        {todo.percentage}%
                     </span>
                  )}
               </div>

               <img
                  alt="Menu icon"
                  src="./dot.png"
                  className={styles.item__menus_icon}
                  onClick={() => setStatusMenus((status) => (status = !status))}
               />

               {isMenusShow === true && <Menus />}
            </div>
         </div>
      </>
   );
}
