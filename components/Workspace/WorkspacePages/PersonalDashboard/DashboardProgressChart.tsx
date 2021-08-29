import React from "react";
import { Doughnut } from "react-chartjs-2";

const DashboardProgressChart = () => {
  return (
    <>
      <p>Today&apos;s Progress</p>
      <div className='doughnut-chart'>
        <Doughnut
          data={{
            labels: ["Done", "Remaining"],
            datasets: [
              {
                data: [60, 40],
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
            cutout: 65,
            elements: {
              arc: {
                borderWidth: 0,
              },
            },
          }}
        />
        <h1 className='percentage'>60%</h1>
      </div>
      <p>Done</p>
      <p className='remaining-tasks-percentage'>40% of tasks remaining</p>
    </>
  );
};

export default DashboardProgressChart;
