import Group from "./components/Group";
import styles from "./styles/app.module.css";

export default function App() {
   return (
      <>
         <div className={styles.container}>
            <aside className={styles.sidenav}>
               <img
                  src="./logo.png"
                  className={styles.sidenav__logo}
                  alt="Logo"
               />
            </aside>

            <div className={styles.content}>
               <h1 className={styles.content__title}>Product Roadmap</h1>

               <div className={styles.content__groups}>
                  <Group task={1} />
                  <Group task={2} />
                  <Group task={3} />
                  <Group task={4} />
               </div>
            </div>
         </div>
      </>
   );
}
