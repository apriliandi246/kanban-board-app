import Group from "./components/Group";
import styles from "./styles/app.module.css";
import { updateMenuItem } from "./store/ui/ui";
import { useDispatch, useSelector } from "react-redux";

export default function App() {
   const dispatch = useDispatch();
   const itemMenusId = useSelector((state) => state.ui.currentItemMenu);

   function closeItemMenus() {
      if (itemMenusId !== -1) dispatch(updateMenuItem(-1));
   }

   return (
      <>
         <div className={styles.container} onClick={closeItemMenus}>
            <aside className={styles.sidenav}>
               <img
                  alt="Logo"
                  src="./logo.png"
                  className={styles.sidenav__logo}
               />
            </aside>

            <div className={styles.content}>
               <h1 className={styles.content__title}>Product Roadmap</h1>

               <div className={styles.content__groups}>
                  <Group groupId={1} type={"tasksGroupOne"} />
                  <Group groupId={2} type={"tasksGroupTwo"} />
                  <Group groupId={3} type={"tasksGroupThree"} />
                  <Group groupId={4} type={"tasksGroupFour"} />
               </div>
            </div>
         </div>
      </>
   );
}
