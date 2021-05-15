import ui from "./ui";
import tasks from "./tasks";
import { combineReducers } from "redux";

export default combineReducers({
   ui: ui,
   entities: tasks,
});
