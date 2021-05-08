import { apiCallBegan } from "../api.js";
import { createSlice } from "@reduxjs/toolkit";

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
         state.loading = false;

         const { groupOne, groupTwo, groupThree, groupFour } = action.payload;

         state.tasksGroupOne = groupOne;
         state.tasksGroupTwo = groupTwo;
         state.tasksGroupThree = groupThree;
         state.tasksGroupFour = groupFour;
      },

      addedTask: (state, action) => {
         const { data, groupId } = action.payload;

         if (groupId === 1) state.tasksGroupOne.push(data);
         if (groupId === 2) state.tasksGroupTwo.push(data);
         if (groupId === 3) state.tasksGroupThree.push(data);
         if (groupId === 6) state.tasksGroupFour.push(data);
      },

      editedTask: (state, action) => {
         const { groupId, taskId, data } = action.payload;

         if (groupId === 1) {
            const targetTask = state.tasksGroupOne.filter(
               (task) => task.id === taskId
            );
            const indexTask = state.tasksGroupOne.indexOf(targetTask[0]);
            state[indexTask] = data;
         }

         if (groupId === 2) {
            const targetTask = state.tasksGroupTwo.filter(
               (task) => task.id === taskId
            );
            const indexTask = state.tasksGroupOne.indexOf(targetTask[0]);
            state[indexTask] = data;
         }

         if (groupId === 3) {
            const targetTask = state.tasksGroupThree.filter(
               (task) => task.id === taskId
            );
            const indexTask = state.tasksGroupThree.indexOf(targetTask[0]);
            state[indexTask] = data;
         }

         if (groupId === 6) {
            const targetTask = state.tasksGroupFour.filter(
               (task) => task.id === taskId
            );
            const indexTask = state.tasksGroupFour.indexOf(targetTask[0]);
            state[indexTask] = data;
         }
      },

      movedTask: (state, action) => {
         const {
            data,
            prevTaskId,
            prevGroupId,
            targetGroupId,
         } = action.payload;

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

      deletedTask: (state, action) => {
         const { groupId, taskId } = action.payload;

         if (groupId === 1) {
            const newTask = state.tasksGroupOne.filter(
               (task) => task.id !== taskId
            );
            state.tasksGroupOne = newTask;
         }

         if (groupId === 2) {
            const newTask = state.tasksGroupTwo.filter(
               (task) => task.id !== taskId
            );
            state.tasksGroupTwo = newTask;
         }

         if (groupId === 3) {
            const newTask = state.tasksGroupThree.filter(
               (task) => task.id !== taskId
            );
            state.tasksGroupThree = newTask;
         }

         if (groupId === 6) {
            const newTask = state.tasksGroupFour.filter(
               (task) => task.id !== taskId
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

const url = "https://todos-project-api.herokuapp.com/";

export const loadTasks = () =>
   apiCallBegan({
      url,
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
      url: url + `todos/${groupId}/items`,
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
      url: url + `todos/${groupId}/items/${taskId}`,
   });

export const editTask = (groupId, taskId, { taskName, progress }) =>
   apiCallBegan({
      taskId,
      groupId,
      method: "PATCH",
      onSuccess: editedTask.type,
      data: { taskName, progress },
      url: url + `todos/${groupId}/items/${taskId}`,
   });

export const moveTask = (prevGroupId, prevTaskId, targetGroupId) =>
   apiCallBegan({
      prevTaskId,
      prevGroupId,
      targetGroupId,
      method: "PATCH",
      onSuccess: movedTask.type,
      data: { target_todo_id: targetGroupId },
      url: url + `todos/${prevGroupId}/items/${prevTaskId}`,
   });
