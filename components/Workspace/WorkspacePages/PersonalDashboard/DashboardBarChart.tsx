import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";

const DashboardBarChart: React.FC = () => {
  const [screenSize, setScreenSize] = useState(null);
  useEffect(() => {
    const currentScreenSize = window.innerWidth;
    setScreenSize(currentScreenSize);
  }, []);

  const height = screenSize < 600 ? 200 : 600;
  return (
    <>
      <Bar
        height={height}
        width={350}
        data={{
          labels: ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"],
          datasets: [
            {
              label: "Tasks",
              data: [1, 4, 3, 5, 2, 3, 5],
              backgroundColor: [
                "#171e3c",
                "#171e3c",
                "#171e3c",
                "#171e3c",
                "#171e3c",
                "#171e3c",
                "#171e3c",
              ],
              barThickness: 15,
            },
          ],
        }}
        options={{
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                stepSize: 1,
              },
            },
          },
        }}
      />
    </>
  );
};

export default DashboardBarChart;
