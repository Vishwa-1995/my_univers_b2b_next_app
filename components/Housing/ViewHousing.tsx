"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaTrash, FaEdit, FaEye, FaPlus } from "react-icons/fa";
import OpenViewModal from "./OpenViewModal";
import OpenUpdateModal from "./OpenUpdateModal";
import axios from "axios";
import Swal from "sweetalert2";
import baseUrl from "../utils/baseUrl";

export default function ViewHousing() {
  const router = useRouter();
  const [HousingtList, setHousingtList] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [propertyId, setPropertyId] = useState();

  const onDelete = (housing:any) => {
    console.log(housing.id)
    Swal.fire({
      title: "Are you sure you want to confirm delete? ",
      showConfirmButton: true,
      showDenyButton: true,
      confirmButtonText: "Proceed",
      denyButtonText: "Cancel",
      confirmButtonColor: "#1fc191",
    }).then((result) => {
      if (result.isConfirmed) {   
        axios
          .delete(`${baseUrl}/property/delete/${housing.id}`)
          .then(() => {
            Swal.fire({
              title: "Property successfully Deleted! ",
              icon: "success",
              confirmButtonColor: "#207159",
            }).then((res) => {
              if (res.isConfirmed) {
                location.reload()
              }
            });
          })
          .catch((err) => {
            console.log("rrrrrrrrrrr : ", err)
            Swal.fire({
              title: "Error occured ! ",
              text: `${err}`,
              icon: "error",
              confirmButtonColor: "#207159",
            });
          });
      } 
    });
  };

  useEffect(() => {
    fetchData();
  }, []); 
  
  const fetchData = async () => {
    try {
      const response = await fetch(`${baseUrl}/property/fetch`, {
        method: "GET",
      });
      const data = await response.json();
      setHousingtList(data.data);

    } catch (error) {
      console.log("error", error);
    }
  };
  
  const ViewAddhousing = () => {
    router.push("/create_property");
  };

    const viewProperty = (housing:any) => {
      setPropertyId(housing.id)
      setOpenModal(true);
    };

    const updateProperty = (housing:any) => {
      setPropertyId(housing.id)
      setOpenUpdateModal(true);
    };

  return (
    <div>
      <div className="flex flex-col gap-30 pt-[90px] pb-[50px] justify-center justify-items-center ">
        <div className=" 2xl:px-36 xl:px-32 lg:px-28 md:px-10 sm:px-4 px-10 ">
          <div className="flex flex-row justify-items-start items-start ">
            <button
              onClick={ViewAddhousing}
              className="mr-2 rounded-full px-4 py-2  xl:w-56 xl:h-14 2xl:w-56 2xl:h-16 bg-gradient-to-r from-[#02b3bd] to-[#00868e] flex items-center gap-4 justify-center text-white text-md  "
            >
              Add New Property <FaPlus />
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
              <thead>
                <tr className="bg-gradient-to-r from-[#02b3bd] to-[#00868e] text-white h-14 text-md">
                  <th className="p-2 border border-[#ddd]">Index</th>
                  <th className="p-2 border border-[#ddd]">Property Name</th>
                  <th className="p-2 border border-[#ddd]">Address</th>
                  <th className="p-2 border border-[#ddd]">Monthly Rent</th>
                  <th className="p-2 border border-[#ddd]">Availability</th>
                  <th className="p-2 border border-[#ddd]">Room Type</th>
                  <th className="p-2 border border-[#ddd]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {HousingtList.map((housing: any, index) => (
                  <tr className="bg-[#f2f2f2] h-12 text-md" key={index}>
                    <td className="p-4 border border-[#ddd]">{housing?.id}</td>
                    <td className="p-2 border border-[#ddd]">{housing.title}</td>
                    <td className="p-2 border border-[#ddd]">
                      {housing.address}
                    </td>
                    <td className="p-2 border border-[#ddd]">
                      {housing.monthly_rent}
                    </td>
                    <td className="p-2 border border-[#ddd]">
                      {housing.availability}
                      {/* <img  className="w-1/2 h-1/2" src={housing.images} alt=""/> */}

                    </td>
                    <td className="p-2 border border-[#ddd]">{housing.type}</td>
                    <td className="p-2 border border-[#ddd]">
                      <div className="flex gap-5 justify-center items-center">
                        <div className="cursor-pointer text-lg text-[#02b1c0]">
                          <FaEdit onClick={() => updateProperty(housing)} />
                        </div>
                        <div className="cursor-pointer text-lg text-[#02b1c0]">
                          <FaEye onClick={() => viewProperty(housing)}
                         
                        />
                        </div>
                        <div className="cursor-pointer text-[#02b1c0]">
                          <FaTrash onClick={() => onDelete(housing)} />
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
      {openModal && <OpenViewModal setOpenModal={setOpenModal} propertyId={propertyId} />}
      {openUpdateModal && <OpenUpdateModal setOpenUpdateModal={setOpenUpdateModal} propertyId={propertyId} />}
    </div>
  );
}
