import React, { useState, useEffect } from "react";
import ReactECharts from "echarts-for-react";

import { formatterBRL } from "../utils/format";

import { useData } from "../components/context/Context";

const LineChart = () => {
  const { lineData } = useData();

  const options = {
    grid: {
      top: 16,
      bottom: 0,
      left: 16,
      right: "3%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      nameLocation: "end",
      data: lineData[0].data.map((_, index) => `Mês ${index}`),
    },
    yAxis: {
      type: "value",
      position: "right",
      axisLabel: {
        formatter: function (d) {
          return formatterBRL(d);
        },
      },
    },
    tooltip: {
      trigger: "axis",
      order: "valueAsc",
      backgroundColor: "#FCFFFD",
      borderColor: "#09B682",
      valueFormatter: (value) => formatterBRL(value),
      position: function (pos, params, dom, rect, size) {
        if (size?.viewSize[0] < 520) return [0, 0];
        return "inside";
      },
    },
    series: [
      ...lineData.map((line) => ({
        showSymbol: false,
        type: "line",
        smooth: true,
        ...line,
      })),
    ],
  };

  return <ReactECharts option={options} />;
};

export default LineChart;
