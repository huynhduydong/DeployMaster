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
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="bg-gray-100">
      {/* Badges */}
      <div className="flex justify-center pt-4 mx-24">
        <div className="flex flex-grow justify-center gap-11 p-4 bg-white rounded-md">
          {/* Badge items */}
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
            <div>
              <div className="text-sm font-bold">Chất lượng</div>
              <div className="text-xs text-gray-500">Cam kết chính hãng</div>
            </div>
          </div>
          <BorderSide />
          {/* Other Badge items */}
        </div>
      </div>

      {/* Promotion */}
      <div className="flex justify-center pt-4 mx-24">
        <div className="flex flex-grow justify-center p-4 bg-white rounded-md">
          <div className="flex gap-1 w-fit">
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
        onClick={scrollToTop}
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
          <PaginationPrevious onClick={handlePrevPage} />
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
          <PaginationNext onClick={handleNextPage} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default HomePage;
