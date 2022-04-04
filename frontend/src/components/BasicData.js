import React from "react";

import {
  formatterBRL,
  formatterPercent,
  parserBRL,
  parserPercent,
  delPercent,
  parserPeriod
} from "../utils/format";

import { useData } from "../components/context/Context";

export default function BasicData() {
  const { vi, vp, t, j, setVi, setVp, setT, setJ } = useData();

  return (
    <div
      id="basic-data-content"
      className="col-span-3 flex flex-col p-5 shadow-lg1"
    >
      <p className="text-sm font-semibold text-green">Dados Básicos:</p>

      <div className="grid gap-5 grid-cols-2 md:grid-cols-4 my-2">
        <div>
          <p className="text-xs font-medium">Investimento Inicial:</p>
          <input
            className="w-full mt-2.5 rounded-sm px-5 h-9 flex items-center text-xs font-normal bg-white1 border border-gray2"
            value={formatterBRL(vi)}
            min={0}
            onChange={(e) => setVi(parserBRL(e.target.value))}
          />
          <p className="text-xs1 font-regular mt-1">
            Quanto você já economizou até hoje?
          </p>
        </div>
        <div>
          <p className="text-xs font-medium">Valor da Parcela:</p>
          <input
            className="w-full mt-2.5 rounded-sm px-5 h-9 flex items-center text-xs font-normal bg-white1 border border-gray2"
            value={formatterBRL(vp)}
            min={0}
            onChange={(e) => setVp(parserBRL(e.target.value))}
          />
          <p className="text-xs1 font-regular mt-1">
            Quanto você pretende poupar por mês?
          </p>
        </div>
        <div>
          <p className="text-xs font-medium">Período (em meses):</p>
          <input
            className="w-full mt-2.5 rounded-sm px-5 h-9 flex items-center text-xs font-normal bg-white1 border border-gray2"
            value={t}
            min={0}
            onChange={(e) => setT(parserPeriod(e.target.value || 0))}
          />
          <p className="text-xs1 font-regular mt-1">
            Durante quantos meses você pretende poupar?
          </p>
        </div>
        <div>
          <p className="text-xs font-medium">Taxa de Juros (em % a.a.):</p>
          <input
            className="w-full mt-2.5 rounded-sm px-5 h-9 flex items-center text-xs font-normal bg-white1 border border-gray2"
            value={formatterPercent(j)}
            min={0}
            max={100}
            onKeyDown={(e) => setJ(delPercent(e, j))}
            onChange={(e) => setJ(parserPercent(e.target.value))}
          />
          <p className="text-xs1 font-regular mt-1">
            Qual a taxa de juros à qual o seu dinheiro vai render por ano?
          </p>
        </div>
      </div>
    </div>
  );
}
