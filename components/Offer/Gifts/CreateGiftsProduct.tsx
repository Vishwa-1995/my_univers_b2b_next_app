"use client";
import React, { useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import { Camera } from "react-iconly";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import baseUrl from "../../utils/baseUrl";

const CreateGiftsProduct = () => {

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
  const [AddGiftOffer, setAddGiftOffer] = useState<any>({

    offer_name:"",
    code: "",
    link: "",
    offer_subtype: "products",
    product_type:"",
    brands:"",
    price: '',
    image: [],
    product_description: "",
    product_name: "",
    for_subscription_only: "false",
   
  });

  console.log("images" ,AddGiftOffer.image);
  

   // Function to handle image drop in the Dropzone
  const handleImageDrop = (acceptedFiles: any) => {
    // Append the new images to the existing property_image array
    setAddGiftOffer({
      ...AddGiftOffer,
      image: [...AddGiftOffer.image, ...acceptedFiles],
    });
  };


  // Function to create a digital offer
  const createDigitalOffer = async ({ e }: any) => {
    // setLoading(true);

    const details = {
      offer_name:AddGiftOffer.offer_name,
      code: AddGiftOffer.code,
      link: AddGiftOffer.link,
      offer_subtype:AddGiftOffer.offer_subtype,
      type:AddGiftOffer.product_type,
      brands:AddGiftOffer.brands,
      price: AddGiftOffer.price,
      product_description: AddGiftOffer.product_description,
      product_name: AddGiftOffer.product_name,
      for_subscription_only: AddGiftOffer.for_subscription_only,
    };

    console.log("datails", details);

    const formData = new FormData();

    AddGiftOffer.image.forEach((image:any) => {
      formData.append("images", image);
    });
    formData.append("details", JSON.stringify(details));

    try {
      const response = await fetch(`${baseUrl}/offer/add_gifts`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        Swal.fire({
          title: "Gift Product Successfully Inserted! ",
          icon: "success",
          confirmButtonColor: "#01B3BB",
        }).then((res) => {
          if (res.isConfirmed) {
            router.push('/gifts/products')
          }
        });
        // Redirect or handle success
      } else {
        Swal.fire({
          title: "Error occured ! ",
          text: `Failed to add offer`,
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
              Gifts Offers Information
            </div>
            <div className="flex flex-col items-center gap-5 mt-5 px-2 2xl:px-28 lg:px-20 md:px-20 sm:px-20 ">
              
                <input
                  className="w-full h-[50px] flex items-center text-[12px] rounded-[10px] border border-[#01B3BB] pt-[14px] pr-[75px] pb-[14px] pl-[20px] placeholder-rgba(30, 30, 30, 0.7) placeholder:font-inter placeholder:text-[12px] font-[400]  "
                  placeholder="Enter Electronic Offer Name"
                  value={AddGiftOffer.offer_name}
                  onChange={(e) =>
                    setAddGiftOffer({
                      ...AddGiftOffer,
                      offer_name: e.target.value,
                    })
                  }
                />
              
              <input
                className="w-full h-[50px] flex items-center rounded-[10px] border border-[#01B3BB] pt-[14px] pr-[75px] pb-[14px] pl-[20px] 
                placeholder-[#707070] text-[12px] font-inter  placeholder:font-inter placeholder:text-[12px] font-[400]"
                placeholder="Enter Electronic Offer Code"
                value={AddGiftOffer.code}
                onChange={(e) =>
                  setAddGiftOffer({
                    ...AddGiftOffer,
                    code: e.target.value,
                  })
                }
              />
              <input
                className="w-full h-[50px] flex items-center rounded-[10px] border border-[#01B3BB] pt-[14px] pr-[75px] pb-[14px] pl-[20px] 
                placeholder-[#707070] text-[12px] font-inter  placeholder:font-inter placeholder:text-[12px] font-[400]"
                placeholder="Enter Electronic Offer Link"
                value={AddGiftOffer.link}
                onChange={(e) =>
                  setAddGiftOffer({
                    ...AddGiftOffer,
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
              Electronic Information
            </div>
            <div className="flex flex-col items-center gap-5 mt-5 px-2 2xl:px-28 lg:px-20 md:px-20 sm:px-20 ">
             
           
                <input
                  className="w-full h-[50px] flex items-center rounded-[10px] border border-[#01B3BB] pt-[14px] pr-[75px] pb-[14px] pl-[20px] placeholder-rgba(30, 30, 30, 0.7) placeholder:font-inter placeholder:text-[12px] font-[400]  "
                  placeholder="Enter Electronic Product Name"
                  value={AddGiftOffer.product_name}
                  onChange={(e) =>
                    setAddGiftOffer({
                      ...AddGiftOffer,
                      product_name: e.target.value,
                    })
                  }
                />
               
               

              <textarea
                className=" w-full text-[12px] flex items-center rounded-lg border border-[#01B3BB] p-14px resize-none pt-[14px] pr-[75px] pb-[14px] pl-[20px]"
                placeholder="Describe Your Product"
                value={AddGiftOffer.product_description}
                onChange={(e) =>
                  setAddGiftOffer({
                    ...AddGiftOffer,
                    product_description: e.target.value,
                  })
                }
              />

<div className="flex flex-row gap-4 items-center justify-between w-full">
                <input
                  className="w-full h-[50px] flex items-center rounded-[10px] border border-[#01B3BB] pt-[14px]  pb-[14px] pl-[20px] placeholder-rgba(30, 30, 30, 0.7) placeholder:font-inter placeholder:text-[12px] font-[400]  "
                  placeholder="Enter Product Brand"
                  value={AddGiftOffer.brands}
                  onChange={(e) =>
                    setAddGiftOffer({
                      ...AddGiftOffer,
                      brands: e.target.value,
                    })
                  }
                />
                <input
                  className="w-full h-[50px] flex items-center rounded-[10px] border border-[#01B3BB] pt-[14px]  pb-[14px] pl-[20px] placeholder-rgba(30, 30, 30, 0.7) placeholder:font-inter placeholder:text-[12px] font-[400]  "
                  placeholder="Enter Poduct type"
                  value={AddGiftOffer.product_type}
                  onChange={(e) =>
                    setAddGiftOffer({
                      ...AddGiftOffer,
                      product_type: e.target.value,
                    })
                  }
                 
                />
              </div>
               
              
       

             
               
                <input
                  className="w-full h-[50px] flex items-center rounded-[10px] border border-[#01B3BB] pt-[14px] pr-[30px] pb-[14px] pl-[20px] placeholder-rgba(30, 30, 30, 0.7) placeholder:font-inter placeholder:text-[12px] font-[400]  "
                  placeholder="Enter Product price "
                  value={AddGiftOffer.price}
                  onChange={(e) =>
                    setAddGiftOffer({
                      ...AddGiftOffer,
                      price: e.target.value,
                    })
                  }
                  type="number"
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
                {AddGiftOffer.image.map((file:any, index:any) => (
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
                onClick={createDigitalOffer}
              >
                Create Gifts Offer
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateGiftsProduct;
