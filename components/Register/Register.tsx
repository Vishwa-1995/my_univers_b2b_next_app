"use client";
import {useState} from "react";
import {useRouter} from "next/navigation";
import Image from "next/image";
import Logo from "../../assests/Logo/AuthLogo.png" ;
import {
    ChevronDown,
    Discount,
    Home,
    Plus,
    TicketStar,
    Work,
    Document,
} from "react-iconly";
import bulleticon from "../../assests/icons/image15.png";
import bulleticon1 from "../../assests/icons/image19.png";
import axios from "axios";
import {Formik, useFormik} from "formik";
import * as Yup from "yup";
import baseUrl from "../utils/baseUrl";
import OtpInput from "../Shared/otp-input";
import {IMAGE_SIZE, IMAGE_SUPPORTED_FORMATS} from "../utils/constant";
import FileUpload from "../utils/fileUpload/file-upload.component";
// import { useRouter } from "next/router";
const Register = () => {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

    const [currentStep, setCurrentStep] = useState(1);
    const totalSteps = 5;
    // const router = useRouter()
    const handleNextStep = () => {
        setCurrentStep(currentStep + 1);
    };

    const SaveUser = async () => {
        const payload = { };
        try {
            const response = await axios.post(`${baseUrl}/user/insert`, {
                payload,
            });
            console.log({response});
            if (response) {
                // router.push('/successPage')
            }
        } catch (error) {
            console.log({error});
        }
    };

    const toggleDropdown = () => {
        // setIsOpen(!isOpen);
    };

    const login = () => {
        router.push('/login');
    }

    const dash = () => {
        router.push('/dashbord');
    }

    // Start Register User Formik

    const registerUser = () => {
        console.log(registerFormik.values);
        handleNextStep();
    };

    const registerFormik = useFormik({
        initialValues: {
            email: "",
        },
        onSubmit: registerUser,
        validationSchema: Yup.object().shape({
            email: Yup.string().email('Must be a valid email').max(255, "character count exceeded").required('Email is required'),
        }),
    });

    // End Register User Formik

    // Start Email Verification Formik

    const [otp, setOtp] = useState('');

    // End Email Verification Formik

    // Start Profile Information Formik

    const addProfileInfo = () => {
        console.log(profileInfoFormik.values);
        handleNextStep();
    };

    const profileInfoFormik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            mobile: "",
            addressLine1: "",
            addressLine2: "",
            state: "",
            postalCode: "",
            country: ""
        },
        onSubmit: addProfileInfo,
        validationSchema: Yup.object().shape({
            firstName: Yup.string().min(3, "minimum character count should be atleast 3").required('Please Enter your First Name'),
            lastName: Yup.string().min(3, "minimum character count should be atleast 3").required('Please Enter your Last Name'),
            mobile: Yup.string().required('Please Enter your Phone Number'),
            addressLine1: Yup.string().min(10, "minimum character count should be atleast 10").notRequired(),
            addressLine2: Yup.string().min(10, "minimum character count should be atleast 10").notRequired(),
            state: Yup.string().notRequired(),
            postalCode: Yup.string().notRequired(),
            country: Yup.string().required('Please Select your Country')
        }),
    });

    // End Profile Information User Formik

    // Start Identity Verification Formik

    const verifyIdentity = () => {
        handleNextStep();
    };

    const VERIFY_IDENTITY_INITIAL_FORM_STATE = {
        frontPage: [],
        backPage: [],
    }

    const VERIFY_IDENTITY_FORM_VALIDATION = Yup.object().shape({
        frontPage: Yup.mixed()
            .nullable()
            .required('Please Upload Front page')
            .test(
                'FILE_SIZE',
                'File sizes must be between 10KB and 2MB',
                (value: any) => {
                    return value?.reduce(
                        (accumulator: any, curValue: any) => {
                            return accumulator + curValue.size
                        }, 0);
                }
            )
            .test(
                "FILE_SIZE",
                'File sizes must be between 10KB and 2MB',
                (value: any) => {
                    return value?.reduce(
                        (accumulator: any, curValue: any) => {
                            return accumulator + curValue.size
                        }, 0) <= IMAGE_SIZE;
                }
            )
            .test(
                "FILE_FORMAT",
                'allowed only jpg/jpeg/png format',
                (value: any) =>
                    value?.filter((obj: any) => IMAGE_SUPPORTED_FORMATS.includes(`${obj?.type},`)).length
            ),
        backPage: Yup.mixed()
            .nullable()
            .required('Please Upload Back page')
            .test(
                'FILE_SIZE',
                'File sizes must be between 10KB and 2MB',
                (value: any) => {
                    return value?.reduce(
                        (accumulator: any, curValue: any) => {
                            return accumulator + curValue.size
                        }, 0);
                }
            )
            .test(
                "FILE_SIZE",
                'File sizes must be between 10KB and 2MB',
                (value: any) => {
                    return value?.reduce(
                        (accumulator: any, curValue: any) => {
                            return accumulator + curValue.size
                        }, 0) <= IMAGE_SIZE;
                }
            )
            .test(
                "FILE_FORMAT",
                'allowed only jpg/jpeg/png format',
                (value: any) =>
                    value?.filter((obj: any) => IMAGE_SUPPORTED_FORMATS.includes(`${obj?.type},`)).length
            ),
    });

    // End Identity Verification Formik

    // Start Pick Your Plan Formik

    const pickYourPlan = () => {
        dash();
    };

    const pickYourPlanFormik = useFormik({
        initialValues: {
            housingPlan: true,
            eventsPlan: false,
            careersPlan: false,
            offersPlan: false,
            adsPlan: false,
        },
        onSubmit: pickYourPlan,
        validationSchema: Yup.object().shape({
            housingPlan: Yup.boolean(),
            eventsPlan: Yup.boolean(),
            careersPlan: Yup.boolean(),
            offersPlan: Yup.boolean(),
            adsPlan: Yup.boolean(),
        }),
    });

    // End Pick Your Plan Formik

    return (
        <div className="h-full w-full flex flex-col items-center py-12 bg-gradient-to-r from-blue-200 to-white ">
            <Image src={Logo} alt="Logo" className="pb-12 pt-10"/>
            <div
                className="mt-4 w-[1083px] h-auto flex-shrink-0 flex flex-col bg-[#fff] border rounded-[18px] border-solid border-[#42f7cc] pt-[50px] pb-[50px] shadow-md">
                <div className="flex justify-center">
                    <div className="flex justify-between  mb-4 w-[358px]">
                        {Array.from(Array(totalSteps), (_, index) => (
                            <div
                                key={index}
                                className={`w-[51px] h-[51px] flex justify-center items-center rounded-full border-2 ${
                                    index < currentStep
                                        ? "border-[#01B3BB] boarde-500 bg-[#01B3BB] border-500"
                                        : "border-[#D9D9D9] border-300 bg-[#D9D9D9]"
                                }`}
                            >
                                {index < currentStep ? (
                                    <span className="text-white">{index + 1}</span>
                                ) : (
                                    <span className="text-gray-500">{index + 1}</span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/*Registration*/}
                {currentStep === 1 && (
                    <div className="flex flex-col gap-[30px] mt-[40px] ">
                        <div className="flex flex-col justify-items-center px-[245px] ">
                            <div className="w-full">
                                <div
                                    className=" text-black flex text-left font-montserrat text-[25px] font-semibold leading-tight h-[44.304px] mb-[20px]">
                                    Register
                                </div>
                                <form
                                    onSubmit={registerFormik.handleSubmit}
                                    className="flex flex-col item-center gap-2">
                                    <div className="flex justify-center flex-col">
                                        <input
                                            className={`flex w-[588px] h-[84px] py-[14px] pr-[75px] pl-[20px] items-center gap-10 flex-shrink-0 rounded-[10px] border border-1 border-[#01B3BB] outline-none placeholder-rgba(30, 30, 30, 0.92) font-Inter text-[16px] font-normal placeholder:text-[16px] placeholder:font-[400] placeholder:font-inter ${
                                                registerFormik.errors["email"]
                                                    ? "border border-red-400 focus:border-red-400"
                                                    : ""
                                            }`}
                                            type="email"
                                            placeholder="Enter Your Email Address"
                                            name="email"
                                            onChange={registerFormik.handleChange}
                                            onBlur={registerFormik.handleBlur}
                                        />
                                        {registerFormik.errors["email"] && registerFormik.touched["email"] && (
                                            <span
                                                className="text-xs text-red-400">{registerFormik.errors["email"]}</span>
                                        )}
                                    </div>
                                    <div className="flex flex-col items-center pt-8">
                                        <button
                                            className="w-[588px] h-[77.642px] flex-shrink-0 border rounded-[10px] bg-[#01B3BB] text-[#FEFCFE] font-montserrat font-semibold text-[18px] uppercase"
                                        >
                                            Continue
                                        </button>
                                        <div className="flex flex-col items-start pt-8">
                                            <div className="w-[588px] flex flex-row justify-between">
                        <span className="w-[309px] text-black font-montserrat font-[600] text-[18px] leading-44.304">
                          Already have an account?
                        </span>
                                            </div>
                                            <div
                                                className="text-[#01B3BB] font-montserrat text-[20px] font-[600] leading-[221.521%] cursor-pointer"
                                                onClick={login}>
                                                Login Here
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )}

                {/*Email Verification*/}
                {currentStep === 2 && (
                    <div className="flex flex-col  mt-[40px]  items-center">
                        <div className="flex flex-col ">
                            <div
                                className="flex flex-row items-center justify-center text-black font-montserrat, text-[22px] font-[600] ">
                                Verify Your Email
                            </div>
                            <div
                                className="text-[#707070] opacity-50 text-[15px] font-sans leading-6 font-[400] flex flex-row items-center justify-items-center">
                                we have sent you a code into your email ****@****.com please
                                type it below and confirm
                            </div>

                            <div className="flex flex-row items-center justify-center pt-8">
                                <OtpInput
                                    shouldAutoFocus
                                    value={otp}
                                    onChange={setOtp}
                                    numInputs={6}
                                    inputType='text'
                                    renderSeparator={<span style={{padding: 5}}> - </span>}
                                    renderInput={(props) => <input {...props} style={{
                                        width: '4.5em',
                                        height: '4.5em',
                                        textAlign: 'center',
                                        display: 'inline-block',
                                        border: '1px solid #01B3BB',
                                        borderRadius: '10px',
                                        boxSizing: 'border-box'
                                    }}/>}
                                />
                            </div>
                            <div className="flex flex-col pt-8 items-center">
                                <button
                                    className="w-[588px] h-[77.642px] flex-shrink-0 border rounded-[10px] bg-[#01B3BB] text-[#FEFCFE] font-montserrat font-semibold text-[18px] uppercase"
                                    disabled={otp.trim() === ''}
                                    onClick={handleNextStep}
                                >
                                    Continue
                                </button>
                                <div className="login-bottom-content flex flex-col items-start">
                                    <div className="w-[588px] flex flex-row justify-between">
                      <span
                          className="w-[309px] text-black font-montserrat text-[18px] font-semibold leading-[44.304px]">
                        Don’t receive code?
                      </span>
                                    </div>
                                    <div
                                        className="text-[#01B3BB] font-montserrat text-lg font-semibold leading-[221.521%]">
                                        Resend Code
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {currentStep === 3 && (
                    <div className="flex flex-col items-center">
                        <form
                            onSubmit={profileInfoFormik.handleSubmit}
                            className="flex flex-col item-center gap-2">
                            <div className="flex flex-col ">
                                <div className="flex flex-row  text-black font-montserrat, text-[22px] font-[600] ">
                                    Profile Information
                                </div>
                                <div className="flex flex-col items-center gap-5 mt-5">
                                    <div className="flex flex-row gap-4 items-center justify-between">
                                        <div className="flex justify-center flex-col">
                                            <input
                                                className={`w-[285px] h-[50px] flex items-center rounded-[10px] border border-[#01B3BB] pt-[14px] pr-[75px] pb-[14px] pl-[20px] placeholder-rgba(30, 30, 30, 0.7) placeholder:font-inter placeholder:text-[12px] font-[400]  ${
                                                    profileInfoFormik.errors["firstName"]
                                                        ? "border border-red-400 focus:border-red-400"
                                                        : ""
                                                }`}
                                                type="text"
                                                placeholder="Enter Your First Name"
                                                name="firstName"
                                                onChange={profileInfoFormik.handleChange}
                                                onBlur={profileInfoFormik.handleBlur}
                                            />
                                            {profileInfoFormik.errors["firstName"] && profileInfoFormik.touched["firstName"] && (
                                                <span
                                                    className="text-xs text-red-400">{profileInfoFormik.errors["firstName"]}</span>
                                            )}
                                        </div>
                                        <div className="flex justify-center flex-col">
                                            <input
                                                className={`w-[285px] h-[50px] flex items-center rounded-[10px] border border-[#01B3BB] pt-[14px] pr-[75px] pb-[14px] pl-[20px] placeholder-rgba(30, 30, 30, 0.7) placeholder:font-inter placeholder:text-[12px] font-[400]  ${
                                                    profileInfoFormik.errors["lastName"]
                                                        ? "border border-red-400 focus:border-red-400"
                                                        : ""
                                                }`}
                                                type="text"
                                                placeholder="Enter Your Last Name"
                                                name="lastName"
                                                onChange={profileInfoFormik.handleChange}
                                                onBlur={profileInfoFormik.handleBlur}
                                            />
                                            {profileInfoFormik.errors["lastName"] && profileInfoFormik.touched["lastName"] && (
                                                <span
                                                    className="text-xs text-red-400">{profileInfoFormik.errors["lastName"]}</span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex justify-center flex-col">
                                        <input
                                            className={`w-[588px] h-[50px] flex items-center rounded-[10px] border border-[#01B3BB] pt-[14px] pr-[75px] pb-[14px] pl-[20px] placeholder-[#707070] text-sm font-inter  placeholder:font-inter placeholder:text-[12px] font-[400] ${
                                                profileInfoFormik.errors["mobile"]
                                                    ? "border border-red-400 focus:border-red-400"
                                                    : ""
                                            }`}
                                            type="text"
                                            placeholder="Your Phone Number"
                                            name="mobile"
                                            onChange={profileInfoFormik.handleChange}
                                            onBlur={profileInfoFormik.handleBlur}
                                        />
                                        {profileInfoFormik.errors["mobile"] && profileInfoFormik.touched["mobile"] && (
                                            <span
                                                className="text-xs text-red-400">{profileInfoFormik.errors["mobile"]}</span>
                                        )}
                                    </div>
                                    <div className="flex flex-row gap-4 items-center justify-between">
                                        <div className="flex justify-center flex-col">
                                            <input
                                                className={`w-[285px] h-[50px] flex items-center rounded-[10px] border border-[#01B3BB] pt-[14px] pr-[75px] pb-[14px] pl-[20px] placeholder-rgba(30, 30, 30, 0.7) placeholder:font-inter placeholder:text-[12px] font-[400] ${
                                                    profileInfoFormik.errors["addressLine1"]
                                                        ? "border border-red-400 focus:border-red-400"
                                                        : ""
                                                }`}
                                                type="text"
                                                placeholder="Address Line 1"
                                                name="addressLine1"
                                                onChange={profileInfoFormik.handleChange}
                                                onBlur={profileInfoFormik.handleBlur}
                                            />
                                            {profileInfoFormik.errors["addressLine1"] && profileInfoFormik.touched["addressLine1"] && (
                                                <span
                                                    className="text-xs text-red-400">{profileInfoFormik.errors["addressLine1"]}</span>
                                            )}
                                        </div>
                                        <div className="flex justify-center flex-col">
                                            <input
                                                className={`w-[285px] h-[50px] flex items-center rounded-[10px] border border-[#01B3BB] pt-[14px] pr-[75px] pb-[14px] pl-[20px] placeholder-rgba(30, 30, 30, 0.7) placeholder:font-inter placeholder:text-[12px] font-[400] ${
                                                    profileInfoFormik.errors["addressLine2"]
                                                        ? "border border-red-400 focus:border-red-400"
                                                        : ""
                                                }`}
                                                type="text"
                                                placeholder="Address Line 2"
                                                name="addressLine2"
                                                onChange={profileInfoFormik.handleChange}
                                                onBlur={profileInfoFormik.handleBlur}
                                            />
                                            {profileInfoFormik.errors["addressLine2"] && profileInfoFormik.touched["addressLine2"] && (
                                                <span
                                                    className="text-xs text-red-400">{profileInfoFormik.errors["addressLine2"]}</span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex flex-row gap-4 items-center justify-between">
                                        <div className="flex justify-center flex-col">
                                            <input
                                                className={`w-[285px] h-[50px] flex items-center rounded-[10px] border border-[#01B3BB] pt-[14px] pr-[75px] pb-[14px] pl-[20px] placeholder-rgba(30, 30, 30, 0.7) placeholder:font-inter placeholder:text-[12px] font-[400] ${
                                                    profileInfoFormik.errors["state"]
                                                        ? "border border-red-400 focus:border-red-400"
                                                        : ""
                                                }`}
                                                type="text"
                                                placeholder="State"
                                                name="state"
                                                onChange={profileInfoFormik.handleChange}
                                                onBlur={profileInfoFormik.handleBlur}
                                            />
                                            {profileInfoFormik.errors["state"] && profileInfoFormik.touched["state"] && (
                                                <span
                                                    className="text-xs text-red-400">{profileInfoFormik.errors["state"]}</span>
                                            )}
                                        </div>
                                        <div className="flex justify-center flex-col">
                                            <input
                                                className={`w-[285px] h-[50px] flex items-center rounded-[10px] border border-[#01B3BB] pt-[14px] pr-[75px] pb-[14px] pl-[20px] placeholder-rgba(30, 30, 30, 0.7) placeholder:font-inter placeholder:text-[12px] font-[400] ${
                                                    profileInfoFormik.errors["postalCode"]
                                                        ? "border border-red-400 focus:border-red-400"
                                                        : ""
                                                }`}
                                                type="text"
                                                placeholder="Postal Code"
                                                name="postalCode"
                                                onChange={profileInfoFormik.handleChange}
                                                onBlur={profileInfoFormik.handleBlur}
                                            />
                                            {profileInfoFormik.errors["postalCode"] && profileInfoFormik.touched["postalCode"] && (
                                                <span
                                                    className="text-xs text-red-400">{profileInfoFormik.errors["postalCode"]}</span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex justify-center flex-col">
                                        <input
                                            className={`w-[588px] h-[50px] flex items-center rounded-[10px] border border-[#01B3BB] pt-[14px] pr-[75px] pb-[14px] pl-[20px] placeholder-[#707070] text-sm font-inter  placeholder:font-inter placeholder:text-[12px] font-[400] ${
                                                profileInfoFormik.errors["country"]
                                                    ? "border border-red-400 focus:border-red-400"
                                                    : ""
                                            }`}
                                            type="text"
                                            placeholder="Country"
                                            name="country"
                                            onChange={profileInfoFormik.handleChange}
                                            onBlur={profileInfoFormik.handleBlur}
                                        />
                                        {profileInfoFormik.errors["country"] && profileInfoFormik.touched["country"] && (
                                            <span
                                                className="text-xs text-red-400">{profileInfoFormik.errors["country"]}</span>
                                        )}
                                    </div>
                                    {/*<CountrySelect/>*/}
                                    {/*<CountrySelect*/}
                                    {/*    option={({cca2, flag, name, code}) => (*/}
                                    {/*        <option value={code} key={cca2}>*/}
                                    {/*            {`${flag} +${code}`}*/}
                                    {/*        </option>*/}
                                    {/*    )}*/}
                                    {/*/>*/}
                                </div>
                                <div className="flex flex-col pt-5 items-center">
                                    <button
                                        className="w-[588px] h-[67.19px] flex-shrink-0 border rounded-[10px] bg-[#01B3BB] text-[#FEFCFE] font-montserrat font-semibold text-[18px] uppercase"
                                    >
                                        Continue
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                )}

                {currentStep === 4 && (
                    <div className="flex flex-col items-center">
                        <Formik
                            initialValues={{
                                ...VERIFY_IDENTITY_INITIAL_FORM_STATE,
                            }}
                            validationSchema={VERIFY_IDENTITY_FORM_VALIDATION}
                            onSubmit={(values: any) => {
                                console.log(values);
                                handleNextStep();
                            }}
                        >
                            {({
                                  errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values
                              }: any) => (
                                <form
                                    noValidate onSubmit={handleSubmit}
                                    className="flex flex-col item-center gap-2">
                                    <div className="flex flex-col ">
                                        <div
                                            className="flex flex-row  text-black font-montserrat, text-[22px] font-[600] ">
                                            Identify Verification
                                        </div>
                                        <div
                                            className="flex flex-row  text-black font-montserrat, text-[20px] font-[400] ">
                                            Upload image of Id card
                                        </div>

                                        <div className="flex flex-col pt-5">
                                            <div
                                                className="flex flex-row items-center gap-5 justify-start text-[#B4B4B4] text-[12px] font-semibold leading-tight">
                                                <div
                                                    className="flex flex-row items-center gap-5 justify-start text-[#B4B4B4] text-[12px] font-semibold leading-[26.25px] w-[350px]">
                                                    <Image src={bulleticon} alt="Logo" width={14}/>
                                                    Government - issued
                                                </div>
                                                <div
                                                    className="flex flex-row items-center gap-5 justify-start text-[#B4B4B4] text-[12px] font-semibold leading-262.5">
                                                    <Image src={bulleticon1} alt="Logo" width={12}/>
                                                    No edited or expired documents
                                                </div>
                                            </div>
                                            <div
                                                className="flex flex-row items-center gap-5 justify-start text-[#B4B4B4] text-[12px] font-semibold leading-tight">
                                                <div
                                                    className="flex flex-row items-center gap-5 justify-start [#B4B4B4] text-[12px] font-semibold leading-[26.25px] w-[350px]">
                                                    <Image src={bulleticon} alt="Logo" width={14}/>
                                                    Original full sized, unedited documents
                                                </div>
                                                <div
                                                    className="flex flex-row items-center gap-5 justify-start text-[#B4B4B4] text-[12px] font-semibold leading-262.5">
                                                    <Image src={bulleticon1} alt="Logo" width={12}/>
                                                    No black and white images
                                                </div>
                                            </div>
                                            <div
                                                className="flex flex-row items-center gap-5 justify-start text-[#B4B4B4] text-[12px] font-semibold leading-tight">
                                                <div
                                                    className="flex flex-row items-center gap-5 justify-start [#B4B4B4] text-[12px] font-semibold leading-[26.25px] w-[350px]">
                                                    <Image src={bulleticon} alt="Logo" width={14}/>
                                                    Place documents against a single coloured background
                                                </div>
                                            </div>
                                            <div
                                                className="flex flex-row items-center gap-5 justify-start text-[#B4B4B4] text-[12px] font-semibold leading-tight">
                                                <div
                                                    className="flex flex-row items-center gap-5 justify-start [#B4B4B4] text-[12px] font-semibold leading-[26.25px] w-[350px]">
                                                    <Image src={bulleticon} alt="Logo" width={14}/>
                                                    Readable, well lit coloured images
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            className="text-[#959595] font-[600] text-[15px] pt-5 leading-6"
                                            style={{paddingTop: "10px"}}
                                        >
                                            File sizes must be between 10KB and 2MB in jpg/jpeg/png
                                            format.
                                        </div>
                                        <div
                                            className="flex flex-col items-start pt-5"
                                            style={{paddingTop: "10px"}}
                                        >
                                            <div className="flex flex-row items-start">
                                                <div
                                                    className="w-[400px] flex-shrink-0 border border-[#DEDEDE] bg-[#F9F9F9] flex flex-col items-center justify-center text-[#B4B4B4] text-sm font-semibold leading-5">
                                                    <FileUpload
                                                        accept=".jpg,.png,.jpeg"
                                                        label='Upload Front page'
                                                        maxFileSizeInBytes={IMAGE_SIZE}
                                                        name="frontPage"
                                                    />
                                                </div>
                                                <div
                                                    className="w-[400px] flex-shrink-0 border border-[#DEDEDE] bg-[#F9F9F9] flex flex-col items-center justify-center text-[#B4B4B4] text-sm font-semibold leading-5">
                                                    <FileUpload
                                                        accept=".jpg,.png,.jpeg"
                                                        label='Upload Back page'
                                                        maxFileSizeInBytes={IMAGE_SIZE}
                                                        name="backPage"
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex flex-col pt-5 items-center justify-center w-full">
                                                <div className="text-[#878686] text-[9px] font-[400] leading-tight ">
                                                    This information is used for personal verification only, and
                                                    is kept private and confidential by MyUnivers.com
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col pt-5 items-center">
                                            <button
                                                className="w-[588px] h-[67.19px] flex-shrink-0 border rounded-[10px] bg-[#01B3BB] text-[#FEFCFE] font-montserrat font-semibold text-[18px] uppercase"
                                                type="submit"
                                            >
                                                Continue
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            )}
                        </Formik>
                    </div>
                )}
                {currentStep === 5 && (
                    <div>
                        <form
                            onSubmit={pickYourPlanFormik.handleSubmit}
                            className="flex flex-col item-center gap-2">
                            <div className="flex flex-row justify-between  pt-10 px-24">
                                <div className="flex flex-col items-start  ml-10 w-[400px]">
                                    <div
                                        className="font-montserrat text-[20px] font-semibold leading-44 tracking-normal text-right">
                                        Pick Your Plan
                                    </div>
                                    <div
                                        className=" text-[#707070] text-[12px] font-normal w-[400px] h-[79px] flex-shrink-0 leading-5 pt-[8px]">
                                        Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit
                                        amet, consectetur Lorem ipsum dolor sit amet, consectetur
                                    </div>
                                    <div
                                        className="font-montserrat text-[20px] font-semibold leading-44 tracking-normal text-right">
                                        FAQs
                                    </div>
                                    <div
                                        className=" flex  justify-between text-[#707070] text-[12px] font[700] w-[400px] pt-[8px] pb-[2px] flex-shrink-0">
                                        <div>Lorem ipsum dolor sit amet,</div>
                                        <Plus set="curved" primaryColor="gray" size={20}/>
                                    </div>

                                    <div
                                        className=" flex  justify-between text-[#707070] text-[12px] font[700] w-[400px] pt-[8px] pb-[2px] flex-shrink-0">
                                        <div>Lorem ipsum dolor sit amet,</div>
                                        <Plus set="curved" primaryColor="gray" size={20}/>
                                    </div>

                                    <div
                                        className=" flex  justify-between text-[#707070] text-[12px] font[700] w-[400px] pt-[8px] pb-[2px] flex-shrink-0">
                                        <div>Lorem ipsum dolor sit amet,</div>
                                        <Plus set="curved" primaryColor="gray" size={20}/>
                                    </div>

                                    <div
                                        className=" flex  justify-between text-[#707070] text-[12px] font[700] w-[400px] pt-[8px] pb-[2px] flex-shrink-0">
                                        <div>Lorem ipsum dolor sit amet,</div>
                                        <Plus set="curved" primaryColor="gray" size={20}/>
                                    </div>
                                </div>
                                <div className=" flex flex-col gap-4">
                                    <div>
                                        <div
                                            className={`shadow-md ring-gray-300 ring-offset-2 ring-offset-white border rounded-[6px] border-${pickYourPlanFormik.values.housingPlan ? '[#01b3bb]' : 'gray-200'} bg-[#fff] w-[395px] h-[68px] flex-shrink-0 py-[10px] px-[10px] flex items-center justify-between  `}
                                            onClick={toggleDropdown}
                                        >
                                            <div className="flex flex-row items-center justify-items-center gap-10">
                                                <Home set="bold" primaryColor="gray"/>
                                                <div
                                                    className="flex flex-col items-start justify-items-center w-[150px]">
                        <span className="text-[rgba(0,0,0,0.6)] font-montserrat text-base font-semibold">
                          Housing
                        </span>
                                                    <span
                                                        className="text-gray-600 font-montserrat text-xs font-semibold">
                          12 Months
                        </span>
                                                </div>
                                            </div>
                                            <div
                                                className="flex flex-row items-center gap-[20px] text-[rgba(0,0,0,0.6)]  font-montserrat text-14 font-semibold">
                                                $12
                                                <input id="red-checkbox" type="checkbox" name="housingPlan"
                                                       checked={pickYourPlanFormik.values.housingPlan}
                                                       onChange={pickYourPlanFormik.handleChange}
                                                       className="w-4 h-4 text-[#01B3BB]-600 bg-gray-100 border-gray-300 rounded focus:ring-[#01B3BB]-500 dark:focus:ring-[#01B3BB]-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                            </div>
                                        </div>
                                        {isOpen && (
                                            <div
                                                className={`w-[395px] flex-shrink-0 rounded-b-[8px] border border-solid border-[rgba(0,0,0,0.17)] bg-white flex flex-col items-start p-[10px] `}
                                            >
                      <span className="text-[#707070] text-base font-bold leading-[19.3px]">
                        Duration
                      </span>
                                                <div
                                                    className="flex items-center justify-between border border-solid border-gray-300 rounded-md bg-white w-193 h-30 flex-shrink-0 mt-10 mb-10 px-10 text-gray-700 font-semibold text-sm">
                                                    12 months
                                                    <ChevronDown set="light" primaryColor="gray" size={14}/>
                                                </div>
                                                <span className="text-[#707070] text-base font-bold leading-[19.3px]">
                        Description
                      </span>
                                                <span className="text-[#707070] text-base font-normal leading-[19.3px]">
                        Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor
                        sit amet, consectetur Lorem ipsum dolor sit amet,
                        consectetur Lorem ipsum dolor sit amet, consectetur Lorem
                        ipsum dolor sit amet, consectetur Lorem ipsum dolor sit
                        amet, consectetur Lorem ipsum dolor sit amet, consectetur
                        Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor
                        sit amet, consectetur{" "}
                      </span>
                                            </div>
                                        )}
                                    </div>

                                    <div
                                        className={`border border-${pickYourPlanFormik.values.eventsPlan ? '[#01b3bb]' : 'gray-200'} rounded-md bg-white shadow-md w-[395px] h-[68px] flex-shrink-0 p-2 flex items-center justify-between`}>
                                        <div className="flex flex-row items-center justify-center space-x-15">
                                            <TicketStar set="bold" primaryColor="gray"/>
                                            <div
                                                className="px-10 flex flex-col items-start justify-items-center w-[150px]">
                      <span className="text-[rgba(0,0,0,0.6)] font-montserrat text-base font-semibold">
                        Events
                      </span>
                                                <span className="text-gray-600 font-montserrat text-xs font-semibold">
                        12 Months
                      </span>
                                            </div>
                                        </div>
                                        <div
                                            className="flex flex-row items-center gap-30 text-[rgba(0, 0, 0, 0.6)] font-montserrat font-medium text-base">
                                            <input id="red-checkbox" type="checkbox" name="eventsPlan"
                                                   checked={pickYourPlanFormik.values.eventsPlan}
                                                   onChange={pickYourPlanFormik.handleChange}
                                                   className="w-4 h-4 text-[#01B3BB]-600 bg-gray-100 border-gray-300 rounded focus:ring-[#01B3BB]-500 dark:focus:ring-[#01B3BB]-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                        </div>
                                    </div>

                                    <div
                                        className={`border border-${pickYourPlanFormik.values.careersPlan ? '[#01b3bb]' : 'gray-200'} bg-white shadow-md rounded-lg w-[395px] h-[68px] flex-shrink-0 p-2 flex items-center justify-between`}>
                                        <div className="flex flex-row items-center justify-center space-x-15">
                                            <Work set="bold" primaryColor="gray"/>
                                            <div
                                                className="px-10 flex flex-col items-start justify-items-center w-[150px]">
                      <span className="text-[rgba(0,0,0,0.6)] font-montserrat text-base font-semibold">
                        Careers
                      </span>
                                                <span className="text-gray-600 font-montserrat text-xs font-semibold">
                        12 Months
                      </span>
                                            </div>
                                        </div>
                                        <div
                                            className="flex flex-row  items-center gap-[20px] text-[rgba(0,0,0,0.6)] font-montserrat text-sm font-semibold leading-[44.304px]">
                                            $12
                                            <input id="red-checkbox" type="checkbox" name="careersPlan"
                                                   checked={pickYourPlanFormik.values.careersPlan}
                                                   onChange={pickYourPlanFormik.handleChange}
                                                   className="w-4 h-4 text-[#01B3BB]-600 bg-gray-100 border-gray-300 rounded focus:ring-[#01B3BB]-500 dark:focus:ring-[#01B3BB]-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                        </div>
                                    </div>

                                    <div
                                        className={`border border-${pickYourPlanFormik.values.offersPlan ? '[#01b3bb]' : 'gray-200'} rounded-md bg-white shadow-md w-[395px] h-[68px] flex-shrink-0 p-2 flex items-center justify-between`}>
                                        <div className="flex flex-row items-center justify-center space-x-15">
                                            <Discount set="bold" primaryColor="gray"/>
                                            <div
                                                className="px-10 flex flex-col items-start justify-items-center w-[150px]">
                      <span className="text-[rgba(0,0,0,0.6)] font-montserrat text-base font-semibold">
                        Offers
                      </span>
                                                <span className="text-gray-600 font-montserrat text-xs font-semibold">
                        12 Months
                      </span>
                                            </div>
                                        </div>
                                        <div
                                            className="flex flex-row items-center gap-30 text-[rgba(0,0,0,0.6)] font-montserrat text-sm font-semibold leading-[44.304px]">
                                            <input id="red-checkbox" type="checkbox" name="offersPlan"
                                                   checked={pickYourPlanFormik.values.offersPlan}
                                                   onChange={pickYourPlanFormik.handleChange}
                                                   className="w-4 h-4 text-[#01B3BB]-600 bg-gray-100 border-gray-300 rounded focus:ring-[#01B3BB]-500 dark:focus:ring-[#01B3BB]-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                        </div>
                                    </div>

                                    <div
                                        className={`border border-${pickYourPlanFormik.values.adsPlan ? '[#01b3bb]' : 'gray-200'} rounded-md bg-white shadow-md w-[395px] h-[68px] flex-shrink-0 p-2 flex items-center justify-between `}>
                                        <div className="flex flex-row items-center justify-center space-x-15">
                                            <Document set="bold" primaryColor="gray"/>
                                            <div
                                                className="px-10 flex flex-col items-start justify-items-center w-[150px]">
                      <span className="text-[rgba(0,0,0,0.6)] font-montserrat text-base font-semibold">
                        Ads
                      </span>
                                                <span className="text-gray-600 font-montserrat text-xs font-semibold">
                        12 Months
                      </span>
                                            </div>
                                        </div>
                                        <div
                                            className="flex flex-row items-center gap-30 text-[rgba(0,0,0,0.6)] font-montserrat text-sm font-semibold leading-[44.304px]">
                                            <input id="red-checkbox" type="checkbox" name="adsPlan"
                                                   checked={pickYourPlanFormik.values.adsPlan}
                                                   onChange={pickYourPlanFormik.handleChange}
                                                   className="w-4 h-4 text-[#01B3BB]-600 bg-gray-100 border-gray-300 rounded focus:ring-[#01B3BB]-500 dark:focus:ring-[#01B3BB]-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="flex flex-col items-center pt-8">
                                <button
                                    className="w-[588px] h-[77.642px] flex-shrink-0 border rounded-[10px] bg-[#01B3BB] text-[#FEFCFE] font-montserrat text-[18px] font-[600] uppercase ">
                                    Continue
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Register;
  
