import React from "react";
import { ProductImageSlide } from "./ProductImageSlide";

export const ProductImage = ({ product }) => {
  return (
    <div className="flex flex-col gap-2 px-4">
      <div className="border rounded-lg relative p-1">
        <img
          src={product.thumbnailUrl}
          alt="Product Image"
          className="w-[400px]"
        />
      </div>
      <div className="flex border border-yellow-600 relative">
        <div className="flex w-100 relative mx-2 my-1">
          <ProductImageSlide alt={"image-slide"} />
          <ProductImageSlide alt={"image-slide"} />
          <ProductImageSlide alt={"image-slide"} />
          <ProductImageSlide alt={"image-slide"} />
        </div>
      </div>
    </div>
  );
};