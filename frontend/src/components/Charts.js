import React from "react";

import { useData } from "../components/context/Context";

import { formatterBRL, formatterPercent } from "../utils/format";

import LineChart from "../components/LineChart";
import PieChart from "../components/PieChart";

export default function Chartjs() {
  const { pieData, lineData } = useData();

  return (
    <>
      <div
        id="accrued-value-content"
        className="col-span-3 md:col-span-1 flex flex-col p-5 shadow-lg1"
      >
        <p className="text-sm font-semibold text-green">
          Participação no Valor Acumulado:
        </p>
        
        <div className="mt-5 md:mt-0 lg:mt-5 relative">
          <div className="absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 h-56 w-56 md:h-[10.5rem] md:w-[10.5rem] lg:h-56 lg:w-56 shadow-lg1 rounded-full z-10">
            <div className="flex flex-col items-center justify-center h-full">
              <p className="text-xs text-gray3 mt-3 mb-0">Valor Acumulado</p>
              <p className="text-lg font-semibold color-gray3 my-0">
                {formatterBRL(pieData.accumulatedValue || 0)}
              </p>
              <p className="text-gray3 mt-2 mb-0">Você terá poupado:</p>
              <p className="font-medium">{formatterBRL(pieData.spared || 0)}</p>
            </div>
          </div>
          <PieChart />
        </div>

        {pieData?.data?.length > 0 && (
          <div
            id="pie-chart-legends"
            className="mt-8 md:mt-0 lg:mt-8 flex flex-col"
          >
            {pieData.data
              .sort((itemA, itemB) => {
                if (itemA?.value > itemB?.value) return -1;
                else return 1;
              })
              .map((item, index) => (
                <div
                  key={index}
                  className="flex flex-row  items-end justify-between w-5/6 mx-auto"
                >
                  <div className="flex flex-row items-center">
                    <p
                      className="h-3.5 w-3.5 rounded-sm"
                      style={{ backgroundColor: item.itemStyle.color }}
                    />
                    <div className="flex flex-col ml-4">
                      <p className="text-sm mb-0">{item.label}</p>
                      <p className="text-gray3">{formatterBRL(item.value)}</p>
                    </div>
                  </div>
                  <p className="text-black3">
                    {formatterPercent(item.percent)}
                  </p>
                </div>
              ))}
          </div>
        )}
      </div>

      <div
        id="graphic-content"
        className="col-span-3 md:col-span-2 flex flex-col p-5 shadow-lg1"
      >
        <p className="text-sm font-semibold text-green">Projeção Financeira:</p>

        {lineData?.length > 0 ? (
          <div className="flex flex-col justify-center my-auto">
            <LineChart />

            <div id="line-chart-legends" className="flex flex-row mt-7 mx-auto">
              <div className="flex flex-row items-center">
                <p className="h-1.5 w-7 bg-gray rounded-sm" />
                <p className="ml-3">Valor Investido</p>
              </div>

              <div className="flex flex-row items-center ml-4 md:ml-7">
                <p className="h-1.5 w-7 bg-green rounded-sm" />
                <p className="ml-3">Valor Acumulado</p>
              </div>
            </div>
          </div>
        ) : (
          <p className="mx-auto my-5 text-md font-semibold">
            Sem dados. Preencha os{" "}
            <span className="text-green">Dados Básicos</span>.
          </p>
        )}
      </div>
    </>
  );
}
