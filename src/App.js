import Group from "./components/Group";
import { Provider } from "react-redux";
import styles from "./styles/app.module.css";
import configureStore from "./store/configureStore";

const store = configureStore();

export default function App() {
   return (
      <>
         <div className={styles.container}>
            <aside className={styles.sidenav}>
               <img
                  alt="Logo"
                  src="./logo.png"
                  className={styles.sidenav__logo}
               />
            </aside>

            <Provider store={store}>
               <div className={styles.content}>
                  <h1 className={styles.content__title}>Product Roadmap</h1>

                  <div className={styles.content__groups}>
                     <Group groupId={1} type={"tasksGroupOne"} />
                     <Group groupId={2} type={"tasksGroupTwo"} />
                     <Group groupId={3} type={"tasksGroupThree"} />
                     <Group groupId={4} type={"tasksGroupFour"} />
                  </div>
               </div>
            </Provider>
         </div>
      </>
   );
}
