import React, { createContext, useContext, useState, useEffect } from "react";

import { message } from "antd";

import { useLazyQuery } from "@apollo/client";

import GET_DATA from "../../api/schema";

const Context = createContext();

const key = "message-show";

const colors = {
  accumulatedMonthly: "#21A3ED",
  totalInterestRate: "#7B1CF3",
  initialInvestment: "#07CC6D",
  accumulatedValue: "#09B682",
  investedValue: "#868686",
};

export default function Provider({ children }) {
  const [vi, setVi] = useState(0);
  const [vp, setVp] = useState(0);
  const [t, setT] = useState(0);
  const [j, setJ] = useState(0);

  const [getData, { loading, error, data }] = useLazyQuery(GET_DATA);

  const showMessage = (type) => {
    if (type === "loading")
      return message.loading({ prefixCls: "", content: "Carregando...",  key });
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

  const [pieData, setPieData] = useState({
    accumulatedValue: 0.0,
    spared: 0.0,
    accumulatedMonthly: 0.0,
    totalInterestRate: 0.0,
    initialInvestment: 0.0,
    data: [],
  });

  const [lineData, setLineData] = useState([]);

  const setDatas = () => {
    if (!data) return;

    let lineAux = lineData;

    lineAux = data.getLine.map((l, i) => ({
      ...l,
      color: colors[l.id],
    }));

    let pieAux = pieData;
    pieAux = Object.assign(pieAux, data.getPie);

    pieAux.data = data.getPie.data.map((p, i) => ({
      ...p,
      itemStyle: {
        color: colors[p.id],
      },
    }));

    setLineData(lineAux);

    setPieData(pieAux);

    return true;
  };

  useEffect(() => {
    if (vi * vp * j * t > 0) {
      showMessage("loading");
      const intervalId = setInterval(async () => {
        try {
          await getData({
            variables: {
              vi,
              vp,
              t,
              j,
            },
          });
          setDatas();
          showMessage("success");
        } catch {
          showMessage("error");
        }
        setAll({
          j: 0.0,
          vi: 0.0,
          vp: 0.0,
          t: 0.0,
        });
      }, 1000 * 2);
      return () => clearInterval(intervalId);
    }
  }, [vi, vp, j, t]);

  if (!loading && data && (pieData.data.length === 0 || lineData.length === 0))
    setDatas();

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
        pieData,
        lineData,
        setVi,
        setVp,
        setT,
        setJ,
        setPieData,
        setLineData,
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
