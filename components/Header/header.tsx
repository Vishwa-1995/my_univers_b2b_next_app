"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Image from "next/image";
import Logo from "../../../../assests/Logo/AuthLogo.png";
import { FaCircle } from "react-icons/fa";
import Dashboard from "../Dashboard/Dashboard";
import Dash from "../Dashboard/Dash";

export default function Header() {
    const [selectedItem, setSelectedItem] = useState(0);

    const handleSelectionClick = (index: any) => {
        console.log(index);
        setSelectedItem(index);
    };

    return (
        <div className="">
            <div className="flex justify-between items-center border-b border-gray-300 mt-12 pb-12">
                <div className="mx-10">
                    <Image src={Logo} alt="Logo" width={145} height={52} />
                </div>
                <div className="flex items-center gap-2 mx-10">
                    <div> Status:</div>
                    <div>
                        {" "}
                        <FaCircle className=" text-yellow-500" size={16} />
                    </div>

                    <div className="text-[#A8A8A8]">Verifying</div>
                </div>
            </div>
            <div className="w-full my-10 flex justify-center items-center gap-10">
                {["DASHBOARD", "Your PACKAGES", "ACCOUNT DETAILS"].map(
                    (item, index) => (
                        <button>
                            <div
                                key={index}
                                className={`text-[#A8A8A8] text-center font-semibold text-lg w-56 ${
                                    selectedItem === index ? "selected" : ""
                                }`}
                                onClick={() => handleSelectionClick(index)}
                            >
                                {item}
                                <div
                                    className={`w-28 h-1 ml-14 ${
                                        selectedItem === index ? "bg-blue-500" : "bg-gray-300"
                                    }`}
                                ></div>
                            </div>
                        </button>
                    )
                )}
            </div>
            <div>
                {selectedItem == 0 ? (
                    <Dash />
                ) : selectedItem == 1 ? (
                    <Dashboard />
                ) : (
                    <Dash />
                )}
            </div>
        </div>
    );
}