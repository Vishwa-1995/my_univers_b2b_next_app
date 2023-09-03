"use client";

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { FaEdit, FaEye, FaPlus, FaTrash } from 'react-icons/fa';
import baseUrl from "../utils/baseUrl";

export default function ViewEvent() {
    const router = useRouter();
  const [eventList, setEventList] = useState([]);


  useEffect(() => {
    fetchData();
  }, []); 


  const fetchData = async () => {
    try {
      const response = await fetch(`${baseUrl}/event/fetch`, {
        method: "GET",
      });
      const data = await response.json();
      setEventList(data.data);

    } catch (error) {
      console.log("error", error);
    }
  };

  const AddEvent = () => {
    router.push('/create_event')
  }

  return (
    <div>
      <div className="flex flex-col  pt-[60px] pb-[50px] justify-center justify-items-center ">
        <div className=" 2xl:px-36 xl:px-32 lg:px-28 md:px-10 sm:px-4 px-10 ">
          <div className="flex flex-row justify-items-start items-start ">
            <button
              onClick={AddEvent}
              className="mr-2 rounded-full px-4 py-2  xl:w-56 xl:h-14 2xl:w-56 2xl:h-16 bg-gradient-to-r from-[#02b3bd] to-[#00868e] flex items-center gap-4 justify-center text-white text-md  "
            >
              Add New Event <FaPlus />
            </button>
          </div>
          <div
            className="flex overflow-x-auto bg-/**
       * name
       */
      public name() {
        
      }"
          >
            <table className="w-full h-auto border-collapse mt-10 mb-20 text-sm border border-gray-300 px-20 rounded-[20px] overflow-hidden">
              {/* ... Your table contents ... */}{" "}
              <thead className="">
                <tr className="bg-gradient-to-r from-[#02b3bd] to-[#00868e] text-white h-14 text-md">
                  <th className="p-2 border border-[#ddd]">Index</th>
                  <th className="p-2 border border-[#ddd]">Event Name</th>
                  <th className="p-2 border border-[#ddd]">Address</th>
                  <th className="p-2 border border-[#ddd]">Event Type</th>
                  <th className="p-2 border border-[#ddd]">Start Date</th>
                  <th className="p-2 border border-[#ddd]">End Date</th>
                  <th className="p-2 border border-[#ddd]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {eventList.map((event: any, index) => (
                  <tr className="bg-[#f2f2f2] h-12 text-md" key={index}>
                    <td className="p-4 border border-[#ddd]">{event?.id}</td>
                    <td className="p-2 border border-[#ddd]">{event.name}</td>
                    <td className="p-2 border border-[#ddd]">
                      {event.address}
                    </td>
                    <td className="p-2 border border-[#ddd]">
                      {event.event_type}
                    </td>
                    <td className="p-2 border border-[#ddd]">
                      {event.start_date}
                    </td>
                    <td className="p-2 border border-[#ddd]">{event.end_date}</td>
                    <td className="p-2 border border-[#ddd]">
                      <div className="flex gap-5 justify-center items-center">
                        <div className="cursor-pointer text-lg text-[#02b1c0]">
                          <FaEdit 
                          />
                        </div>
                        <div className="cursor-pointer text-lg text-[#02b1c0]">
                          <FaEye 
                       
                        />
                        </div>
                        <div className="cursor-pointer v text-[#02b1c0]">
                          <FaTrash 
                   
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* {openModal && <OpenViewModal setOpenModal={setOpenModal} propertyId={propertyId} />}
      {openUpdateModal && <OpenUpdateModal setOpenUpdateModal={setOpenUpdateModal} propertyId={propertyId} />} */}
    </div>
  )
}