"use client";

import React from "react";
import { TickSquare } from "react-iconly";
export default function successPage() {


  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-blue-200 to-white flex items-center justify-center">
      <div className="w-[1083px] h-auto flex-shrink-0 flex flex-col bg-[#fff] border rounded-[18px] border-solid border-[#42f7cc] pt-[50px] pb-[50px] shadow-md">
        {" "}
        <div className="flex flex-col items-center ">
          <div className="flex flex-col items-center">
            <TickSquare set="bold" primaryColor="#01B3BB" size={60} />
            <div className="flex flex-col items-center text-gray-700 text-center">
              Your application is submitted successfully for verification.
              <span className="text-gray-700 pt-10 pb-20 text-xs font-normal leading-tight">
                You will be notified once account is verified to the mail you
                provided in regestration.
              </span>
              Thank You, See You Soon !
            </div>
          </div>

          <div className="flex flex-col pt-5 items-center">
            <button
              className="w-[588px] h-[77.642px] flex-shrink-0 border rounded-[10px] bg-[#01B3BB] text-[#FEFCFE] font-montserrat font-semibold text-[18px] uppercase"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
