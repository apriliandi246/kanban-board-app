import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../actionsCreator";

const tasksGroup = [
   "tasksGroupOne",
   "tasksGroupTwo",
   "tasksGroupThree",
   "tasksGroupFour",
];

const slice = createSlice({
   name: "tasks",
   initialState: {
      loading: false,
      tasksGroupOne: [],
      tasksGroupTwo: [],
      tasksGroupThree: [],
      tasksGroupFour: [],
   },

   reducers: {
      tasksRequested: (state, action) => {
         state.loading = true;
      },

      tasksReceived: (state, action) => {
         const { groupOne, groupTwo, groupThree, groupFour } = action.payload;

         state.loading = false;
         state.tasksGroupOne = groupOne;
         state.tasksGroupTwo = groupTwo;
         state.tasksGroupFour = groupFour;
         state.tasksGroupThree = groupThree;
      },

      addedTask: (state, action) => {
         const { data, groupId } = action.payload;
         state[tasksGroup[groupId === 6 ? 4 - 1 : groupId - 1]].push(data);
      },

      editedTask: (state, action) => {
         const { groupId, taskId, data } = action.payload;

         const targetTask = state[
            tasksGroup[groupId === 6 ? 4 - 1 : groupId - 1]
         ].filter((task) => task.id === taskId);

         const indexTask = state[
            tasksGroup[groupId === 6 ? 4 - 1 : groupId - 1]
         ].indexOf(targetTask[0]);

         state[tasksGroup[groupId === 6 ? 4 - 1 : groupId - 1]][indexTask] =
            data;
      },

      deletedTask: (state, action) => {
         const { groupId, taskId } = action.payload;

         const newTask = state[
            tasksGroup[groupId === 6 ? 4 - 1 : groupId - 1]
         ].filter((task) => task.id !== taskId);

         state[tasksGroup[groupId === 6 ? 4 - 1 : groupId - 1]] = newTask;
      },

      movedTask: (state, action) => {
         const { data, prevTaskId, prevGroupId, targetGroupId } =
            action.payload;

         if (prevGroupId === 1) {
            state.tasksGroupTwo.push(data);

            const newTask = state.tasksGroupOne.filter(
               (task) => task.id !== prevTaskId
            );

            state.tasksGroupOne = newTask;
         }

         if (prevGroupId === 2) {
            if (targetGroupId === 1) state.tasksGroupOne.push(data);
            if (targetGroupId === 3) state.tasksGroupThree.push(data);

            const newTask = state.tasksGroupTwo.filter(
               (task) => task.id !== prevTaskId
            );

            state.tasksGroupTwo = newTask;
         }

         if (prevGroupId === 3) {
            if (targetGroupId === 2) state.tasksGroupTwo.push(data);
            if (targetGroupId === 6) state.tasksGroupFour.push(data);

            const newTasks = state.tasksGroupThree.filter(
               (task) => task.id !== prevTaskId
            );

            state.tasksGroupThree = newTasks;
         }

         if (prevGroupId === 6) {
            state.tasksGroupThree.push(data);
            const newTask = state.tasksGroupFour.filter(
               (task) => task.id !== prevTaskId
            );

            state.tasksGroupFour = newTask;
         }
      },
   },
});

const {
   movedTask,
   addedTask,
   editedTask,
   deletedTask,
   tasksReceived,
   tasksRequested,
} = slice.actions;

export default slice.reducer;

const URL = "https://todos-project-api.herokuapp.com/";

export const loadTasks = () =>
   apiCallBegan({
      url: URL,
      method: "GET",
      loadTask: true,
      onStart: tasksRequested.type,
      onSuccess: tasksReceived.type,
   });

export const addTask = (groupId, { name, progress_percentage }) =>
   apiCallBegan({
      groupId,
      method: "POST",
      onSuccess: addedTask.type,
      url: URL + `todos/${groupId}/items`,
      data: {
         name: name.trim(),
         progress_percentage: parseInt(progress_percentage),
      },
   });

export const deleteTask = (groupId, taskId) =>
   apiCallBegan({
      taskId,
      groupId,
      method: "DELETE",
      onSuccess: deletedTask.type,
      url: URL + `todos/${groupId}/items/${taskId}`,
   });

export const editTask = (groupId, taskId, { name, progress, target_todo_id }) =>
   apiCallBegan({
      taskId,
      groupId,
      method: "PATCH",
      onSuccess: editedTask.type,
      url: URL + `todos/${groupId}/items/${taskId}`,
      data: {
         name,
         target_todo_id,
         progress_percentage: progress,
      },
   });

export const moveTask = (prevGroupId, prevTaskId, targetGroupId) =>
   apiCallBegan({
      prevTaskId,
      prevGroupId,
      targetGroupId,
      method: "PATCH",
      onSuccess: movedTask.type,
      data: { target_todo_id: targetGroupId },
      url: URL + `todos/${prevGroupId}/items/${prevTaskId}`,
   });
