"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaTrash, FaEdit, FaEye} from "react-icons/fa";
import baseUrl from "../../utils/baseUrl";


const ViewGiftsProducts = () => {

    const router = useRouter();
  const [GiftsList, setGiftsList] = useState([]);
  const [GiftId, setGiftId] = useState();


  useEffect(() => {
    fetchData();
  }, []); 


  const fetchData = async () => {
    try {
      const response = await fetch(`${baseUrl}/offer/fetch_gifts`, {
        method: "GET",
      });
      const data = await response.json();
      setGiftsList(data.data);

    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div>
      <div className="flex flex-col  pt-[60px] pb-[50px] justify-center justify-items-center ">
        <div className=" 2xl:px-36 xl:px-32 lg:px-28 md:px-10 sm:px-4 px-10 ">
          
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
                  <th className="p-2 border border-[#ddd]">Gifts Offer Name</th>
                  <th className="p-2 border border-[#ddd]">Product Name</th>
                  {/* <th className="p-2 border border-[#ddd]">Product type</th> */}
                  <th className="p-2 border border-[#ddd]">Brands</th>
                  <th className="p-2 border border-[#ddd]">Product type</th>
                  <th className="p-2 border border-[#ddd]">Price</th>
                  <th className="p-2 border border-[#ddd]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {GiftsList.map((offer: any, index) => (
                  <tr className="bg-[#f2f2f2] h-12 text-md" key={index}>
                    <td className="p-4 border border-[#ddd]">{offer?.id}</td>
                    <td className="p-2 border border-[#ddd]">{offer.offer_name}</td>
                    <td className="p-2 border border-[#ddd]">
                      {offer.product_name}
                    </td>
                    
                    <td className="p-2 border border-[#ddd]">
                      {offer.brands}
                    </td>
                    <td className="p-2 border border-[#ddd]">
                      {offer.type}
                    </td>
                    <td className="p-2 border border-[#ddd]">{offer.price}</td>
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

export default ViewGiftsProducts