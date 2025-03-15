import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { WorkOutContext } from "../context/WorkoutContext";

export function uselogout() {
    const { dispatch } = useContext(AuthContext);
    const { dispatch: workoutDispatch } = useContext(WorkOutContext);

    const logout = () => {
        localStorage.removeItem('auth');
        dispatch({ type: 'logout', payload: null })
        workoutDispatch({ type: 'get', payload: null })
    }
    return { logout }
}