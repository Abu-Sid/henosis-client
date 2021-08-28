import React from "react";
import { Doughnut } from "react-chartjs-2";

const DashboardProgressChart = () => {
  return (
    <div className='personal-dashboard__progress'>
      <p>Progress</p>
      <div className='doughnut-chart'>
        <Doughnut
          data={{
            labels: ["Done", "Remaining"],
            datasets: [
              {
                data: [20, 30],
                backgroundColor: ["#27ae60", "#eb5757"],
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
      </div>
    </div>
  );
};

export default DashboardProgressChart;
