import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";

const DashboardBarChart: React.FC = () => {
  const [screenSize, setScreenSize] = useState(null);
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

  const today = new Date();
  const day = today.toLocaleString("default", { weekday: "long" });

  const sat = day === "Saturday" ? "#4a4fff" : "#75798c";
  const sun = day === "Sunday" ? "#4a4fff" : "#75798c";
  const mon = day === "Monday" ? "#4a4fff" : "#75798c";
  const tue = day === "Tuesday" ? "#4a4fff" : "#75798c";
  const wed = day === "Wednesday" ? "#4a4fff" : "#75798c";
  const thu = day === "Thursday" ? "#4a4fff" : "#75798c";
  const fri = day === "Friday" ? "#4a4fff" : "#75798c";
  return (
    <>
      <Bar
        height={height}
        width={width}
        data={{
          labels: ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"],
          datasets: [
            {
              label: "Tasks",
              data: [1, 4, 3, 5, 2, 3, 5],
              backgroundColor: [sat, sun, mon, tue, wed, thu, fri],
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
                color: [sat, sun, mon, tue, wed, thu, fri],
              },
            },
          },
        }}
      />
    </>
  );
};

export default DashboardBarChart;
