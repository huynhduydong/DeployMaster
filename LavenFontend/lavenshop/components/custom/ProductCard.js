import React from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import product1 from "@/public/pictures/product/product1.jpg";
import Image from "next/image";
import trimText from "@/utils/trimText";
import { convertPrice } from "@/utils/convertPrice";
import { convertNumber } from "@/utils/convertNumber";

const ProductCard = ({ id, product }) => {
  return (
    <Card className="w-full h-full flex-col justify-between rounded-sm p-[8px] shadow-none hover:border-blue-500 hover:cursor-pointer">
      <CardHeader>
        <img
          src={product.thumbnailUrl}
          className="rounded-sm self-center h-[178px] w-[181px]"
          alt="product-prototype"
        />
      </CardHeader>
      <CardContent className="flex flex-col flex-grow justify-between mt-[8px] w-[181px]">
        {/* Tên sp */}
        <div className="text-xs h-[2.5em] line-clamp-2">
          {trimText(product.name, 50)}
        </div>

        {/* Giá tiền */}
        <div className="flex gap-2 items-center justify-between mt-[8px]">
          <div className="flex text-black font-semibold">
            <div className="">₫</div>
            <div>
              {convertPrice(
                product.price - product.price * product.discountRate * 0.01
              )}
            </div>
          </div>

          {product.discountRate > 0 && (
            <>
              <div className="flex text-gray-500 line-through text-xs">
                <div className="text-xs">₫</div>
                <div>
                  {trimText(
                    convertPrice(product.price),
                    product.price.toString().length >= 8 ? 3 : 5
                  )}
                </div>
              </div>
              <div className="bg-stone-100 text-black font-semibold text-xs h-fit p-[2px] rounded-sm">
                -{product.discountRate}%
              </div>
            </>
          )}
        </div>

        <div className="flex text-xs items-center mt-2 gap-2 justify-between">
          <div className="flex items-center">
            {Array.from({ length: 5 }).map((_, index) => (
              <svg
                key={index}
                className="w-3 h-3 text-yellow-300"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
            ))}
          </div>
          <div className="flex justify-between w-full mt-px">
            <div className="text-gray-500">
              ({convertNumber(product.reviewCount)})
            </div>
            <div>Đã bán {convertNumber(product.quantitySold, 1)}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;