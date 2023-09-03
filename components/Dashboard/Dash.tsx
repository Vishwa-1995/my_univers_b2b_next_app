import React from "react";
import { Discount } from "react-iconly";
import { AiFillShop } from "react-icons/ai";
import {
    FaPlusCircle,
    FaHome,
    FaSuitcase,
    FaBirthdayCake,
    FaAd,
} from "react-icons/fa";
import Header from "../Header/header";

const Dash = () => {
    return (
        <div>
            <div className="flex flex-col items-center justify-center gap-10 my-10 ">
                <button>
                    <div className="flex flex-row ml-[700px] gap-3">
                        <FaPlusCircle className="text-blue-500 text-2xl" />
                        <div className="font text-blue-500">Add more ads options</div>
                    </div>
                </button>
                <div className="flex flex-row justify-center space-x-20">
                    <div className="w-72 h-40 border border-blue-400 rounded-lg p-4 text-center w-[432px] h-[163px]">
                        <div className="flex items-center justify-center space-x-2 my-10 gap-4">
                            <FaHome className="text-gray-400 text-2xl" />
                            <div className="font-semibold text-gray-400 text-2xl">
                                Housing
                            </div>
                        </div>
                    </div>
                    <div className="w-72 h-40 border border-blue-400 rounded-lg p-4 text-center w-[432px] h-[163px]">
                        <div className="flex items-center justify-center space-x-2 my-10 gap-4">
                            <FaSuitcase className="text-gray-400 text-2xl" />
                            <div className="font-semibold text-gray-400 text-2xl">
                                Careers
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row justify-center space-x-20">
                    <div className="w-72 h-40 border border-blue-400 rounded-lg p-4 text-center w-[432px] h-[163px]">
                        <div className="flex items-center justify-center space-x-2 my-10 gap-4">
                            <FaBirthdayCake className="text-gray-400 text-2xl" />
                            <div className="font-semibold text-gray-400 text-2xl">Events</div>
                        </div>
                    </div>
                    <div className="w-72 h-40 border border-blue-400 rounded-lg p-4 text-center w-[432px] h-[163px]">
                        <div className="flex items-center justify-center space-x-2 my-10 gap-4">
                            <AiFillShop className="text-gray-400 text-2xl" />
                            <div className="font-semibold text-gray-400 text-2xl">Offers</div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row justify-center space-x-20">
                    <div className="w-72 h-40 border border-blue-400 rounded-lg p-4 text-center w-[950px] h-[163px]">
                        <div className="flex items-center justify-center space-x-2 my-10 gap-4">
                            <FaAd className="text-gray-400 text-2xl" />
                            <div className="font-semibold text-gray-400 text-2xl">
                                Banner Ads
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dash;