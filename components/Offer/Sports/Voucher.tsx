"use client";
import React, { useState } from 'react'
import { usePathname, useRouter, useSearchParams } from "next/navigation";


export default function Voucher() {
    const [isVoucherActive, setIsVoucherActive] = useState(true); // Set to true
    const [isProductActive, setIsProductActive] = useState(false);
    const [openProduct, setOpenProduct] = useState(false);
    const [offer_subtype , setOffer_subtype] = useState('')
  const router = useRouter()
    const handleVoucherClick = () => {
      if (!openProduct) {
        router.push('/sports/voucher')
        setIsVoucherActive(true);
        setIsProductActive(false);
      }
    };
  
    const handleProductClick = () => {
      if (!openProduct) {
        router.push('/sports/products')
        setIsProductActive(true);
        setIsVoucherActive(false);
      }
    };
  
    const openAddForm = () => {
      if (isProductActive === true) {
        setOpenProduct(true);
  setOffer_subtype('products')
  router.push('/offers/addProduct')
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
        <div className="flex justify-between p-4">
          <div>
            <button
              className={`mr-2 px-4 py-2 rounded-full w-36 h-16 ${
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
              className={`px-4 py-2 rounded-full w-36 h-16 ${
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
          <button className="bg-[#00868e] text-white px-4 py-2 rounded-full w-36 h-16" onClick={openAddForm}>
            {isVoucherActive ? 'Add Voucher' : isProductActive ? 'Add Product' : 'Add Voucher'}
          </button>
        </div>
  
        
      </div>
    );
  }
  