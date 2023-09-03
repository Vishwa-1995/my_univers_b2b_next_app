"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaTrash, FaEdit, FaEye, FaPlus } from "react-icons/fa";
import axios from "axios";
import Swal from "sweetalert2";
import baseUrl from "../../utils/baseUrl";

export default function ViewDiningProduct() {
  
  const router = useRouter();
  const [FashionList, setFashionList] = useState([]);
  const [FashionId, setFashionId] = useState();


  const onDelete = (offer:any) => {
  //   console.log(offer.id)
  //   Swal.fire({
  //     title: "Are you sure you want to confirm delete? ",
  //     showConfirmButton: true,
  //     showDenyButton: true,
  //     confirmButtonText: "Proceed",
  //     denyButtonText: "Cancel",
  //     confirmButtonColor: "#1fc191",
  //   }).then((result) => {
  //     if (result.isConfirmed) {   
  //       axios
  //         .delete(`${baseUrl}/offer/delete_fashion/${offer.id}`)
  //         .then(() => {
  //           Swal.fire({
  //             title: "Offer successfully Deleted! ",
  //             icon: "success",
  //             confirmButtonColor: "#207159",
  //           }).then((res) => {
  //             if (res.isConfirmed) {
  //               location.reload()
  //             }
  //           });
  //         })
  //         .catch((err) => {
  //           Swal.fire({
  //             title: "Error occured ! ",
  //             text: `${err.response.data.error}`,
  //             icon: "error",
  //             confirmButtonColor: "#207159",
  //           });
  //         });
  //     } 
  //   });
  };

  useEffect(() => {
    fetchData();
  }, []); 


  const fetchData = async () => {
    try {
      const response = await fetch(`${baseUrl}/offer/fetch_dining`, {
        method: "GET",
      });
      const data = await response.json();
      if(data.data.length > 0){
        setFashionList(data.data);

      }

    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div>
      <div className="flex flex-col  pt-[60px] pb-[50px] justify-center justify-items-center ">
        <div className=" 2xl:px-36 xl:px-32 lg:px-28 md:px-10 sm:px-4 px-10 ">
          <div className="flex flex-row justify-items-start items-start ">
            <button
            //   onClick={ViewHealthAndBeauty}
              className="mr-2 rounded-full px-4 py-2  xl:w-56 xl:h-14 2xl:w-56 2xl:h-16 bg-gradient-to-r from-[#02b3bd] to-[#00868e] flex items-center gap-4 justify-center text-white text-md  "
            >
              Add New Dining <FaPlus />
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
                  <th className="p-2 border border-[#ddd]">Offer Name</th>
                  <th className="p-2 border border-[#ddd]">product_name</th>
                  <th className="p-2 border border-[#ddd]">Price</th>
                  <th className="p-2 border border-[#ddd]">address</th>
                  <th className="p-2 border border-[#ddd]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {FashionList.map((offer: any, index) => (
                  <tr className="bg-[#f2f2f2] h-12 text-md" key={index}>
                    <td className="p-4 border border-[#ddd]">{offer?.id}</td>
                    <td className="p-2 border border-[#ddd]">{offer.offer_name}</td>
                    <td className="p-2 border border-[#ddd]">
                      {offer.product_name}
                    </td>
                    <td className="p-2 border border-[#ddd]">
                      {offer.price}
                    </td>
                    <td className="p-2 border border-[#ddd]">
                      {offer.address}
                    </td>
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
                            onClick ={() => onDelete(offer)}
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
