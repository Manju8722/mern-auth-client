import { useContext, useEffect, useState } from "react";
import { useBackendApiEndpint } from "../hooks/useBackendApi.js";
import WorkoutForm from "../components/WorkOutCreateForm.jsx";
import WorkoutDetails from "../components/WorkoutDetails.jsx";
import { WorkOutContext } from "../context/WorkoutContext.jsx";
import UIloader from "../components/UI/loader.jsx";

const Home = () => {
  const { workouts } = useContext(WorkOutContext);
  return (
    <div className="home">
      <div className="workouts">
        {workouts ? (
          workouts.map((workout) => (
            <WorkoutDetails workout={workout} key={workout._id} />
          ))
        ) : (
          <UIloader />
        )}
      </div>
      {workouts && workouts?.length === 0 && (
        <span>No workouts exits please add </span>
      )}
      <WorkoutForm />
    </div>
  );
};

export default Home;
