import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/reducers";

const DashboardProgressChart = () => {
  const { email } = useSelector((state: RootState) => state.userReducer.user);

  const { tasks } = useSelector(
    (state: RootState) => state.sprintReducer.sprint
  );

  const userTodayTasks = tasks.filter(
    (task) =>
      task.assignedMember.includes(email) &&
      new Date(task.dueDate).toDateString() === new Date().toDateString()
  );

  const todayUndoTasks = userTodayTasks.filter(
    (task) => task.currentStatus !== "DONE"
  );

  const remaining = parseFloat(
    ((todayUndoTasks.length / userTodayTasks.length) * 100).toFixed(2)
  );

  const progress = parseFloat((100 - remaining).toFixed(2));

  const [screenSize, setScreenSize] = useState(null);
  useEffect(() => {
    const currentScreenSize = window.innerWidth;
    setScreenSize(currentScreenSize);
  }, []);

  const cutoutSize = screenSize < 600 ? 50 : 65;

  const color = !progress ? "#75798c" : "#4a4fff";

  let currentRemaining;
  if (isNaN(remaining)) {
    currentRemaining = 100;
  } else {
    currentRemaining = remaining;
  }
  return (
    <>
      <p>Today&apos;s Progress</p>
      <div className='doughnut-chart'>
        <Doughnut
          data={{
            labels: ["Done", "Remaining"],
            datasets: [
              {
                data: [progress || 0, currentRemaining],
                backgroundColor: ["#4a4fff", "#d0d1d8"],
                border: "none",
              },
            ],
          }}
          width={100}
          height={100}
          options={{
            plugins: {
              legend: {
                display: false,
              },
            },
            cutout: cutoutSize,
            elements: {
              arc: {
                borderWidth: 0,
              },
            },
          }}
        />
        <h1 style={{ color: color }} className='percentage'>
          {progress || 0}%
        </h1>
      </div>
      <p>Done</p>
      <p className='remaining-tasks-percentage'>
        {remaining || 0}% of tasks remaining
      </p>
    </>
  );
};

export default DashboardProgressChart;
