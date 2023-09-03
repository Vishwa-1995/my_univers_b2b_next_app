"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import Dropzone from "react-dropzone";
import { Camera } from "react-iconly";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import Swal from "sweetalert2";
import baseUrl from "../utils/baseUrl";

interface Prediction {
  description: String;
  place_id: string;
}
export default function CreateHousing() {
  const [currentStep, setCurrentStep] = useState(1);
  const [searchAddress, setSearchAddress] = useState("");
  const [markerPosition, setMarkerPosition] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [predictions, setPredictions] = useState([]);
  const [hide, setHide] = useState(false);
  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);
  const [position, setPosition] = useState({
    lat: 0,
    lng: 0,
  });
  const totalSteps = 4;

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrMsg] = useState({
    title: "",
    property_description: "",
    numbers_of_rooms: "",
    address: "",
    monthly_rent: "",
    deposit: "",
    property_image: "",
    // selects
    property_type: "",
    bills_included: "",
    gender: "",
    term: "",
    smokers_allowed: "",
    pets_allowed: "",
    availability: "",
    type: "",
    // property_image: "",
  });

  const [AddProperty, setAddProperty] = useState<any>({
    title: "",
    property_description: "",
    property_type: "select",
    bills_included: "select",
    numbers_of_rooms: "",
    gender: "select",
    term: "select",
    smokers_allowed: "select",
    pets_allowed: "select",
    availability: "select",
    type: "select",
    address: "",
    monthly_rent: "",
    deposit: "",
    property_image: [],
    lat: lat?.toString(),
    long: lng?.toString(),
    posted_by_id: "1",
    featured_ads: "false",
  });
  const handleImageDrop = (acceptedFiles: any) => {
    // Append the new images to the existing property_image array
    setAddProperty({
      ...AddProperty,
      property_image: [...AddProperty.property_image, ...acceptedFiles],
    });
  };
  const removeImage = ({ index }: any) => {
    let property_image = AddProperty.property_image;

    property_image = property_image.filter(
      (img: any) => property_image.indexOf(img) != index
    );

    setAddProperty({ ...AddProperty, property_image: property_image });
  };

  const [showElement, setShowElement] = React.useState(true);
  const [image, setImage] = useState([]);
  useEffect(() => {
    setTimeout(function () {
      setShowElement(false);
    }, 5000);
  }, []);

  const AddpropertyMange = async ({ e }: any) => {
    setLoading(true);

    const details = {
      title: AddProperty.title,
      property_description: AddProperty.property_description,
      type: AddProperty.type,
      property_type: AddProperty.property_type,
      bills_included: AddProperty.bills_included,
      gender: AddProperty.gender,
      term: AddProperty.term,
      smokers_allowed: AddProperty.smokers_allowed,
      pets_allowed: AddProperty.pets_allowed,
      numbers_of_rooms: AddProperty.numbers_of_rooms,
      availability: AddProperty.availability,
      address: AddProperty.address,
      monthly_rent: AddProperty.monthly_rent,
      deposit: AddProperty.deposit,
      lat: lat?.toString(),
      long: lng?.toString(),
      posted_by_id: AddProperty.posted_by_id,
      featured_ads: AddProperty.featured_ads,
    };

    console.log("datails", details);

    const formData = new FormData();

    AddProperty.property_image.forEach((image: any) => {
      formData.append("images", image);
    });
    formData.append("details", JSON.stringify(details));

    try {
      const response = await fetch(`${baseUrl}/property/insert`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        Swal.fire({
          title: "Property successfully Inserted! ",
          icon: "success",
          confirmButtonColor: "#01B3BB",
        }).then((res) => {
          if (res.isConfirmed) {
            router.push("/housing");
          }
        });
        // Redirect or handle success
      } else {
        console.error("Failed to add housing");
        Swal.fire({
          title: "Error occured ! ",
          text: `Failed to add housing`,
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
      });
    }
  };

  //googlr map
  const mapRef = useRef<HTMLDivElement | null>(null);

  const handleLocationChange = (e: any) => {
    setSearchAddress(e.target.value);

    const autocompleteService = new google.maps.places.AutocompleteService();
    autocompleteService.getPlacePredictions(
      {
        input: searchAddress,
        types: ["geocode"],
      },
      handleAutocompleteResults
    );
  };

  const handleAutocompleteResults = (predictions: any, status: any) => {
    setHide(false);
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      setPredictions(predictions);
    }
  };

  function handlePredictionClick(place_id: any): void {
    setHide(true);
    const placeService = new google.maps.places.PlacesService(
      document.createElement("div")
    );

    placeService.getDetails(
      { placeId: place_id },
      (
        placeResult: google.maps.places.PlaceResult | null,
        placeStatus: google.maps.places.PlacesServiceStatus
      ) => {
        if (
          placeStatus === google.maps.places.PlacesServiceStatus.OK &&
          placeResult &&
          placeResult.address_components
        ) {
          const lat = placeResult.geometry?.location?.lat?.();
          const lng = placeResult.geometry?.location?.lng?.();
          console.log({ lat });
          console.log({ lng });
          if (typeof lat === "number" && typeof lng === "number") {
            setLat(lat);
            setLng(lng);
          }
          const formattedAddress = placeResult.formatted_address;

          setSearchAddress(formattedAddress as string);
          setSelectedAddress(formattedAddress as string);

          setAddProperty({
            ...AddProperty,
            address: formattedAddress as string,
          });
          console.log("fffffffffffffffff : ", AddProperty.lat);
        }
      }
    );
  }

  function handleChangeClick(place_id: any): void {
    setHide(true);
    const placeService = new google.maps.places.PlacesService(
      document.createElement("div")
    );

    placeService.getDetails(
      { placeId: place_id },
      (
        placeResult: google.maps.places.PlaceResult | null,
        placeStatus: google.maps.places.PlacesServiceStatus
      ) => {
        if (
          placeStatus === google.maps.places.PlacesServiceStatus.OK &&
          placeResult &&
          placeResult.address_components
        ) {
          const lat = placeResult.geometry?.location?.lat?.();
          const lng = placeResult.geometry?.location?.lng?.();

          if (typeof lat === "number" && typeof lng === "number") {
            setLat(lat);
            setLng(lng);
          }
        }
      }
    );
  }

  useEffect(() => {
    if (markerPosition) {
      const { lat, lng } = markerPosition;
      const apiKey = "AIzaSyALJN3bDbGEk8ppXieiWNnwHVYM_8ntKng";
      const geocodingApiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`;

      axios
        .get(geocodingApiUrl)
        .then((response) => {
          const address = response.data.results[0].formatted_address;
          setSelectedAddress(address);
          setSearchAddress(address);
          setAddProperty({
            ...AddProperty,
            address: address as string,
          });
          handleChangeClick(response.data.results[0].place_id);
        })
        .catch((error) => console.error("Error", error));
    }
  }, [markerPosition]);

  const handleMarkerMove = (newPosition: any) => {
    setMarkerPosition(newPosition);
  };

  useEffect(() => {
    console.log("locatin : ", searchAddress);
    if (searchAddress) {
      geocodeByAddress(searchAddress)
        .then((results) => getLatLng(results[0]))
        .then((latLng) => setPosition(latLng))
        .catch((error) => console.error("Error", error));
    }
  }, [searchAddress]);

  const handleMarkerDrag = (e: any) => {
    const newPosition = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    };
    setPosition(newPosition);
    handleMarkerMove(newPosition);
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
              Property Information
            </div>
            <div className="flex flex-col items-center gap-5 mt-5 px-2 2xl:px-28 lg:px-20 md:px-20 sm:px-20 ">
              <input
                className="w-full h-[50px] flex items-center rounded-[10px] border border-[#01B3BB] pt-[14px] pr-[75px] pb-[14px] pl-[20px] 
                    placeholder-[#707070] text-[12px] font-inter  placeholder:font-inter placeholder:text-[12px] font-[400]"
                placeholder="Enter Title Here"
                value={AddProperty.title}
                onChange={(e) =>
                  setAddProperty({ ...AddProperty, title: e.target.value })
                }
              />
              <textarea
                className="placeholder-[#707070] w-full text-[12px] flex items-center rounded-lg border border-[#01B3BB] p-14px resize-none pt-[14px] pr-[75px] pb-[14px] pl-[20px]"
                placeholder="Describe Your Property"
                value={AddProperty.property_description}
                onChange={(e) =>
                  setAddProperty({
                    ...AddProperty,
                    property_description: e.target.value,
                  })
                }
              />
              <div className="flex flex-row gap-4 items-center justify-between w-full">
                <select
                  className="w-full text-[#707070] h-[50px] text-[12px] placeholder-[#707070] bg-white flex items-center rounded-[10px] border border-[#01B3BB] pt-[14px] pr-[75px] pb-[14px] pl-[20px] placeholder-rgba(30, 30, 30, 0.7) placeholder:font-inter placeholder:text-[12px] font-[400]  "
                  value={AddProperty.type}
                  onChange={(e) =>
                    setAddProperty({ ...AddProperty, type: e.target.value })
                  }
                >
                  <option value="select">Select Type</option>
                  <option value="individual">Individual</option>
                  <option value="shared ">Shared </option>
                </select>
                <select
                  className="w-full text-[#707070] h-[50px] text-[12px] bg-white flex items-center rounded-[10px] border border-[#01B3BB] pt-[14px] pr-[75px] pb-[14px] pl-[20px] placeholder-rgba(30, 30, 30, 0.7) placeholder:font-inter placeholder:text-[12px] font-[400]  "
                  value={AddProperty.property_type}
                  onChange={(e) =>
                    setAddProperty({
                      ...AddProperty,
                      property_type: e.target.value,
                    })
                  }
                >
                  <option value="select">Select Property Type</option>
                  <option value="house">House</option>
                  <option value="studio">Studio</option>
                  <option value="flat">Flat</option>
                </select>
              </div>
              <select
                className="w-full text-[#707070] h-[50px]  bg-white flex items-center rounded-[10px] border border-[#01B3BB] pt-[14px] pr-[75px] pb-[14px] pl-[20px] 
                    placeholder-[#707070] text-[12px] font-inter  placeholder:font-inter placeholder:text-[12px] font-[400]"
                value={AddProperty.bills_included}
                onChange={(e) =>
                  setAddProperty({
                    ...AddProperty,
                    bills_included: e.target.value,
                  })
                }
              >
                <option value="select">Select Bill Included</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
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
              Property Information
            </div>
            <div className="flex flex-col items-center gap-5 mt-5 px-2 2xl:px-28 lg:px-20 md:px-20 sm:px-20 ">
              <div className="flex flex-row gap-4 items-center justify-between w-full">
                <select
                  className="w-full text-[#707070] h-[50px] text-[12px] placeholder-[#707070] bg-white flex items-center rounded-[10px] border border-[#01B3BB] pt-[14px] pr-[75px] pb-[14px] pl-[20px] placeholder-rgba(30, 30, 30, 0.7) placeholder:font-inter placeholder:text-[12px] font-[400]  "
                  value={AddProperty.gender}
                  onChange={(e) =>
                    setAddProperty({ ...AddProperty, gender: e.target.value })
                  }
                >
                  <option value="select">Select Gender</option>
                  <option value="male only">Male only</option>
                  <option value="Female only">Female only</option>
                  <option value="LGBTQ+">LGBTQ+</option>
                  <option value="mixed">Mixed</option>
                </select>
                <select
                  className="w-full text-[#707070] h-[50px] text-[12px] bg-white flex items-center rounded-[10px] border border-[#01B3BB] pt-[14px] pr-[75px] pb-[14px] pl-[20px] placeholder-rgba(30, 30, 30, 0.7) placeholder:font-inter placeholder:text-[12px] font-[400]  "
                  value={AddProperty.term}
                  onChange={(e) =>
                    setAddProperty({ ...AddProperty, term: e.target.value })
                  }
                >
                  <option value="select">Select Term</option>
                  <option value="Short-term (6 months or less)">
                    Short-term (6 months or less)
                  </option>
                  <option value="Long-term (over 6 months)">
                    Long-term (over 6 months)
                  </option>
                </select>
              </div>
              <div className="flex flex-row gap-4 items-center justify-between w-full">
                <select
                  className="w-full text-[#707070] h-[50px] text-[12px] placeholder-[#707070] bg-white flex items-center rounded-[10px] border border-[#01B3BB] pt-[14px] pr-[75px] pb-[14px] pl-[20px] placeholder-rgba(30, 30, 30, 0.7) placeholder:font-inter placeholder:text-[12px] font-[400]  "
                  value={AddProperty.smokers_allowed}
                  onChange={(e) =>
                    setAddProperty({
                      ...AddProperty,
                      smokers_allowed: e.target.value,
                    })
                  }
                >
                  <option value="select">Select Smokers Allowed</option>
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
                <select
                  className="w-full text-[#707070] h-[50px] text-[12px] bg-white flex items-center rounded-[10px] border border-[#01B3BB] pt-[14px] pr-[75px] pb-[14px] pl-[20px] placeholder-rgba(30, 30, 30, 0.7) placeholder:font-inter placeholder:text-[12px] font-[400]  "
                  value={AddProperty.pets_allowed}
                  onChange={(e) =>
                    setAddProperty({
                      ...AddProperty,
                      pets_allowed: e.target.value,
                    })
                  }
                >
                  <option value="select">Select Pets Allowed</option>
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
              </div>
              <div className="flex flex-row gap-4 items-center justify-between w-full">
                <input
                  className="w-full h-[50px] flex items-center rounded-[10px] border border-[#01B3BB] pt-[14px] pr-[30px] pb-[14px] pl-[20px] 
                    placeholder-[#707070] text-[12px] font-inter  placeholder:font-inter placeholder:text-[12px] font-[400]"
                  value={AddProperty.numbers_of_rooms}
                  onChange={(e) =>
                    setAddProperty({
                      ...AddProperty,
                      numbers_of_rooms: e.target.value,
                    })
                  }
                  placeholder="Please Select Number of Rooms"
                  type="number"
                />
                <select
                  className="w-full text-[#707070] h-[50px] text-[12px] bg-white flex items-center rounded-[10px] border border-[#01B3BB] pt-[14px] pr-[75px] pb-[14px] pl-[20px] placeholder-rgba(30, 30, 30, 0.7) placeholder:font-inter placeholder:text-[12px] font-[400]  "
                  value={AddProperty.availability}
                  onChange={(e) =>
                    setAddProperty({
                      ...AddProperty,
                      availability: e.target.value,
                    })
                  }
                >
                  <option value="select">Select Availability</option>
                  <option value="Immediately">Immediately</option>
                  <option value="Within 1 week">Within 1 week</option>
                  <option value="Within 1 month">Within 1 month</option>
                  <option value="Within 3 months">Within 3 months</option>
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
              Property Address
            </div>
            <LoadScript
              googleMapsApiKey="AIzaSyALJN3bDbGEk8ppXieiWNnwHVYM_8ntKng"
              libraries={["places"]}
            >
              <div className="flex flex-col items-center gap-5 mt-5 px-2 2xl:px-28 lg:px-20 md:px-20 sm:px-20 ">
                <input
                  className="placeholder-[#707070] w-full text-[12px] flex items-center rounded-lg border border-[#01B3BB] p-[14px] resize-none pt-[14px] pr-[75px] pb-[14px] pl-[20px]"
                  placeholder="Enter Your Address"
                  value={searchAddress}
                  onChange={handleLocationChange}
                />
                {predictions.length > 0 && !hide && (
                  <ul className=" top-full left-0 w-full bg-white z-10 border border-gray-300 rounded-md shadow-lg">
                    {predictions.map((prediction: Prediction) => (
                      <li
                        key={prediction.place_id}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer w-full text-left"
                        onClick={() =>
                          handlePredictionClick(prediction.place_id)
                        }
                      >
                        {prediction.description}
                      </li>
                    ))}
                  </ul>
                )}
                <div>
                  <GoogleMap
                    mapContainerStyle={{ height: "300px", width: "520px" }}
                    zoom={15}
                    center={position}
                  >
                    <Marker
                      position={position}
                      draggable
                      onDragEnd={handleMarkerDrag}
                    />
                  </GoogleMap>
                </div>{" "}
              </div>
            </LoadScript>
            <div className="flex flex-row text-black font-montserrat text-[22px] font-[600] 2xl:pl-28 lg:pl-20 sm:pl-20 pl-2 md:pl-20">
              Rent Information
            </div>
            <div className="flex flex-col items-center gap-5 mt-5 px-2 2xl:px-28 lg:px-20 md:px-20 sm:px-20 ">
              <div className="flex flex-row gap-4 items-center justify-between w-full">
                <input
                  className="w-full h-[50px] flex items-center rounded-[10px] border border-[#01B3BB] pt-[14px] pr-[30px] pb-[14px] pl-[20px] 
                    placeholder-[#707070] text-[12px] font-inter  placeholder:font-inter placeholder:text-[12px] font-[400]"
                  placeholder="£ Monthly Rent"
                  value={AddProperty.monthly_rent}
                  onChange={(e) =>
                    setAddProperty({
                      ...AddProperty,
                      monthly_rent: e.target.value,
                    })
                  }
                  type="number"
                />
                <input
                  className="w-full h-[50px] flex items-center rounded-[10px] border border-[#01B3BB] pt-[14px] pr-[30px] pb-[14px] pl-[20px] 
                    placeholder-[#707070] text-[12px] font-inter  placeholder:font-inter placeholder:text-[12px] font-[400]"
                  placeholder="£ Deposit Rent"
                  value={AddProperty.deposit}
                  onChange={(e) =>
                    setAddProperty({
                      ...AddProperty,
                      deposit: e.target.value,
                    })
                  }
                  type="number"
                />
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
        {currentStep === 4 && (
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
                {AddProperty.property_image.map((file: any, index: any) => (
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
                onClick={AddpropertyMange}
              >
                Post Your Property
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
