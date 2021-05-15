import Item from "./Item";
import NoTask from "./NoTask";
import Skeleton from "./Skeleton";
import { useEffect } from "react";
import { loadTasks } from "../store/tasks";
import styles from "../styles/group.module.css";
import { updateNewTaskModal } from "../store/ui";
import ModalCreate from "../components/ModalCreate";
import { useDispatch, useSelector } from "react-redux";

export default function Group({ groupId, type }) {
   const dispatch = useDispatch();
   const tasks = useSelector((state) => state.entities[type]);
   const loading = useSelector((state) => state.entities.loading);
   const statusModal = useSelector((state) => state.ui.currentNewTaskModal);

   useEffect(() => {
      dispatch(loadTasks());
   }, []);

   return (
      <>
         <div
            className={styles.group}
            style={{
               border: groupStyles[groupId - 1].border,
               backgroundColor: groupStyles[groupId - 1].bgColor,
            }}
         >
            <div
               className={styles.group__label}
               style={{
                  color: groupStyles[groupId - 1].labelColor,
                  border: groupStyles[groupId - 1].labelBorder,
                  backgroundColor: groupStyles[groupId - 1].labelBgColor,
               }}
            >
               Group Task {groupId}
            </div>
            <div className={styles.group__date}>{dates[groupId - 1]}</div>

            {loading === true ? (
               <>
                  <Skeleton />
                  <Skeleton />
                  <Skeleton />
               </>
            ) : tasks.length === 0 ? (
               <NoTask />
            ) : (
               tasks.map((task) => (
                  <Item key={task.id} task={task} groupId={groupId} />
               ))
            )}

            <button
               className={styles.group__add_btn}
               onClick={() => dispatch(updateNewTaskModal(groupId))}
            >
               <img
                  alt="Add icon"
                  src="./add.png"
                  className={styles.group__add_icon}
               />
               New Task
            </button>
         </div>

         {statusModal === groupId && <ModalCreate groupId={groupId} />}
      </>
   );
}

const dates = [
   "January - March",
   "April - June",
   "July - September",
   "October - December",
];

const groupStyles = [
   {
      border: "1px solid #eb2f96",
      bgColor: "#fff9fb",
      labelBorder: "1px solid #ffadd2",
      labelColor: "#eb2f96",
      labelBgColor: "#fff0f6",
   },
   {
      border: "1px solid #7b61ff",
      bgColor: "#fcfafd",
      labelBorder: "1px solid #d3adf7",
      labelColor: "#7b61ff",
      labelBgColor: "#f9f0ff",
   },
   {
      border: "1px solid #2f54eb",
      bgColor: "#f7faff",
      labelBorder: "1px solid #adc6ff",
      labelColor: "#2f54eb",
      labelBgColor: "#f0f5ff",
   },
   {
      border: "1px solid #52c41a",
      bgColor: "#f8fef1",
      labelBorder: "1px solid #b7eb8f",
      labelColor: "#52c41a",
      labelBgColor: "#f6ffed",
   },
];
