import { getISOWeek } from "date-fns";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/reducers";

const DashboardBarChart: React.FC = () => {
  const [screenSize, setScreenSize] = useState(null);

  const { email } = useSelector((state: RootState) => state.userReducer.user);

  const { tasks } = useSelector(
    (state: RootState) => state.sprintReducer.sprint
  );

  useEffect(() => {
    const currentScreenSize = window.innerWidth;
    setScreenSize(currentScreenSize);
  }, []);

  const height = screenSize < 600 ? 200 : 600;
  const width =
    screenSize > 600
      ? 300
      : screenSize < 600
      ? 250
      : screenSize < 414
      ? 200
      : 250;

  const today = new Date().toLocaleString("default", { weekday: "long" });

  const currentWeek = getISOWeek(new Date());

  const days = [
    "Saturday",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
  ];

  const color = days.map((day) => (today === day ? "#4a4fff" : "#75798c"));

  const labels = days.map((day) => day.slice(0, 3));

  const userTasks = tasks.filter((task) => task.assignedMember.includes(email));

  const data = days.map(
    (day) =>
      userTasks.filter(
        (task) =>
          new Date(task.dueDate).toLocaleString("default", {
            weekday: "long",
          }) === day &&
          getISOWeek(new Date(task.dueDate)) === currentWeek &&
          new Date(task.dueDate).getFullYear() === new Date().getFullYear()
      ).length
  );

  return (
    <>
      <Bar
        height={height}
        width={width}
        data={{
          labels,
          datasets: [
            {
              label: "Tasks",
              data,
              backgroundColor: color,
              barThickness: 15,
            },
          ],
        }}
        options={{
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                stepSize: 1,
              },
              title: {
                color: "#75798c",
                display: true,
                text: "Tasks",
              },
            },
            x: {
              ticks: {
                color,
              },
            },
          },
        }}
      />
    </>
  );
};

export default DashboardBarChart;
