import React, { createContext, useContext, useState, useEffect } from "react";

import "antd/dist/antd.css";

import { message } from "antd";

const Context = createContext();

const key = "message-show";

export default function Provider({ children }) {
  const [vi, setVi] = useState(0);
  const [vp, setVp] = useState(0);
  const [t, setT] = useState(0);
  const [j, setJ] = useState(0);

  const showMessage = (type) => {
    if (type === "loading")
      return message.loading({ content: "Carregando...", key });
    if (type === "success")
      return message.success({
        content: "Poupança calculada!",
        key,
        duration: 3,
      });
    if (type === "error")
      return message.error({
        content: "Erro ao calcular poupança!",
        key,
        duration: 3,
      });
  };

  const [data, setData] = useState({
    accumulatedValue: 0.0,
    spare: 0.0,
    accumulatedMonthly: 0.0,
    totalInterestRate: 0.0,
    initialInvestment: 0.0,
  });

  const [pieData, setPieData] = useState([]);

  const [lineData, setLineData] = useState([
    {
      name: "Valor Investido",
      color: "#868686",
      data: [],
    },
    {
      name: "Valor Acumulado",
      color: "#09B682",
      data: [],
    },
  ]);

  const setDatas = () => {
    let accumulatedValue = vi;

    let investedAmountList = [accumulatedValue];
    let accumulatedValueList = [accumulatedValue];

    const oneTwelfth = 1 / 12;
    const oldPercent = 1.0 + j / 100;

    let interestRate = Math.pow(oldPercent, oneTwelfth);

    investedAmountList = [
      ...investedAmountList,
      ...Array(t)
        .fill(0)
        .map((_, index) => vi + vp * (index + 1)),
    ];

    accumulatedValueList = [
      ...accumulatedValueList,
      ...Array(t)
        .fill(0)
        .map(() => {
          let saving = accumulatedValue * interestRate;
          accumulatedValue = saving + vp;
          return accumulatedValue;
        }),
    ];

    let lineArrayData = lineData;

    lineArrayData[0].data = investedAmountList;
    lineArrayData[1].data = accumulatedValueList;

    setLineData(lineArrayData);

    let dataChart = {
      accumulatedValue: accumulatedValueList[investedAmountList.length - 1],
      spare: investedAmountList[investedAmountList.length - 1],
      accumulatedMonthly:
        investedAmountList[accumulatedValueList.length - 1] - vi,
      totalInterestRate:
        accumulatedValueList[accumulatedValueList.length - 1] -
        investedAmountList[investedAmountList.length - 1],
      initialInvestment: vi,
    };

    setData(dataChart);

    setPieData([
      {
        label: "Investimento Mensal Acumulado",
        value: parseFloat(dataChart.accumulatedMonthly).toFixed(2),
        itemStyle: {
          color: "#21A3ED",
        },
        percent: dataChart.accumulatedMonthly / dataChart.accumulatedValue,
      },
      {
        label: "Juros",
        value: dataChart.totalInterestRate,
        itemStyle: {
          color: "#7B1CF3",
        },
        percent: dataChart.totalInterestRate / dataChart.accumulatedValue,
      },
      {
        label: "Investimento Inicial",
        value: dataChart.initialInvestment,
        itemStyle: {
          color: "#07CC6D",
        },
        percent: dataChart.initialInvestment / dataChart.accumulatedValue,
      },
    ]);
  };

  useEffect(() => {
    if (vi * vp * j * t > 0) {
      const intervalId = setInterval(() => {
        try {
          showMessage("loading");
          setDatas();
          setAll({
            j: 0.0,
            vi: 0.0,
            vp: 0.0,
            t: 0.0,
          });
          showMessage("success");
        } catch {
          showMessage("error");
        }
      }, 1000 * 2);
      return () => clearInterval(intervalId);
    }
  }, [vi, vp, j, t]);

  const setAll = (values) => {
    setJ(values.j);
    setVi(values.vi);
    setVp(values.vp);
    setT(values.t);
  };

  return (
    <Context.Provider
      value={{
        vi,
        vp,
        t,
        j,
        data,
        pieData,
        lineData,
        setVi,
        setVp,
        setT,
        setJ,
        setData,
        setPieData,
        setLineData,
        showMessage,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export const useData = () => {
  const values = useContext(Context);
  return values;
};
