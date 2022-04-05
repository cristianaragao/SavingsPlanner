import React, { useState, useCallback } from "react";

import Image from "next/image";

import BasicData from "../components/BasicData";
import Charts from "../components/Charts";

import { useData } from "../components/context/Context";

export default function Dashboard() {
  const { vi, vp, t, j, setVi, setVp, setT, setJ } = useData();

  return (
    <div id="page" className="flex justify-center min-h-screen">
      <div
        id="container"
        className="flex flex-col w-full max-w-screen-xl mx-5 my-5 md:my-auto"
      >
        <div id="title-logo" className="flex flex-row items-center">
          <Image src="/logo.png" alt="Logo" width={36} height={26} />
          <p className="text-base font-semibold ml-3.5 my-auto">
            Planejador de Poupança
          </p>
        </div>

        <div id="content" className="grid grid-cols-3 gap-5 mt-6">
          <BasicData />
          <Charts/>
        </div>
      </div>
    </div>
  );
}
