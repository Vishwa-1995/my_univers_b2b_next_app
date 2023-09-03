"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import baseUrl from "../utils/baseUrl";

interface PropertyData {
  title: string; // Add other properties as needed
  images: string;
}

export default function OpenViewModal({ setOpenModal, propertyId }: any) {
  const [data, setData] = useState<PropertyData | undefined>();
  const [mainImage, setMainImage] = useState();

  const handleclose = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/property/getOne/${propertyId}`
      );
      setData(response.data.data[0]);
      setMainImage(response.data.data[0].images[0]);
      console.log(response.data.data);
    } catch (error) {}
  };
  const handleClick = (image: any) => {
    setMainImage(image);
  };
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // const handleScroll = (direction: "left" | "right") => {
  //   if (direction === "left") {
  //     setCurrentImageIndex(Math.max(currentImageIndex - 1, 0));
  //   } else if (direction === "right") {
  //     setCurrentImageIndex(
  //       Math.min(currentImageIndex + 1, data?.images.length - 1)
  //     );
  //   }
  // };

  // const hideArrows = data?.images.length <= 3;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-slate-900 bg-opacity-50 ">
      <div className="pt-2 mx-2 flex gap-2 flex-col relative bg-white shadow-md rounded-md w-full lg:w-[1024px] h-[600px] overflow-y-auto ">
        <div className="flex justify-end px-2">
          <button
            onClick={handleclose}
            className="bg-[#c2c2d3] rounded-full w-8 h-8 flex justify-center items-center"
          >
            <IoClose className="text-white" />
          </button>
        </div>
        <div className=" bg-white rounded-md pb-5 px-[20px]">
          <div className="w-full mb-[1.875rem]">
            <h1 className=" capitalize text-[1.5rem] font-semibold">
              {data?.title}
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 w-full min-h-[600px] ">
            <div className="relative max-h-[579.2px] max-w-[466.66px] ">
              <div className="hover:cursor-pointer flex items-center justify-center px-12 ">
                <img width={250} height={300} src={mainImage} alt="mainImage" />
              </div>
              <div className="flex items-center justify-center mt-5 ">
                {/* <div
                  className={`flex items-center justify-center min-w-[40px] h-[40px] 
                  over:cursor-pointer ${hideArrows ? "hidden" : ""}`}
                  onClick={() => handleScroll("left")}
                >
                  <AiOutlineArrowLeft />
                </div> */}
                <div className="flex space-x-2 ">
                  {((data?.images as unknown as string[]) || [])
                    .slice(currentImageIndex, currentImageIndex + 3)
                    .map((image, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-center w-[67px] h-[67px] border border-gray-400 hover:cursor-pointer"
                      >
                        <img
                          width={67}
                          height={67}
                          src={image}
                          alt={`Image ${index}`}
                          onClick={() => handleClick(image)}
                        />
                      </div>
                    ))}
                </div>
                {/* <div
                  className={`
                  flex items-center justify-center min-w-[40px] h-[40px] 
                  over:cursor-pointer ${hideArrows ? "hidden" : ""}`}
                  onClick={() => handleScroll("right")}
                >
                  <AiOutlineArrowRight />
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
