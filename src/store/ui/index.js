import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
   name: "ui",
   initialState: {
      currentItemMenu: -1,
      currentNewTaskModal: -1,
      currentEditTaskModal: -1,
      currentDeleteTaskModal: -1,
   },
   reducers: {
      updatedMenuItemStatus: (state, action) => {
         state.currentItemMenu = action.payload.id;
      },
      updatedNewTaskModalStatus: (state, action) => {
         state.currentNewTaskModal = action.payload.id;
      },
      updatedEditTaskModalStatus: (state, action) => {
         state.currentEditTaskModal = action.payload.id;
      },
      updatedDeleteTaskModalStatus: (state, action) => {
         state.currentDeleteTaskModal = action.payload.id;
      },
   },
});

const {
   updatedMenuItemStatus,
   updatedNewTaskModalStatus,
   updatedEditTaskModalStatus,
   updatedDeleteTaskModalStatus,
} = slice.actions;

export default slice.reducer;

export const updateMenuItem = (id) => updatedMenuItemStatus({ id });
export const updateNewTaskModal = (id) => updatedNewTaskModalStatus({ id });
export const updateEditTaskModal = (id) => updatedEditTaskModalStatus({ id });
export const updateDeleteTaskModal = (id) =>
   updatedDeleteTaskModalStatus({ id });
