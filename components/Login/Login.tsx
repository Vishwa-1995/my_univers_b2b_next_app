"use client";

import {useRouter} from 'next/navigation';
import React, {useState} from 'react'
import Image from 'next/image';
import Logo from '../../assests/Logo/AuthLogo.png'
import {useFormik} from "formik";
import * as Yup from 'yup';
import {AuthService} from "../../api/_services/auth-service";

export interface LoginValues {
    email: string;
    password: string;
}

export default function Login() {
    const router = useRouter()
    const forgetPasssword = () => {
    };
    const register = () => {
        router.push('/registerDashBoard')
    };

    const loginUser = () => {
        console.log(formik.values);
        AuthService.login(formik.values).then(
            response => {
                if (response.isSuccess) {
                    router.push('/dashbord');
                }
            }
        );
    };

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        onSubmit: loginUser,
        validationSchema: Yup.object().shape({
            email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
            password: Yup.string().max(255).required('Password is required').matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
                "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
            ),
        }),
    });

    return (
        <div className="h-full w-full flex flex-col items-center py-12 bg-gradient-to-r from-blue-200 to-white ">
            <Image src={Logo} alt="Logo" className="pb-12 pt-10"/>
            <div
                className="mt-4 w-[1083px] h-auto flex-shrink-0 flex flex-col bg-[#fff] border rounded-[18px] border-solid border-[#42f7cc] pt-[50px] pb-[50px] shadow-md">
                <div className="flex flex-col gap-[30px] mt-[40px] ">
                    <div className="flex flex-col justify-items-center px-[245px] ">
                        <div className="w-full">
                            <div
                                className=" text-black flex text-left font-montserrat text-[25px] font-semibold leading-tight h-[44.304px] mb-[20px]">
                                Login
                            </div>
                            <form
                                onSubmit={formik.handleSubmit}
                                className="flex flex-col item-center gap-2">
                                <div className="flex justify-center flex-col">
                                    <input
                                        className={`bg-[#FEFCFE] flex w-[588px] h-[84px] py-[14px] pr-[75px] pl-[20px] items-center gap-10 flex-shrink-0 rounded-[10px] border border-1 border-[#01B3BB] outline-none placeholder-rgba(30, 30, 30, 0.92) font-Inter text-[16px] font-normal placeholder:text-[16px] placeholder:font-[400] placeholder:font-inter ${
                                            formik.errors["email"]
                                                ? "border border-red-400 focus:border-red-400"
                                                : ""
                                        }\``}
                                        type="email"
                                        placeholder="Enter Your Email Address"
                                        name="email"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.errors["email"] && formik.touched["email"] && (
                                        <span className="text-xs text-red-400">{formik.errors["email"]}</span>
                                    )}
                                    <input
                                        className={`mt-5 bg-[#FEFCFE] flex w-[588px] h-[84px] py-[14px] pr-[75px] pl-[20px] items-center gap-10 flex-shrink-0 rounded-[10px] border border-1 border-[#01B3BB] outline-none placeholder-rgba(30, 30, 30, 0.92) font-Inter text-[16px] font-normal placeholder:text-[16px] placeholder:font-[400] placeholder:font-inter ${
                                            formik.errors["password"]
                                                ? "border border-red-400 focus:border-red-400"
                                                : ""
                                        }\``}
                                        type="password"
                                        placeholder="Enter Your Password"
                                        name="password"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.errors["password"] && formik.touched["password"] && (
                                        <span className="text-xs text-red-400">{formik.errors["password"]}</span>
                                    )}
                                </div>
                                <div className="flex flex-col items-center pt-8">
                                    <button
                                        className="w-[588px] h-[77.642px] flex-shrink-0 border rounded-[10px] bg-[#01B3BB] text-[#FEFCFE] font-montserrat font-semibold text-[18px] uppercase"
                                    >
                                        TAKE ME IN!
                                    </button>
                                    <div className="flex flex-col pt-8 ">
                                        <div className="w-[588px] flex flex-row justify-between">
                                            <div
                                                className=" text-black font-montserrat font-[600] text-[18px] leading-44.304">
                                                Don’t you have n account?
                                            </div>
                                            <div
                                                className=" text-[#01B3BB] font-montserrat font-[600] text-[18px] leading-44.304 cursor-pointer"
                                                onClick={forgetPasssword}>
                                                Forget Your Password?
                                            </div>
                                        </div>
                                        <div className="flex flex-row">
                                            <div
                                                className="text-[#01B3BB] font-montserrat text-[20px] font-[600] leading-[221.521%] cursor-pointer"
                                                onClick={register}>
                                                Register Here
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
