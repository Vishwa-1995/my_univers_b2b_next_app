"use client";

import Link from "next/link";
import React from "react";
import Health from "../../assests/offers/health.svg";
import Fasion from "../../assests/offers/fasion.svg";
import Electronic from "../../assests/offers/electronic.svg";
import Office from "../../assests/offers/office.svg";
import Sports from "../../assests/offers/sports.svg";
import Dining from "../../assests/offers/dining.svg";
import Jewellery from "../../assests/offers/jewellery.svg";
import Digital from "../../assests/offers/digital.svg";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function OffersCard() {
  const router = useRouter();
  const MoveHealth = () => {
    router.push("/health/voucher");
  };

  const MoveFashion = () => {
    router.push("/fashion/voucher");
  };

  const MoveElectronic = () => {
    router.push("/electronic/voucher");
  };
  const MoveDigital = () => {
    router.push("/digital/voucher");
  };
  const MoveSport = () => {
    router.push("/sports/voucher");
  };
  const MoveGifts = () => {
    router.push("/gifts/voucher");
  };
  const MoveOffice = () => {
    router.push("/office/voucher");
  };

  const MoveDining = () => {
    router.push("/dining/voucher");
  };


  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-blue-200 to-white">
      <div className="grid 2xl:grid-cols-6 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm-grid-cols-2 grid-cols-1 mx-auto">
        <div
          onClick={MoveHealth}
          className="cursor-pointer mx-auto bg-[#efefef] border rounded-[10px] h-[270px] w-[200px] flex flex-col items-center justify-center p-[10px] mt-32"
        >
          <Image src={Health} alt="Logo" className=" h-16 w-16" />
          <span className="text-center text-gray-500 text-[20px] pt-5">
            Health & Beauty
          </span>
        </div>
        <div
          onClick={MoveFashion}
          className="cursor-pointer mx-auto bg-[#efefef] border rounded-[10px] h-[270px] w-[200px] flex flex-col items-center justify-center p-[10px] mt-32"
        >
          <Image src={Fasion} alt="Logo" className=" h-16 w-16" />
          <span className="text-center text-gray-500 text-[20px] pt-5">
            Fasion
          </span>
        </div>
        <div
          onClick={MoveElectronic}
          className=" cursor-pointer mx-auto bg-[#efefef] border rounded-[10px] h-[270px] w-[200px] flex flex-col items-center justify-center p-[10px] mt-32"
        >
          <Image src={Electronic} alt="Logo" className=" h-16 w-16" />
          <span className="text-center text-gray-500 text-[20px] pt-5">
            Electronics
          </span>
        </div>
        <div
          onClick={MoveOffice}
          className="cursor-pointer mx-auto bg-[#efefef] border rounded-[10px] h-[270px] w-[200px] flex flex-col items-center justify-center p-[10px] mt-32"
        >
          <Image src={Office} alt="Logo" className=" h-16 w-16" />
          <span className="text-center text-gray-500 text-[20px] pt-5">
            Office, Books & Stationery
          </span>
        </div>
        <div className="cursor-pointer mx-auto bg-[#efefef] border rounded-[10px] h-[270px] w-[200px] flex flex-col items-center justify-center p-[10px] mt-32">
          <Image src={Sports} alt="Logo" className=" h-16 w-16" />
          <span className="text-center text-gray-500 text-[20px] pt-5">
            Sports, Hobies & Leisure
          </span>
        </div>
        <div
          onClick={MoveDining}
          className="mx-auto bg-[#efefef] border rounded-[10px] h-[270px] w-[200px] flex flex-col items-center justify-center p-[10px] mt-32"
        >
          <Image src={Dining} alt="Logo" className=" h-16 w-16" />
          <span className="text-center text-gray-500 text-[20px] pt-5">
            Dining
          </span>
        </div>
        <div
          onClick={MoveGifts}
          className="cursor-pointer mx-auto bg-[#efefef] border rounded-[10px] h-[270px] w-[200px] flex flex-col items-center justify-center p-[10px] mt-32"
        >
          <Image src={Jewellery} alt="Logo" className=" h-16 w-16" />
          <span className="text-center text-gray-500 text-[20px] pt-5">
            Jewellery & Gifts
          </span>
        </div>
        <div
          onClick={MoveDigital}
          className=" cursor-pointer mx-auto bg-[#efefef] border rounded-[10px] h-[270px] w-[200px] flex flex-col items-center justify-center p-[10px] mt-32"
        >
          <Image src={Digital} alt="Logo" className=" h-16 w-16" />
          <span className="text-center text-gray-500 text-[20px] pt-5">
            Digital
          </span>
        </div>
      </div>
    </div>
  );
}
{
  /* <section className=" bg-white border rounded-[20px] h-fit pt-[10px] pr-[10px]">
        <div className="flex flex-row">
        
          <div className="col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-3 2xl:col-span-2">
            
              <div className="mt-4 w-[80vw] max-w-[260px] h-[400px] bg-white box-shadow-md rounded-[20px] bg-cover bg-center relative">
                <div className="  h-[278.5px] w-full bg-[#EFEFEF] border border-none rounded-[10px] opacity-5 m-[10px] ">
                    <div className="cardText">
                      <Image
                        src={health}
                        className="h-[40.61px] w-[45.69px] rounded mx-auto block"
                        alt=""
                      />
                      <p className="mt-[10px] ">Health & beauty</p>
                    </div>
                  
                </div>
              </div>

        
          </div>
          <div className="col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-3 2xl:col-span-2">
            
              <div className="mt-4 w-[80vw] max-w-[260px] h-[400px] bg-white box-shadow-md rounded-[20px] bg-cover bg-center relative">
                <div className="  h-[278.5px] w-full bg-[#EFEFEF] border border-none rounded-[10px] opacity-5 m-[10px] ">
                    <div className="cardText">
                      <Image
                        src={health}
                        className="h-[40.61px] w-[45.69px] rounded mx-auto block"
                        alt=""
                      />
                      <p className="mt-[10px] ">Health & beauty</p>
                    </div>
                  
                </div>
              </div>

          
          </div>
          <div className="col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-3 2xl:col-span-2">
          
              <div className="mt-4 w-[80vw] max-w-[260px] h-[400px] bg-white box-shadow-md rounded-[20px] bg-cover bg-center relative">
                <div className="  h-[278.5px] w-full bg-[#EFEFEF] border border-none rounded-[10px] opacity-5 m-[10px] ">
                    <div className="cardText">
                      <Image
                        src={health}
                        className="h-[40.61px] w-[45.69px] rounded mx-auto block"
                        alt=""
                      />
                      <p className="mt-[10px] ">Health & beauty</p>
                    </div>
                  
                </div>
              </div>

          
          </div>
          <div className="col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-3 2xl:col-span-2">
           
              <div className="mt-4 w-[80vw] max-w-[260px] h-[400px] bg-white box-shadow-md rounded-[20px] bg-cover bg-center relative">
                <div className="  h-[278.5px] w-full bg-[#EFEFEF] border border-none rounded-[10px] opacity-5 m-[10px] ">
                    <div className="cardText">
                      <Image
                        src={health}
                        className="h-[40.61px] w-[45.69px] rounded mx-auto block"
                        alt=""
                      />
                      <p className="mt-[10px] ">Health & beauty</p>
                    </div>
                  
                </div>
              </div>

           
          </div>
          <div className="col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-3 2xl:col-span-2">
           
              <div className="mt-4 w-[80vw] max-w-[260px] h-[400px] bg-white box-shadow-md rounded-[20px] bg-cover bg-center relative">
                <div className="  h-[278.5px] w-full bg-[#EFEFEF] border border-none rounded-[10px] opacity-5 m-[10px] ">
                    <div className="cardText">
                      <Image
                        src={health}
                        className="h-[40.61px] w-[45.69px] rounded mx-auto block"
                        alt=""
                      />
                      <p className="mt-[10px] ">Health & beauty</p>
                    </div>
                  
                </div>
              </div>

            
          </div>
        </div>
      </section> */
}
