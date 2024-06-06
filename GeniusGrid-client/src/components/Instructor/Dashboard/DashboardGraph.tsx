import {  defaults } from "chart.js/auto";
import {  Line } from "react-chartjs-2";
import revenueData from "../../../utils/revenueData.json";

defaults.maintainAspectRatio = false;
defaults.responsive = true;
defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.color = "black";

export const DashboardGraph = () => {
  return (
    <>
      <div className="h-screen w-full flex flex-col items-center pt-8 bg-slate-50">
        <div className="bg-white rounded-lg shadow-lg p-4 w-full sm:w-4/5  h-80">
          <Line
            data={{
              labels: revenueData.map((data) => data.label),
              datasets: [
                {
                  label: "Revenue",
                  data: revenueData.map((data) => data.revenue),
                  backgroundColor: "#064FF0",
                  borderColor: "#064FF0",
                },
                {
                  label: "Cost",
                  data: revenueData.map((data) => data.cost),
                  backgroundColor: "#FF3030",
                  borderColor: "#FF3030",
                },
              ],
            }}
            options={{
              elements: {
                line: {
                  tension: 0.5,
                },
              },
              plugins: {
                title: {
                  text: "Monthly Revenue & Cost",
                },
              },
            }}
          />
        </div>
      </div>
    </>
  );
};

export default DashboardGraph;
