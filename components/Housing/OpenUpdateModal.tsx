import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import axios from "axios";
import { stringify } from "querystring";
import React, { useEffect, useRef, useState } from "react";
import { IoClose } from "react-icons/io5";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import Dropzone from "react-dropzone";
import { Camera } from "react-iconly";
import baseUrl from "../utils/baseUrl";

interface PropertyData {
  title: string; // Add other properties as needed
  images: string;
  description: String;
  place_id: string;
  property_description: string;
  numbers_of_rooms: string;
  address: string;
  monthly_rent: string;
  deposit: string;
  property_image: string;
  property_type: string;
  bills_included: string;
  gender: string;
  smokers_allowed: string;
  pets_allowed: string;
  availability: string;
  type: string;
}

export default function OpenUpdateModal({
  setOpenUpdateModal,
  propertyId,
}: any) {
  const [data, setData] = useState<PropertyData | undefined>();
  const [searchAddress, setSearchAddress] = useState("");
  const [markerPosition, setMarkerPosition] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [predictions, setPredictions] = useState([]);
  const [hide, setHide] = useState(false);
  const [latt, setLatt] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);
  const [position, setPosition] = useState({
    lat: 0,
    lng: 0,
  });

  const [title, setTitle] = useState("");
  const [property_description, setProperty_description] = useState("");
  const [numbers_of_rooms, setNumbers_of_rooms] = useState("");
  const [address, setAddress] = useState("");
  const [monthly_rent, setMonthly_rent] = useState("");
  const [deposit, setDeposit] = useState("");
  const [property_image, setProperty_image] = useState([]);
  const [bills_included, setBills_included] = useState("");
  const [gender, setGender] = useState("");
  const [smokers_allowed, setSmokers_allowed] = useState("");
  const [pets_allowed, setPets_allowed] = useState("");
  const [availability, setAvailability] = useState("");
  const [type, setType] = useState("");
  const [term, setTerm] = useState("");
  const [property_type, setProperty_type] = useState("");
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");

  const router = useRouter();

  const removeImage = (index: any) => {
    let property_images = property_image;

    property_images = property_images.filter(
      (property_image:any) => property_image.indexOf(property_image) != index
    );
    setProperty_image(property_images);
  };

  const handleclose = () => {
    setOpenUpdateModal(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(
        `${baseUrl}/property/getOne/${propertyId}`
      );
      if (res) {
        console.log("property_image : ", res.data.data[0].images);

        setTitle(res.data.data[0].title);
        setProperty_description(res.data.data[0].property_description);
        setNumbers_of_rooms(res.data.data[0].numbers_of_rooms);
        setAddress(res.data.data[0].address);
        setMonthly_rent(res.data.data[0].monthly_rent);
        setDeposit(res.data.data[0].deposit);
        setProperty_image(res.data.data[0].images);
        setProperty_type(res.data.data[0].property_type);
        setBills_included(res.data.data[0].bills_included);
        setGender(res.data.data[0].gender);
        setSmokers_allowed(res.data.data[0].smokers_allowed);
        setPets_allowed(res.data.data[0].pets_allowed);
        setAvailability(res.data.data[0].availability);
        setType(res.data.data[0].type);
        setTerm(res.data.data[0].term);
        setLat(res.data.data[0].lat);
        setLong(res.data.data[0].long);
      }
    } catch (error) {}
  };

  //googlr map
  const mapRef = useRef<HTMLDivElement | null>(null);

  const handleLocationChange = (e: any) => {
    const inputAddress = e.target.value;
    setSearchAddress(e.target.value);
    setAddress(inputAddress);
    const autocompleteService = new google.maps.places.AutocompleteService();
    autocompleteService.getPlacePredictions(
      {
        input: address,
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
            setLatt(lat);
            setLng(lng);
          }
          const formattedAddress = placeResult.formatted_address;

          setSearchAddress(formattedAddress as string);
          setSelectedAddress(formattedAddress as string);
          setAddress(formattedAddress as string);
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
            setLatt(lat);
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
          setAddress(address);
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
  //end of map code

  const UpdateProperty = (e: any) => {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure you want to confirm submission? ",
      showConfirmButton: true,
      showDenyButton: true,
      confirmButtonText: "Proceed",
      denyButtonText: "Cancel",
      confirmButtonColor: "#1fc191",
    }).then((result) => {
      if (result.isConfirmed) {
        let details = JSON.stringify({
          title: title,
          property_description: property_description,
          type: type,
          property_type: property_type,
          bills_included: bills_included,
          gender: gender,
          term: term,
          smokers_allowed: smokers_allowed,
          pets_allowed: pets_allowed,
          numbers_of_rooms: numbers_of_rooms,
          availability: availability,
          address: address,
          monthly_rent: monthly_rent,
          deposit: deposit,
          lat: lat,
          long: long,
        });

        const formData = new FormData();

        formData.append("details", details);

        property_image &&
          property_image.length &&
          formData.append("images", property_image[0]);

        axios
          .put(`${baseUrl}/property/update/${propertyId}`, formData)
          .then(() => {
            Swal.fire({
              title: "Property successfully Updated! ",
              icon: "success",
              confirmButtonColor: "#207159",
            }).then((res) => {
              if (res.isConfirmed) {
                location.reload();
              }
            });
          })
          .catch((err) => {
            Swal.fire({
              title: "Error occured ! ",
              text: `${err.response.data.error}`,
              icon: "error",
              confirmButtonColor: "#207159",
            });
          });
      } else if (result.isDenied) {
      }
    });
  };

  const handleImageDrop = (acceptedFiles: any) => {
    setProperty_image(acceptedFiles);
  };

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-slate-900 bg-opacity-50 ">
      <div className=" py-5 mx-2 flex gap-2 flex-col relative bg-white shadow-md rounded-md w-full lg:w-[1024px] h-auto overflow-y-auto ">
        <div className="flex justify-end px-2">
          <button
            onClick={handleclose}
            className="bg-[#c2c2d3] rounded-full w-8 h-8 flex justify-center items-center"
          >
            <IoClose className="text-white" />
          </button>
        </div>
        <div className=" bg-white rounded-md pb-5 px-[20px]">
          <div className="flex flex-row gap-5 ">
            <div className="basis-1/2">
              {/* /first column */}
              <div className="flex flex-col mt-6 ">
                <div className="flex flex-row text-black font-montserrat text-[22px] font-[600] 2xl:pl-28 lg:pl-20 sm:pl-20 pl-2 md:pl-20">
                  Property Information
                </div>
                <div className="flex flex-col  gap-3 mt-5  ">
                  <span className="text-[#707070] text-left font-montserrat text-xs font-normal ">
                    Event Start Date
                  </span>{" "}
                  <input
                    className=" w-full h-[40px] flex items-center rounded-[10px] border border-[#b5b3b3] pt-[10px] pr-[75px] pb-[10px] pl-[20px] 
                    placeholder-[#707070] text-[12px] font-inter  placeholder:font-inter placeholder:text-[12px] font-[400]"
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                  />
                  <span className="text-[#707070] text-left font-montserrat text-xs font-normal ">
                    Property Description{" "}
                  </span>{" "}
                  <textarea
                    className="placeholder-[#707070] w-full text-[12px] flex items-center rounded-lg border border-[#b5b3b3] p-14px resize-none pt-[10px] pr-[75px] pb-[10px] pl-[20px]"
                    value={property_description}
                    onChange={(e) => {
                      setProperty_description(e.target.value);
                    }}
                  />
                  <LoadScript
                    googleMapsApiKey="AIzaSyALJN3bDbGEk8ppXieiWNnwHVYM_8ntKng"
                    libraries={["places"]}
                  >
                    {" "}
                    <span className="text-[#707070] text-left font-montserrat text-xs font-normal ">
                      Address
                    </span>{" "}
                    <div className="flex flex-row gap-4 items-center justify-between w-full">
                      <div className="flex flex-col">
                        <input
                          className="placeholder-[#707070] h-[100px] w-full text-[12px] flex items-center rounded-lg border border-[#b5b3b3] p-[14px] resize-none pt-[10px] pr-[75px] pb-[10px] pl-[20px]"
                          value={address}
                          onChange={handleLocationChange}
                        />{" "}
                        {predictions.length > 0 && !hide && (
                          <ul className=" top-full left-0 w-full bg-white z-10 border border-gray-300 rounded-md shadow-lg">
                            {predictions.map((prediction: PropertyData) => (
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
                      </div>
                      <div>
                        <GoogleMap
                          mapContainerStyle={{
                            height: "100px",
                            width: "250px",
                          }}
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
                </div>

                <div className="flex flex-col items-center gap-5 mt-5 px-2 2xl:px-28 lg:px-20 md:px-20 sm:px-20 ">
                  {/* <Dropzone onDrop={handleImageDrop} multiple>
                    {({ getRootProps, getInputProps, isDragActive }) => (
                      <div
                        {...getRootProps()}
                        className={`mt-[10px] flex flex-col justify-items-center items-center border border-[#01b3bb] w-full pt-[30px] pb-[30px] bg-white rounded-[20px] dropzone ${
                          isDragActive ? "active" : ""
                        }`}
                      >
                        <input {...getInputProps()} />
                        <div className="icon-container">
                          <Camera set="bold" primaryColor="#B4B4B4" size={50} />
                        </div>
                        <p className="text-[#B4B4B4]"></p>
                      </div>
                    )}
                  </Dropzone> */}
                  {/* <div className="flex flex-wrap">
                    {property_image.map((img, index) => {
                      return (
                        <div
                          className="col-12 col-sm-6 col-lg-4   mt-sm-0"
                          style={{
                            marginTop: "40px",
                          }}
                        >
                          <div
                            style={{
                              width: "148px",
                            }}
                            className="uploaded-image-1 uploaded-reps-1"
                          >
                            <div className="item_list">
                              <img
                                key={index}
                                width={72}
                                height="72"
                                style={{
                                  width: "90px",
                                  margin: "5px",
                                  border: "1px solid #ccc",
                                  borderRadius: "5px",
                                }}
                                src={img.name ? URL.createObjectURL(img) : img}
                                alt={`Uploaded ${index + 1}`}
                              />
                              <a
                                style={{
                                  position: "absolute",
                                  top: "10px",
                                  right: "0px",
                                }}
                                href="#"
                                onClick={() => removeImage(index)}
                                className=""
                              >
                                <i className="fa-solid fa-xmark"></i>
                              </a>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div> */}
                </div>
              </div>
            </div>
            {/* second column */}
            <div className="basis-1/2">
              <div className="flex flex-col mt-6  gap-5">
                <div className="flex flex-col items-center gap-5 mt-5 ">
                  <div className="flex flex-row gap-4 items-start w-full">
                    <div className="flex flex-col gap-3">
                      <span className="text-[#707070] text-left font-montserrat text-xs font-normal ">
                        Property Type
                      </span>{" "}
                      <select
                        className="w-full text-[#707070] h-[40px] text-[12px] placeholder-[#707070] bg-white flex items-center rounded-[10px] border border-[#b5b3b3] pt-[10px] pr-[75px] pb-[10px] pl-[20px] placeholder-rgba(30, 30, 30, 0.7) placeholder:font-inter placeholder:text-[12px] font-[400]  "
                        value={property_type}
                        onChange={(e) => {
                          setProperty_type(e.target.value);
                        }}
                      >
                        <option value="select">Select Property Type</option>
                        <option value="house">House</option>
                        <option value="studio">Studio</option>
                        <option value="flat">Flat</option>
                      </select>
                    </div>
                    <div className="flex flex-col gap-3">
                      <span className="text-[#707070] text-left font-montserrat text-xs font-normal ">
                        Bill Type
                      </span>{" "}
                      <select
                        className="w-full text-[#707070] h-[40px] text-[12px] bg-white flex items-center rounded-[10px] border border-[#b5b3b3] pt-[10px] pr-[75px] pb-[10px] pl-[20px] placeholder-rgba(30, 30, 30, 0.7) placeholder:font-inter placeholder:text-[12px] font-[400]  "
                        value={bills_included}
                        onChange={(e) => {
                          setBills_included(e.target.value);
                        }}
                      >
                        <option value="select">Select Bill Included</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex flex-row gap-4 items-start w-full">
                    <div className="flex flex-col gap-3 w-full">
                      <span className="text-[#707070] text-left font-montserrat text-xs font-normal ">
                        Gender
                      </span>{" "}
                      <select
                        className="w-full text-[#707070] h-[40px] text-[12px] placeholder-[#707070] bg-white flex items-center rounded-[10px] border border-[#b5b3b3] pt-[10px] pr-[75px] pb-[10px] pl-[20px] placeholder-rgba(30, 30, 30, 0.7) placeholder:font-inter placeholder:text-[12px] font-[400]  "
                        value={gender}
                        onChange={(e) => {
                          setGender(e.target.value);
                        }}
                      >
                        <option value="select">Select Gender</option>
                        <option value="male only">Male only</option>
                        <option value="Female only">Female only</option>
                        <option value="LGBTQ+">LGBTQ+</option>
                        <option value="mixed">Mixed</option>
                      </select>
                    </div>
                    <div className="flex flex-col gap-3 w-full">
                      <span className="text-[#707070] text-left font-montserrat text-xs font-normal ">
                        Terms
                      </span>{" "}
                      <select
                        className="w-full text-[#707070] h-[40px] text-[12px] bg-white flex items-center rounded-[10px] border border-[#b5b3b3] pt-[10px] pr-[75px] pb-[10px] pl-[20px] placeholder-rgba(30, 30, 30, 0.7) placeholder:font-inter placeholder:text-[12px] font-[400]  "
                        value={term}
                        onChange={(e) => {
                          setTerm(e.target.value);
                        }}
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
                  </div>
                  <div className="flex flex-row gap-4 items-start w-full">
                    <div className="flex flex-col gap-3 w-full">
                      <span className="text-[#707070] text-left font-montserrat text-xs font-normal ">
                        Smokers Allowed
                      </span>{" "}
                      <select
                        className="w-full text-[#707070] h-[40px] text-[12px] placeholder-[#707070] bg-white flex items-center rounded-[10px] border border-[#b5b3b3] pt-[10px] pr-[75px] pb-[10px] pl-[20px] placeholder-rgba(30, 30, 30, 0.7) placeholder:font-inter placeholder:text-[12px] font-[400]  "
                        value={smokers_allowed}
                        onChange={(e) => {
                          setSmokers_allowed(e.target.value);
                        }}
                      >
                        <option value="select">Select Smokers Allowed</option>
                        <option value="No">No</option>
                        <option value="Yes">Yes</option>
                      </select>
                    </div>
                    <div className="flex flex-col gap-3 w-full">
                      <span className="text-[#707070] text-left font-montserrat text-xs font-normal ">
                        Pets Allowed
                      </span>{" "}
                      <select
                        className="w-full text-[#707070] h-[40px] text-[12px] bg-white flex items-center rounded-[10px] border border-[#b5b3b3] pt-[10px] pr-[75px] pb-[10px] pl-[20px] placeholder-rgba(30, 30, 30, 0.7) placeholder:font-inter placeholder:text-[12px] font-[400]  "
                        value={pets_allowed}
                        onChange={(e) => {
                          setPets_allowed(e.target.value);
                        }}
                      >
                        <option value="select">Select Pets Allowed</option>
                        <option value="No">No</option>
                        <option value="Yes">Yes</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex flex-row gap-4 items-start  w-full">
                    <div className="flex flex-col gap-3 w-full">
                      <span className="text-[#707070] text-left font-montserrat text-xs font-normal ">
                        Number of Rooms{" "}
                      </span>{" "}
                      <input
                        className="w-full h-[40px] flex items-center rounded-[10px] border border-[#b5b3b3] pt-[14px] pr-[30px] pb-[14px] pl-[20px] 
                    placeholder-[#707070] text-[12px] font-inter  placeholder:font-inter placeholder:text-[12px] font-[400]"
                        value={numbers_of_rooms}
                        onChange={(e) => {
                          setNumbers_of_rooms(e.target.value);
                        }}
                        type="number"
                      />
                    </div>
                    <div className="flex flex-col gap-3 w-full">
                      <span className="text-[#707070] text-left font-montserrat text-xs font-normal ">
                        Availability{" "}
                      </span>{" "}
                      <select
                        className="w-full text-[#707070] h-[40px] text-[12px] bg-white flex items-center rounded-[10px] border border-[#b5b3b3] pt-[10px] pr-[75px] pb-[10px] pl-[20px] placeholder-rgba(30, 30, 30, 0.7) placeholder:font-inter placeholder:text-[12px] font-[400]  "
                        value={availability}
                        onChange={(e) => {
                          setAvailability(e.target.value);
                        }}
                      >
                        <option value="select">Select Availability</option>
                        <option value="Immediately">Immediately</option>
                        <option value="Within 1 week">Within 1 week</option>
                        <option value="Within 1 month">Within 1 month</option>
                        <option value="Within 3 months">Within 3 months</option>
                      </select>
                    </div>
                  </div>
                  <div className="w-full gap-3">
                    <span className="text-[#707070] text-left font-montserrat text-xs font-normal ">
                      Type{" "}
                    </span>{" "}
                    <select
                      className=" w-full text-[#707070] h-[40px] text-[12px] placeholder-[#707070] bg-white flex items-center rounded-[10px] border border-[#b5b3b3] pt-[10px] pr-[75px] pb-[10px] pl-[20px] placeholder-rgba(30, 30, 30, 0.7) placeholder:font-inter placeholder:text-[12px] font-[400]  "
                      value={type}
                      onChange={(e) => {
                        setType(e.target.value);
                      }}
                    >
                      <option value="select">Select Type</option>
                      <option value="individual">Individual</option>
                      <option value="shared ">Shared </option>
                    </select>
                  </div>
                  <div className="flex flex-row gap-4 items-start  w-full justify-between">
                    <div className="flex flex-col gap-3  w-full">
                      <span className="text-[#707070] text-left font-montserrat text-xs font-normal ">
                        Deposit{" "}
                      </span>{" "}
                      <input
                        className="w-full h-[40px] flex items-center rounded-[10px] border border-[#b5b3b3] pt-[14px] pr-[30px] pb-[14px] pl-[20px] 
                    placeholder-[#707070] text-[12px] font-inter  placeholder:font-inter placeholder:text-[12px] font-[400]"
                        value={deposit}
                        onChange={(e) => {
                          setDeposit(e.target.value);
                        }}
                        type="number"
                      />
                    </div>
                    <div className="flex flex-col gap-3  w-full">
                      <span className="text-[#707070] text-left font-montserrat text-xs font-normal ">
                        Monthly Rent{" "}
                      </span>{" "}
                      <input
                        className="w-full h-[40px] flex items-center rounded-[10px] border border-[#b5b3b3] pt-[14px] pr-[30px] pb-[14px] pl-[20px] 
                    placeholder-[#707070] text-[12px] font-inter  placeholder:font-inter placeholder:text-[12px] font-[400]"
                        type="number"
                        value={monthly_rent}
                        onChange={(e) => {
                          setMonthly_rent(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-4 justify-center items-center w-full ">
          <button className="w-44 h-[40px] flex-shrink-0 border rounded-full bg-white border-[#b5b3b3] text-[#01B3BB] font-montserrat text-[14px] ">
            Cancel
          </button>
          <button
            className="w-44 h-[40px] flex-shrink-0 border rounded-full  bg-[#01B3BB] text-[#FEFCFE] font-montserrat text-[14px] px-4"
            onClick={UpdateProperty}
          >
            Update Property
          </button>
        </div>
      </div>
    </div>
  );
}
