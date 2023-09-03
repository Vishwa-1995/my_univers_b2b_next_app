"use client";

import { useRouter } from "next/navigation";
import React from "react";

export default function Dashboard() {
  const router = useRouter();
  const EventForm = () => {
    router.push("/event");
  };

  const PropertyForm = () => {
    router.push("/housing");
  };

  const OfferForm = () => {
    router.push("/offers-card");
  };

  const CareerForm = () => {
    router.push("/job_volunteer");
  };
  

  return (
    <div
      className="min-h-screen w-full 2xl:px-96 xl:px-64 lg:px-56  md:px-24 sm:px-10 px-4 flex  justify-center items-center 
      bg-gradient-to-r from-blue-200 to-white "
    >
      {" "}
      <div
        className=" mt-4 w-full h-auto flex-shrink-0 flex flex-col bg-[#fff] border rounded-[18px] 
        border-solid border-[#42f7cc] pt-[50px] pb-[50px] shadow-md"
      >
        {" "}
        <div className="px-10 flex space-x-4 justify-between pt-14 ">
          <button
            onClick={EventForm}
            className="w-full px-14 py-12 bg-gradient-to-r from-[#2193b0] to-[#6dd5ed] text-lg font-bold text-white rounded-md hover:bg-[#01B3BB] focus:outline-none focus:ring focus:ring-blue-300"
          >
            EVENTS
          </button>
          <button
            onClick={PropertyForm}
            className="w-full px-12 py-12  bg-gradient-to-r from-[#2193b0] to-[#6dd5ed] text-lg font-bold text-white rounded-md hover:bg-[#01B3BB] focus:outline-none focus:ring focus:ring-green-300"
          >
            Housing
          </button>
        </div>
        <div className="px-10 flex space-x-4 justify-between pt-14 ">
          <button
            onClick={OfferForm}
            className="w-full px-12 py-12 bg-gradient-to-r from-[#2193b0] to-[#6dd5ed] text-lg font-bold text-white rounded-md hover:bg-[#01B3BB] focus:outline-none focus:ring focus:ring-green-300"
          >
            OFFERS
          </button>
          <button
            onClick={CareerForm}
            className="w-full px-12 py-12 bg-gradient-to-r from-[#2193b0] to-[#6dd5ed] text-lg font-bold text-white rounded-md hover:bg-[#01B3BB] focus:outline-none focus:ring focus:ring-green-300"
          >
            CAREER
          </button>
        </div>
        <div className="px-10 flex space-x-4 items-center justify-center pt-14 ">

        <button
          // onClick={}
          className="w-full px-12 py-12 bg-gradient-to-r from-[#2193b0] to-[#6dd5ed] text-lg font-bold text-white rounded-md hover:bg-[#01B3BB] focus:outline-none focus:ring focus:ring-green-300"
        >
          BANNER ADD
        </button>
        </div>
      </div>
    </div>
  );
}
