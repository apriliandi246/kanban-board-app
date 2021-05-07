import reducer from "./reducer";
import api from "./middleware/api";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

export default function store() {
   return configureStore({
      reducer,
      middleware: [...getDefaultMiddleware(), api],
   });
}
