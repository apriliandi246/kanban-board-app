import ui from "./ui/ui";
import tasks from "./tasks/tasks";
import { combineReducers } from "redux";

export default combineReducers({
   ui: ui,
   entities: tasks,
});
