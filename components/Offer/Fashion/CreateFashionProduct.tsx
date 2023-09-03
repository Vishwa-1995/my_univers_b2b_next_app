"use client";

import React, { useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import { Camera } from "react-iconly";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Swal from "sweetalert2";
import baseUrl from "../../utils/baseUrl";

const CreateFashionProduct = () => {

     // State for tracking the current step of the form
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;
  const router = useRouter();

   // Function to handle moving to the next step
  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  useEffect(() => {
    console.log();
  });


  // State for storing form data
  const [AddFashionOffer, setAddFashionOffer] = useState<any>({
    offer_subtype: "products",
    image: [],
    price: '',
    brands: "",
    category: "",
    colour: "",
    gender: "",
    product_name: "",
    store: "",
    product_description: "",
    size: "select",
    code: "",
    link: "",
    for_subscription_only: "false",
  });


   // Function to handle image drop in the Dropzone
  const handleImageDrop = (acceptedFiles: any) => {
    // Append the new images to the existing property_image array
    setAddFashionOffer({
      ...AddFashionOffer,
      image: [...AddFashionOffer.image, ...acceptedFiles],
    });
  };


  // Function to create a fashion offer
  const createFashionOffer = async ({ e }: any) => {
    // setLoading(true);

    const details = {
      offer_subtype: AddFashionOffer.offer_subtype,
      price: AddFashionOffer.price,
      brands: AddFashionOffer.brands,
      category: AddFashionOffer.category,
      colour: AddFashionOffer.colour,
      gender: AddFashionOffer.gender,
      product_name: AddFashionOffer.product_name,
      store: AddFashionOffer.store,
      product_description: AddFashionOffer.product_description,
      size: AddFashionOffer.size,
      code: AddFashionOffer.code,
      link: AddFashionOffer.link,
      for_subscription_only: AddFashionOffer.for_subscription_only,
    };

    console.log("datails", details);

    const formData = new FormData();

    AddFashionOffer.image.forEach((image:any) => {
      formData.append("images", image);
    });
    formData.append("details", JSON.stringify(details));

    try {
      const response = await fetch(`${baseUrl}/offer/add_fashion`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        Swal.fire({
          title: "Fasion Product Successfully Inserted! ",
          icon: "success",
          confirmButtonColor: "#01B3BB",
        }).then((res) => {
          if (res.isConfirmed) {
            router.push('/fashion/products')
          }
        });
        // Redirect or handle success
      } else {
        Swal.fire({
          title: "Error occured ! ",
          text: `Failed to add Fasion Product`,
          icon: "error",
          confirmButtonColor: "#01B3BB",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error occured ! ",
        text: `${error}`,
        icon: "error",
        confirmButtonColor: "#01B3BB",
      });    }
  };

  return (
    <div
      className="min-h-screen w-full 2xl:px-96 xl:px-64 lg:px-56  md:px-24 sm:px-10 px-4 flex  justify-center items-center 
  bg-gradient-to-r from-blue-200 to-white "
    >
      <div
        className=" mt-4 w-full h-auto flex-shrink-0 flex flex-col bg-[#fff] border rounded-[18px] 
    border-solid border-[#42f7cc] pt-[50px] pb-[50px] shadow-md"
      >
        <div className="">
          <div className="flex items-center justify-between 2xl:mx-64 xl:mx-56 lg:mx-36 md:mx-40 sm:mx-36 mx-20 mb-4 gap-4 ">
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
        {currentStep === 1 && (
          <div className="flex flex-col mt-6 ">
            <div className="flex flex-row text-black font-montserrat text-[22px] font-[600] 2xl:pl-28 lg:pl-20 sm:pl-20 pl-2 md:pl-20">
              Fashion Offers Information
            </div>
            <div className="flex flex-col items-center gap-5 mt-5 px-2 2xl:px-28 lg:px-20 md:px-20 sm:px-20 ">
              <div className="flex flex-row gap-4 items-center justify-between w-full">
                <input
                  className="w-full h-[50px] flex items-center rounded-[10px] border border-[#01B3BB] pt-[14px] pr-[75px] pb-[14px] pl-[20px] placeholder-rgba(30, 30, 30, 0.7) placeholder:font-inter placeholder:text-[12px] font-[400]  "
                  placeholder="Enter Product Name"
                  value={AddFashionOffer.product_name}
                  onChange={(e) =>
                    setAddFashionOffer({
                      ...AddFashionOffer,
                      product_name: e.target.value,
                    })
                  }
                />
                
                {/* <input
                  className="w-full h-[50px] flex items-center rounded-[10px] border border-[#01B3BB] pt-[14px] pr-[75px] pb-[14px] pl-[20px] placeholder-rgba(30, 30, 30, 0.7) placeholder:font-inter placeholder:text-[12px] font-[400]  "
                  placeholder="Enter Product Type "
                  value={AddFashionOffer.product_type}
                  onChange={(e) =>
                    setAddFashionOffer({
                      ...AddFashionOffer,
                      product_type: e.target.value,
                    })
                  }
                /> */}
              </div>
              <textarea
                className=" w-full text-[12px] flex items-center rounded-lg border border-[#01B3BB] p-14px resize-none pt-[14px] pr-[75px] pb-[14px] pl-[20px]"
                placeholder="Describe Your Product"
                value={AddFashionOffer.product_description}
                onChange={(e) =>
                  setAddFashionOffer({
                    ...AddFashionOffer,
                    product_description: e.target.value,
                  })
                }
              />
              <input
                className="w-full h-[50px] flex items-center rounded-[10px] border border-[#01B3BB] pt-[14px] pr-[75px] pb-[14px] pl-[20px] 
                placeholder-[#707070] text-[12px] font-inter  placeholder:font-inter placeholder:text-[12px] font-[400]"
                placeholder="Enter Fashion Offer Code"
                value={AddFashionOffer.code}
                onChange={(e) =>
                  setAddFashionOffer({
                    ...AddFashionOffer,
                    code: e.target.value,
                  })
                }
              />
              <input
                className="w-full h-[50px] flex items-center rounded-[10px] border border-[#01B3BB] pt-[14px] pr-[75px] pb-[14px] pl-[20px] 
                placeholder-[#707070] text-[12px] font-inter  placeholder:font-inter placeholder:text-[12px] font-[400]"
                placeholder="Enter Offer Link"
                value={AddFashionOffer.link}
                onChange={(e) =>
                  setAddFashionOffer({
                    ...AddFashionOffer,
                    link: e.target.value,
                  })
                }
              />
              <button
                className="w-full h-[67.19px] flex-shrink-0 border rounded-[10px] bg-[#01B3BB] text-[#FEFCFE] font-montserrat font-semibold text-[18px] uppercase"
                onClick={handleNextStep}
              >
                Continue
              </button>
            </div>
          </div>
        )}
        {currentStep === 2 && (
          <div className="flex flex-col mt-6 ">
            <div className="flex flex-row text-black font-montserrat text-[22px] font-[600] 2xl:pl-28 lg:pl-20 sm:pl-20 pl-2 md:pl-20">
              Health & Beauty Information
            </div>
            <div className="flex flex-col items-center gap-5 mt-5 px-2 2xl:px-28 lg:px-20 md:px-20 sm:px-20 ">
              <div className="flex flex-row gap-4  w-full">
                <input
                  className="w-full h-[50px] flex items-center rounded-[10px] border border-[#01B3BB] pt-[14px] pr-[75px] pb-[14px] pl-[20px] placeholder-rgba(30, 30, 30, 0.7) placeholder:font-inter placeholder:text-[12px] font-[400]  "
                  placeholder="Enter Store Name"
                  value={AddFashionOffer.store}
                  onChange={(e) =>
                    setAddFashionOffer({
                      ...AddFashionOffer,
                      store: e.target.value,
                    })
                  }
                />
                <input
                  className="w-full h-[50px] flex items-center rounded-[10px] border border-[#01B3BB] pt-[14px] pr-[75px] pb-[14px] pl-[20px] placeholder-rgba(30, 30, 30, 0.7) placeholder:font-inter placeholder:text-[12px] font-[400]  "
                  placeholder="Enter Fashion Product brand "
                  value={AddFashionOffer.brands}
                  onChange={(e) =>
                    setAddFashionOffer({
                      ...AddFashionOffer,
                      brands: e.target.value,
                    })
                  }
                />
              </div>

              

              <div className="flex flex-row gap-4 items-center justify-between w-full">
                <input
                  className="w-full h-[50px] flex items-center rounded-[10px] border border-[#01B3BB] pt-[14px]  pb-[14px] pl-[20px] placeholder-rgba(30, 30, 30, 0.7) placeholder:font-inter placeholder:text-[12px] font-[400]  "
                  placeholder="Enter Product colour"
                  value={AddFashionOffer.colour}
                  onChange={(e) =>
                    setAddFashionOffer({
                      ...AddFashionOffer,
                      colour: e.target.value,
                    })
                  }
                />
                <input
                  className="w-full h-[50px] flex items-center rounded-[10px] border border-[#01B3BB] pt-[14px] pr-[30px] pb-[14px] pl-[20px] placeholder-rgba(30, 30, 30, 0.7) placeholder:font-inter placeholder:text-[12px] font-[400]  "
                  placeholder="Enter price "
                  value={AddFashionOffer.price}
                  onChange={(e) =>
                    setAddFashionOffer({
                      ...AddFashionOffer,
                      price: e.target.value,
                    })
                  }
                  type="number"
                />
              </div>

              <div className="flex flex-row gap-4 items-center justify-between w-full">
                <input
                  className="w-full h-[50px] flex items-center rounded-[10px] border border-[#01B3BB] pt-[14px]  pb-[14px] pl-[20px] placeholder-rgba(30, 30, 30, 0.7) placeholder:font-inter placeholder:text-[12px] font-[400]  "
                  placeholder="Enter Product category"
                  value={AddFashionOffer.category}
                  onChange={(e) =>
                    setAddFashionOffer({
                      ...AddFashionOffer,
                      category: e.target.value,
                    })
                  }
                />
                <input
                  className="w-full h-[50px] flex items-center rounded-[10px] border border-[#01B3BB] pt-[14px]  pb-[14px] pl-[20px] placeholder-rgba(30, 30, 30, 0.7) placeholder:font-inter placeholder:text-[12px] font-[400]  "
                  placeholder="Enter Gender "
                  value={AddFashionOffer.gender}
                  onChange={(e) =>
                    setAddFashionOffer({
                      ...AddFashionOffer,
                      gender: e.target.value,
                    })
                  }
                />
                <select
                  className="bg-white w-full h-[50px] flex items-center rounded-[10px] border border-[#01B3BB] pt-[14px]  pb-[14px] pl-[20px] text-[rgba(30, 30, 30, 0.7)] text-[12px] text-[gray] placeholder:font-inter placeholder:text-[12px] font-[400]  "
                  value={AddFashionOffer.size}
                  onChange={(e) =>
                    setAddFashionOffer({
                      ...AddFashionOffer,
                      size: e.target.value,
                    })
                  }
                >
                  {" "}
                  <option>Select Size</option>
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                  <option value="XL">XL</option>
                  <option value="XXL">XXL</option>
                  <option value="XXXL">XXXL</option>
                </select>
              </div>

              <button
                className="w-full h-[67.19px] flex-shrink-0 border rounded-[10px] bg-[#01B3BB] text-[#FEFCFE] font-montserrat font-semibold text-[18px] uppercase"
                onClick={handleNextStep}
              >
                Continue
              </button>
            </div>
          </div>
        )}
        {currentStep === 3 && (
          <div className="flex flex-col mt-6 ">
            <div className="flex flex-row text-black font-montserrat text-[22px] font-[600] 2xl:pl-28 lg:pl-20 sm:pl-20 pl-2 md:pl-20">
              Upload Images
            </div>
            <div className="flex flex-col items-center gap-5 mt-5 px-2 2xl:px-28 lg:px-20 md:px-20 sm:px-20 ">
              <Dropzone onDrop={handleImageDrop} multiple>
                {({ getRootProps, getInputProps, isDragActive }) => (
                  <div
                    {...getRootProps()}
                    className={`mt-[10px] flex flex-col justify-items-center items-center border border-[#01b3bb] w-full pt-[30px] pb-[30px] bg-white rounded-[20px] dropzone ${
                      isDragActive ? "active" : ""
                    }`}
                  >
                    <input {...getInputProps()} />
                    <div className="icon-container">
                      <Camera set="bold" primaryColor="#B4B4B4" size={100} />
                    </div>
                    <p className="text-[#B4B4B4]">
                      Drag &amp; drop images here, or click to select files
                    </p>
                  </div>
                )}
              </Dropzone>
              <div className="flex flex-wrap">
                {AddFashionOffer.image.map((file:any, index:any) => (
                  <img
                    key={index}
                    src={URL.createObjectURL(file)}
                    alt={`Uploaded ${index + 1}`}
                    style={{
                      width: "90px",
                      margin: "5px",
                      border: "1px solid #ccc",
                      borderRadius: "5px",
                    }}
                  />
                ))}
              </div>
              <button
                className="w-full h-[67.19px] flex-shrink-0 border rounded-[10px] bg-[#01B3BB] text-[#FEFCFE] font-montserrat font-semibold text-[18px] uppercase"
                onClick={createFashionOffer}
              >
                Create Health & Beauty Offer
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateFashionProduct;
