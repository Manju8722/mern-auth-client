import { useContext } from "react";
import { WorkOutContext } from "../context/WorkoutContext";
import { AuthContext } from "../context/AuthContext";

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useContext(WorkOutContext);
  const { user } = useContext(AuthContext);
  async function onDelete() {
    try {
      const response = await fetch("/api/workouts/" + workout._id, {
        method: "delete",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      await response.json();
      if (response.ok) {
        dispatch({ type: "delete", payload: workout._id });
      }
    } catch (error) {}
  }
  return (
    <div className="workout-details">
      <h4>{workout?.title}</h4>
      <p>
        <strong>Load (kg): </strong>
        {workout?.load}
      </p>
      <p>
        <strong>Number of reps: </strong>
        {workout?.reps}
      </p>
      <p>{workout?.createdAt}</p>
      <span onClick={onDelete}>Delete</span>
    </div>
  );
};

export default WorkoutDetails;
