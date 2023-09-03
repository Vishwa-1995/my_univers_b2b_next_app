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
export default function CreateCareer() {
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
  const totalSteps = 3;

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrMsg] = useState({
    lat: "",
    long: "",
    job_type: "",
    title: "",
    company: "",
    salary: "",
    about: "",
    upload_by_id: "",
    cv_required: "",
  });

  const [AddCareer, setAddCareer] = useState<any>({
    lat: lat?.toString(),
    long: lng?.toString(),
    job_type: "select",
    title: "",
    company: "",
    salary: "",
    about: "",
    upload_by_id: "1",
    cv_required: "false",
    image: [],
  });
  const handleImageDrop = (acceptedFiles: any) => {
    // Append the new images to the existing property_image array
    setAddCareer({
      ...AddCareer,
      image: [...AddCareer.image, ...acceptedFiles],
    });
  };

  const AddCareerManage = async ({ e }: any) => {
    setLoading(true);

    const details = {
      lat: lat?.toString(),
      long: lng?.toString(),
      title: AddCareer.title,
      company: AddCareer.company,
      salary: AddCareer.salary,
      job_type: AddCareer.job_type,
      about: AddCareer.about,
      upload_by_id: AddCareer.upload_by_id,
      cv_required: AddCareer.cv_required,
    };

    console.log("datails", details);

    const formData = new FormData();

    AddCareer.image.forEach((image: any) => {
      formData.append("images", image);
    });
    formData.append("details", JSON.stringify(details));

    try {
      const response = await fetch(`${baseUrl}/job/insert`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        Swal.fire({
          title: "Career Successfully Inserted! ",
          icon: "success",
          confirmButtonColor: "#01B3BB",
        }).then((res) => {
          if (res.isConfirmed) {
            router.push("/job_volunteer");
          }
        });
        // Redirect or handle success
      } else {
        Swal.fire({
          title: "Error occured ! ",
          text: `Failed to add job`,
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
              Job Information
            </div>
            <div className="flex flex-col items-center gap-5 mt-5 px-2 2xl:px-28 lg:px-20 md:px-20 sm:px-20 ">
              <input
                className="w-full h-[50px] flex items-center rounded-[10px] border border-[#01B3BB] pt-[14px] pr-[75px] pb-[14px] pl-[20px] 
                      placeholder-[#707070] text-[12px] font-inter  placeholder:font-inter placeholder:text-[12px] font-[400]"
                placeholder="Enter Job Title Here"
                value={AddCareer.title}
                onChange={(e) =>
                  setAddCareer({ ...AddCareer, title: e.target.value })
                }
              />
              <input
                className="w-full h-[50px] flex items-center rounded-[10px] border border-[#01B3BB] pt-[14px] pr-[75px] pb-[14px] pl-[20px] 
                      placeholder-[#707070] text-[12px] font-inter  placeholder:font-inter placeholder:text-[12px] font-[400]"
                placeholder="Enter Company Here"
                value={AddCareer.company}
                onChange={(e) =>
                  setAddCareer({ ...AddCareer, company: e.target.value })
                }
              />
              <div className="flex flex-row gap-4 items-center justify-between w-full">
                <select
                  className="w-full text-[#707070] h-[50px] text-[12px] placeholder-[#707070] bg-white flex items-center rounded-[10px] border border-[#01B3BB] pt-[14px] pr-[75px] pb-[14px] pl-[20px] px-52 placeholder-rgba(30, 30, 30, 0.7) placeholder:font-inter placeholder:text-[12px] font-[400]  "
                  value={AddCareer.job_type}
                  onChange={(e) =>
                    setAddCareer({ ...AddCareer, job_type: e.target.value })
                  }
                >
                  <option value="select">Select Type</option>
                  <option value="Full Time">Full Time</option>
                  <option value="Part Time ">Part Time </option>
                  <option value="Volunteer ">Volunteer </option>
                  <option value="Internship ">Internship </option>
                  <option value="Work-Experience ">Work-Experience </option>
                </select>
                <input
                  className="w-full h-[50px] flex items-center rounded-[10px] border border-[#01B3BB] pt-[14px] pr-[30px] pb-[14px] pl-[20px] 
                      placeholder-[#707070] text-[12px] font-inter  placeholder:font-inter placeholder:text-[12px] font-[400]"
                  placeholder="Enter salary"
                  type="number"
                  value={AddCareer.salary}
                  onChange={(e) =>
                    setAddCareer({ ...AddCareer, salary: e.target.value })
                  }
                />
              </div>
              <input
                className="w-full h-[50px] flex items-center rounded-[10px] border border-[#01B3BB] pt-[14px] pr-[75px] pb-[14px] pl-[20px] 
                      placeholder-[#707070] text-[12px] font-inter  placeholder:font-inter placeholder:text-[12px] font-[400]"
                placeholder="About job details "
                value={AddCareer.about}
                onChange={(e) =>
                  setAddCareer({ ...AddCareer, about: e.target.value })
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

            <div className="flex flex-col items-center gap-5 mt-5 px-2 2xl:px-28 lg:px-20 md:px-20 sm:px-20 ">
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
                {AddCareer.image.map((file: any, index: any) => (
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
                onClick={AddCareerManage}
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
