import { apiCallBegan } from "../actionsCreator";

const API_KEY =
   "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE2MjA1NzE1MDN9.2xkLKvkY6R4RczyhI5Ke8h_GzrBDF7vAkr5hpDGDyqY";

const api =
   ({ dispatch }) =>
   (next) =>
   async (action) => {
      if (action.type !== apiCallBegan.type) return next(action);

      const {
         url,
         data,
         method,
         taskId,
         groupId,
         onStart,
         loadTask,
         onSuccess,
         prevTaskId,
         prevGroupId,
         targetGroupId,
      } = action.payload;

      if (onStart) dispatch({ type: onStart });

      next(action);

      try {
         if (loadTask) {
            const getGroupTasks = (id) =>
               fetch(url + `todos/${id}/items`, {
                  headers: { Authorization: API_KEY },
               }).then((res) => res.json());

            const res = await Promise.all([
               getGroupTasks(1),
               getGroupTasks(2),
               getGroupTasks(3),
               getGroupTasks(6),
            ]);

            dispatch({
               type: onSuccess,
               payload: {
                  groupOne: res[0],
                  groupTwo: res[1],
                  groupThree: res[2],
                  groupFour: res[3],
               },
            });
         } else {
            const res = await fetch(url, {
               method,
               body: JSON.stringify(data),
               headers: {
                  Authorization: API_KEY,
                  "Content-Type": "application/json",
               },
            });

            if (method === "POST") {
               dispatch({
                  type: onSuccess,
                  payload: { groupId, data: await res.json() },
               });
            }

            if (method === "DELETE") {
               dispatch({
                  type: onSuccess,
                  payload: { groupId, taskId },
               });
            }

            if (method === "PATCH") {
               if (targetGroupId) {
                  dispatch({
                     type: onSuccess,
                     payload: {
                        prevTaskId,
                        prevGroupId,
                        targetGroupId,
                        data: await res.json(),
                     },
                  });
               } else {
                  dispatch({
                     type: onSuccess,
                     payload: { groupId, taskId, data: await res.json() },
                  });
               }
            }
         }
      } catch (error) {
         throw new Error(error);
      }
   };

export default api;
