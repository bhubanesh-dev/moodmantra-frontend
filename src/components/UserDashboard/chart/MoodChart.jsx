// import React from "react";
// import Highcharts from "highcharts";
// import HighchartsReact from "highcharts-react-official";

// const MoodChart = ({ data = [] }) => {
//   const options = {
//     chart: {
//       type: "areaspline",
//       height: 300,
//     },
//     title: { text: null }, // 🔥 remove chart title
//     xAxis: {
//       categories: data.map((d) => d.label), // e.g. days or dates
//       title: { text: null },
//       labels: { enabled: false },
//     },
//     yAxis: {
//       min: 0,
//       max: 10,
//       title: { text: null }, // also hide Y-axis label if not needed
//     },
//     plotOptions: {
//       areaspline: {
//         color: "#8F2DE9",
//         fillColor: {
//           linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
//           stops: [
//             [0, "#8F2DE9"],
//             [1, "rgba(143,45,233,0)"],
//           ],
//         },
//         marker: {
//           radius: 3,
//           lineWidth: 1,
//           lineColor: "#8F2DE9",
//           fillColor: "#fff",
//         },
//       },
//     },
//     series: [
//       {
//         name: "Mood Score",
//         data: data.map((d) => d.value),
//       },
//     ],
//     credits: { enabled: false },
//   };

//   return <HighchartsReact highcharts={Highcharts} options={options} />;
// };

// export default MoodChart;
import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const MoodChart = ({ data = [] }) => {
  // 🎨 Blue theme
  const chartColor = "#3A8DFF";

  const options = {
    chart: {
      type: "areaspline",
      height: 300,
      backgroundColor: "transparent", // match website white theme
    },
    title: { text: null },
    xAxis: {
      categories: data.map((d) => d.label),
      title: { text: null },
      labels: { enabled: false },
      lineColor: "#E0E0E0", // subtle axis line
    },
    yAxis: {
      min: 0,
      max: 30,
      title: { text: null },
      gridLineColor: "#F3F3F3", // light grid for clarity
    },
    plotOptions: {
      areaspline: {
        color: chartColor,
        fillColor: {
          linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
          stops: [
            [0, chartColor],
            [1, "rgba(58,141,255,0)"], // fade to transparent
          ],
        },
        marker: {
          radius: 3,
          lineWidth: 1,
          lineColor: chartColor,
          fillColor: "#fff",
        },
      },
    },
    series: [
      {
        name: "Mood Score",
        data: data.map((d) => d.value),
        color: chartColor,
      },
    ],
    credits: { enabled: false },
    legend: { enabled: false },
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default MoodChart;
