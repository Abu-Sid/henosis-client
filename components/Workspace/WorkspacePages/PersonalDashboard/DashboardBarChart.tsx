import React from "react";
import { Bar } from "react-chartjs-2";

const DashboardBarChart = () => {
  return (
    <div style={{ padding: "1em" }} className='personal-dashboard__chart'>
      <Bar
        height={600}
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
    </div>
  );
};

export default DashboardBarChart;
