import Item from "./Item";
import NoTask from "./NoTask";
import { useState } from "react";
import styles from "../styles/group.module.css";
import ModalCreate from "../components/ModalCreate";

export default function Group({ task }) {
   const [statusModal, setStatusModal] = useState(false);

   return (
      <>
         <div
            className={styles.group}
            style={{
               border: groupStyles[task - 1].border,
               backgroundColor: groupStyles[task - 1].bgColor,
            }}
         >
            <div
               className={styles.group__label}
               style={{
                  color: groupStyles[task - 1].labelColor,
                  border: groupStyles[task - 1].labelBorder,
                  backgroundColor: groupStyles[task - 1].labelBgColor,
               }}
            >
               Group Task {task}
            </div>
            <div className={styles.group__date}>{dates[task - 1]}</div>

            {todos.length === 0 ? (
               <NoTask />
            ) : (
               todos.map((data) => <Item key={data.todo} todo={data} />)
            )}

            <button
               className={styles.group__add_btn}
               onClick={() => setStatusModal((status) => (status = !status))}
            >
               <img
                  alt="Add icon"
                  src="./add.png"
                  className={styles.group__add_icon}
               />
               New Task
            </button>
         </div>

         {statusModal === true && (
            <ModalCreate onSetStatusModal={setStatusModal} />
         )}
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

const todos = [
   {
      todo: "Redesigned the zero-g dogie bags. No more spills!",
      percentage: 80,
   },
   {
      todo: "Redesigned mobile web",
      percentage: 100,
   },
   {
      todo: "Redesigned the zero-g dogie bags. No more spills!",
      percentage: 80,
   },
   {
      todo: "Redesigned mobile web",
      percentage: 100,
   },
   {
      todo: "Redesigned the zero-g dogie bags. No more spills!",
      percentage: 80,
   },
   {
      todo: "Redesigned mobile web",
      percentage: 100,
   },
   {
      todo: "Redesigned the zero-g dogie bags. No more spills!",
      percentage: 80,
   },
   {
      todo: "Redesigned mobile web",
      percentage: 100,
   },
   {
      todo: "Redesigned the zero-g dogie bags. No more spills!",
      percentage: 80,
   },
   {
      todo: "Redesigned mobile web",
      percentage: 100,
   },
   {
      todo: "Redesigned the zero-g dogie bags. No more spills!",
      percentage: 80,
   },
   {
      todo: "Redesigned mobile web",
      percentage: 100,
   },
   {
      todo: "Redesigned the zero-g dogie bags. No more spills!",
      percentage: 80,
   },
   {
      todo: "Redesigned mobile web",
      percentage: 100,
   },
];
