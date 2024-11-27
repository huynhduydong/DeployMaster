import Image from "next/image";
import React from "react";
import product1 from "@/public/pictures/product/product1.jpg";

export const ProductImageSlide = ({ src, alt }) => {
  return (
    <div className="flex-shrink-0 w-20 h-20 mr-4 border border-gray-300">
      <Image src={product1} alt={alt} className="object-cover w-full h-full" />
    </div>
  );
};
