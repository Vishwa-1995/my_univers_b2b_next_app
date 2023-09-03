"use client";
import React, { useState } from 'react'
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ViewGiftsProducts from './viewGifts';

export default function Product() {
    const [isVoucherActive, setIsVoucherActive] = useState(false); // Set to true
    const [isProductActive, setIsProductActive] = useState(true);
    const [openProduct, setOpenProduct] = useState(false);
    const [offer_subtype , setOffer_subtype] = useState('')
  const router = useRouter()
    const handleVoucherClick = () => {
      if (!openProduct) {
          router.push('/gifts/voucher')
  
        setIsVoucherActive(true);
        setIsProductActive(false);
      }
    };
  
    const handleProductClick = () => {
      if (!openProduct) {
        setIsProductActive(true);
        setIsVoucherActive(false);
      }
    };
  
    const openAddForm = () => {
      if (isProductActive === true) {
        setOpenProduct(true);
  setOffer_subtype('products')
  router.push('/gifts/product-offer')
      }else if(isVoucherActive == true){
        setOffer_subtype('vouchers')
      }
    };
  
    const closeAddForm = () => {
      setOpenProduct(false);
      setIsVoucherActive(true);
      setIsProductActive(false);
    };
  
    return (
      <div>
        <div className="container 2xl:px-20 px-2 mx-auto flex justify-between py-10">
          <div className='flex items-center 2xl:gap-10 gap-4'>
            <button
              className={`rounded-full  px-4 py-2  xl:w-32 xl:h-14 2xl:w-36 2xl:h-16 ${
                isVoucherActive
                  ? 'bg-gradient-to-r from-[#02b3bd] to-[#00868e] text-white'
                  : 'bg-gray-300 text-black cursor-not-allowed'
              }`}
              onClick={handleVoucherClick}
              disabled={openProduct}
            >
              Voucher
            </button>
            <button
              className={`rounded-full  px-4 py-2  xl:w-32 xl:h-14 2xl:w-36 2xl:h-16 ${
                isProductActive
                  ? 'bg-gradient-to-r from-[#02b3bd] to-[#00868e] text-white'
                  : 'bg-gray-300 text-black cursor-not-allowed'
              }`}
              onClick={handleProductClick}
              disabled={openProduct}
            >
              Product
            </button>
          </div>
          <button className="bg-[#00868e] text-white px-4 py-2 rounded-full xl:w-32 xl:h-14 2xl:w-36 2xl:h-16" onClick={openAddForm}>
            {isVoucherActive ? 'Add Voucher' : isProductActive ? 'Add Product' : 'Add Voucher'}
          </button>
        </div>
  
        <ViewGiftsProducts/>

      </div>
    );
  }
  