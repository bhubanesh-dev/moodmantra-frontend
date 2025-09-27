import React, { useEffect, useRef } from "react";
import Highcharts from "highcharts";

const AssessmentHistoryChart = ({ assessmentHistory }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    Highcharts.setOptions({
      chart: {
        backgroundColor: "#ffffff", // White background
      },
      title: { style: { color: "#333333", fontSize: "2em" } },
      xAxis: { labels: { style: { color: "#333333" } } },
      yAxis: { labels: { style: { color: "#333333" } } },
      tooltip: {
        backgroundColor: "#1e90ff", // Tooltip background
        style: { color: "#ffffff" }, // Tooltip text
      },
    });

    Highcharts.chart(chartRef.current, {
      chart: { type: "line" },
      title: { text: null, align: "left" },
      credits: { enabled: false },
      xAxis: {
        type: "datetime",
        tickInterval: 24 * 3600 * 1000, // 1 day
        tickLength: 0,
        lineWidth: 0,
        crosshair: { width: 1, color: "#3399ff" }, // Crosshair
        labels: {
          autoRotation: [-45],
          formatter: function () {
            return Highcharts.dateFormat("%b %e", this.value);
          },
          style: { fontSize: "10px", color: "#333333" },
        },
        tickPixelInterval: 70,
      },
      yAxis: {
        min: 0,
        max: 30,
        gridLineColor: "#f2f2f2", // Gridlines
        offset: 20,
        title: { text: "Score", style: { color: "#333333" } },
      },
      tooltip: {
        useHTML: true,
        formatter: function () {
          return `
      <b>${Highcharts.dateFormat("%A, %b %e %H:%M", this.x)}</b><br/>
      Assignment: ${this.point.assignment}<br/>
      Score: <b>${this.y}</b><br/>
      Result: <span >${this.point.result}</span>
    `;
        },
      },

      series: [
        {
          name: "Assignment Scores",
          data: assessmentHistory?.map((item) => ({
            x: new Date(item.completedAt).getTime(),
            y: item.totalScore,
            result: item.result,
            assignment: item.assessmentId.title,
          })),
          color: "#1e90ff", // Line color
          lineWidth: 2,
          marker: {
            enabled: true,
            radius: 5,
            symbol: "circle",
            fillColor: "#004c99", // Marker color
          },
        },
      ],
    });
  }, [assessmentHistory]);

  return <div ref={chartRef} style={{ height: "300px" }} />;
};

export default AssessmentHistoryChart;
