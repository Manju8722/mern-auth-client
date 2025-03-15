import { createContext, useContext, useEffect, useReducer } from "react";
import { AuthContext } from "./AuthContext";

export const WorkOutContext = createContext();
function workoutsReducer(state, action) {
  switch (action.type) {
    case "get":
      return { workouts: action.payload };
    case "post":
      return { workouts: [...state.workouts, action.payload] };
    case "delete":
      return {
        workouts: state.workouts?.filter((w) => w._id !== action.payload),
      };
  }
}

export default function WorkoutContextFunc({ children }) {
  const [workouts, dispatch] = useReducer(workoutsReducer, { workouts: null });
  const { user } = useContext(AuthContext);
  useEffect(() => {
    async function fetchWorkOuts() {
      try {
        const fetched_data = await fetch(`/api/workouts`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        const data = await fetched_data.json();
        dispatch({ type: "get", payload: data });
      } catch (error) {}
    }
    if (user && user?.token) {
      console.log("fetching working");
      fetchWorkOuts();
    }
  }, [user]);
  return (
    <WorkOutContext.Provider value={{ ...workouts, dispatch }}>
      {children}
    </WorkOutContext.Provider>
  );
}
