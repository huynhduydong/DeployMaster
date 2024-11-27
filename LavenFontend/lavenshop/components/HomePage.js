"use client";
import { useState, useEffect } from "react";
import smallPromo1 from "@/public/pictures/promotion/smallPromo1.jpeg";
import smallPromo2 from "@/public/pictures/promotion/smallPromo2.jpeg";
import Image from "next/image";
import Link from "next/link";
import { Avatar } from "@/components/ui/avatar";
import BorderSide from "@/components/custom/BorderSide";
import CarouselPromotion from "@/components/custom/CarouselPromotion";
import ProductCard from "@/components/custom/ProductCard";
import CategoryCard from "@/components/custom/CategoryCard";
import { getCategories } from "@/services/categoryServices";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { getListProduct } from "@/services/productServices";
import { ArrowUp } from "@/components/icons/arrow-up";



const HomePage = () => {
  const [productList, setProductList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(24);
  const [totalItems, setTotalItems] = useState();
  const getProductData = async () => {
    const data = await getListProduct(currentPage, itemsPerPage);
    console.log(">>> check product_list:", data);
    setProductList(data.content);
    setTotalItems(data.totalElements);
  };
  const getCategoryData = async () => {
    const data = await getCategories();
    console.log(">>> check cate:", data);
    setCategoryList(data.content);
  };

  useEffect(() => {
    getProductData();
    getCategoryData();
  }, [currentPage]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <div className="bg-gray-100">
      {/* Badges */}
      <div className="flex justify-center pt-4 mx-24">
        <div className="flex flex-grow justify-center gap-11 p-4 bg-white rounded-md">
          <div className="flex items-center gap-2">
            <Avatar className="bg-primary flex justify-center items-center text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </Avatar>
            <div className="">
              <div className="text-sm font-bold">Chất lượng</div>
              <div className="text-xs text-gray-500">Cam kết chính hãng</div>
            </div>
          </div>
          <BorderSide />
          <div className="flex items-center gap-2">
            <Avatar className="bg-[#e600a0] flex justify-center items-center text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3"
                />
              </svg>
            </Avatar>
            <div className="">
              <div className="text-sm font-bold">Tiện lợi</div>
              <div className="text-xs text-gray-500">
                Thanh toán & giao hàng nhanh
              </div>
            </div>
          </div>
          <BorderSide />
          <div className="flex items-center gap-2">
            <Avatar className="bg-[#8dc94c] flex justify-center items-center text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m9 14.25 6-6m4.5-3.493V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0c1.1.128 1.907 1.077 1.907 2.185ZM9.75 9h.008v.008H9.75V9Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm4.125 4.5h.008v.008h-.008V13.5Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>
            </Avatar>
            <div className="">
              <div className="text-sm font-bold">Tích lũy</div>
              <div className="text-xs text-gray-500">
                Tích điểm mỗi đơn hàng
              </div>
            </div>
          </div>
          <BorderSide />
          <div className="flex items-center gap-2">
            <Avatar className="flex justify-center items-center text-white bg-violet-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                />
              </svg>
            </Avatar>
            <div className="">
              <div className="text-sm font-bold">Đổi trả</div>
              <div className="text-xs text-gray-500">Trong vòng 14 ngày</div>
            </div>
          </div>
          <BorderSide />
          <div className="flex items-center gap-2">
            <Avatar className="bg-[#ffbc59] flex justify-center items-center text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z"
                />
              </svg>
            </Avatar>
            <div className="">
              <div className="text-sm font-bold">Cửa hàng</div>
              <div className="text-xs text-gray-500">Giờ mở cửa</div>
            </div>
          </div>
        </div>
      </div>


      {/* Promotion */}
      <div className="flex justify-center pt-4 mx-24">
        <div className="flex flex-grow justify-center p-4 bg-white rounded-md">
          <div className="flex gap-1 w-fit ">
            <div className="w-full">
              <CarouselPromotion />
            </div>
          </div>
        </div>
      </div>

      {/* Category */}
      <div className="flex items-center justify-center pt-4 mx-32">
        <div className="flex-grow grid grid-cols-6 gap-2 bg-white p-4 rounded-md">
          {categoryList.map((item, index) => (
            <Link href={`/category/${item.urlKey}/${item.id}`} key={index}>
                            <CategoryCard categoryItem={item} />
            </Link>
          ))}
        </div>
      </div>

      {/* Products */}
      <div className="flex flex-wrap mx-24 gap-3 justify-start mt-5">
        {productList.map((item, index) => (
          <Link href={`/product/${item.productSlug}/${item.id}`} key={index}>
            <ProductCard id={item.id} product={item} />
          </Link>
        ))}
      </div>
      {/* Pagination */}
      <PaginationSelection
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      <Button
        className="fixed z-50 bottom-10 right-10 bg-primary"
        variant="primary"
        size="icon"
        onClick={() => scrollToTop()}
      >
        <ArrowUp className="size-5 text-white" />
      </Button>
    </div>
  );
};
export const PaginationSelection = ({
  totalItems,
  itemsPerPage,
  currentPage,
  setCurrentPage,
}) => {
  let pages = [];
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pages.push(i);
  }

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleCurrentPage = (page) => {
    setCurrentPage(page);
  };

  const handleNextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <Pagination className="pt-4">
      <PaginationContent className="bg-white rounded-md p-2">
        <PaginationItem className="hover:cursor-pointer">
          <PaginationPrevious onClick={() => handlePrevPage()} />
        </PaginationItem>
        {pages.map((page, index) => (
          <PaginationItem
            key={index}
            className={
              currentPage === page - 1
                ? "bg-primary text-white rounded-md hover:cursor-pointer"
                : "hover:cursor-pointer"
            }
          >
            <PaginationLink onClick={() => handleCurrentPage(page - 1)}>
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem className="hover:cursor-pointer">
          <PaginationNext onClick={() => handleNextPage()} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
export default HomePage;