import React, { useState, useEffect } from "react";
import ReactECharts from "echarts-for-react";

import { useData } from "../components/context/Context";

const LineChart = () => {

  const { pieData } = useData();

  const [sizes, setSizes] = useState(["80%", "100%"]);

  useEffect(() => {
    function handleResize() {
      setSizes(window.innerWidth >= 768 && window.innerWidth <= 1022 ? [90, 120] : [120, 150]);
    }

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const options = {
    tooltip: {
      trigger: "none",
    },
    series: [
      {
        label: {
          show: false,
        },
        cursor: "default",
        silent: true,
        labelLine: {
          show: false,
        },
        type: "pie",
        radius: sizes,
        itemStyle: {
          borderRadius: "100%",
          borderColor: "#fff",
          borderWidth: 15,
        },
        data: pieData.data.sort(),
      },
    ],
  };

  return <ReactECharts option={options} />;
};

export default LineChart;
