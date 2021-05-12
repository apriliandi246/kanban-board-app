import ui from "./ui/index";
import tasks from "./tasks/index";
import { combineReducers } from "redux";

export default combineReducers({
   ui: ui,
   entities: tasks,
});
