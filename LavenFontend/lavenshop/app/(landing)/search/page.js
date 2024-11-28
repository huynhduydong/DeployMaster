"use client";

import React, { useState, useEffect, Suspense } from "react";
import { searchProductByName } from "@/services/productServices";
import { useRouter, useSearchParams } from "next/navigation";
import ProductCard from "@/components/custom/ProductCard";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

function SearchDetailContent({ searchValue, currentPage, itemsPerPage, setCurrentPage }) {
  const [sortedProducts, setSortedProducts] = useState([]);
  const [activeToggle, setActiveToggle] = useState(null);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      if (searchValue) {
        const data = await searchProductByName(searchValue, currentPage, itemsPerPage);
        setSortedProducts(data.content || []);
        setTotalItems(data.totalElements || 0);
        setTotalPages(data.totalPages || 0);
      }
    };
    fetchData();
  }, [searchValue, currentPage, itemsPerPage]);

  useEffect(() => {
    if (sortedProducts.length > 0) {
      let sorted = [...sortedProducts];
      if (activeToggle === "toggle1") {
        sorted.sort((a, b) => b.price - a.price);
      } else if (activeToggle === "toggle2") {
        sorted.sort((a, b) => a.price - b.price);
      } else if (activeToggle === "toggle3") {
        sorted.sort((a, b) => b.discountRate - a.discountRate);
      }
      setSortedProducts(sorted);
    }
  }, [activeToggle]);

  const handleToggle = (toggleName) => () => {
    setActiveToggle((prevToggle) => (prevToggle === toggleName ? null : toggleName));
  };

  const handleBackHome = () => {
    router.push("/");
  };

  return (
    <>
      <div className="bg-gray-100 pt-2">
        <div className="mx-32 font-bold text-stone-600 text-lg">
          <div className="mb-2">Sắp xếp theo</div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className={`bg-white hover:bg-blue-50 hover:border-blue-500 flex text-xs items-center gap-2 p-1 ${
                activeToggle === "toggle1" ? "bg-blue-50 border-blue-500" : "text-stone-600"
              }`}
              onClick={handleToggle("toggle1")}
            >
              Giá Cao - Thấp
            </Button>
            <Button
              variant="outline"
              className={`bg-white hover:bg-blue-50 hover:border-blue-500 flex text-xs items-center gap-2 p-1 ${
                activeToggle === "toggle2" ? "bg-blue-50 border-blue-500" : "text-stone-600"
              }`}
              onClick={handleToggle("toggle2")}
            >
              Giá Thấp - Cao
            </Button>
            <Button
              variant="outline"
              className={`bg-white hover:bg-blue-50 hover:border-blue-500 flex text-xs items-center gap-2 p-1 ${
                activeToggle === "toggle3" ? "bg-blue-50 border-blue-500" : "text-stone-600"
              }`}
              onClick={handleToggle("toggle3")}
            >
              Khuyến Mãi Hot
            </Button>
          </div>
        </div>
        <div className="flex flex-wrap mx-32 justify-start mt-5 items-center gap-[14px]">
          {sortedProducts.map((item, index) => (
            <Link href={`/product/${item.productSlug}/${item.id}`} key={index}>
              <ProductCard id={item.id} product={item} />
            </Link>
          ))}
          {sortedProducts.length === 0 && (
            <div className="flex justify-center items-center gap-4 flex-col w-full my-8">
              <div className="font-bold text-xl text-center">Không tìm thấy sản phẩm nào!</div>
              <button
                className="bg-primary w-fit text-white p-2 rounded-md shadow-sm font-semibold"
                onClick={handleBackHome}
              >
                Quay về trang chủ
              </button>
            </div>
          )}
        </div>
        <PaginationSelection
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      </div>
    </>
  );
}

export default function SearchDetail() {
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(30);
  const searchParams = useSearchParams();

  useEffect(() => {
    const searchQuery = searchParams?.get("name");
    if (searchQuery) {
      setSearchValue(searchQuery);
    }
  }, [searchParams]);

  return (
    <Suspense fallback={<div>Đang tải dữ liệu...</div>}>
      <SearchDetailContent
        searchValue={searchValue}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        setCurrentPage={setCurrentPage}
      />
    </Suspense>
  );
}

export const PaginationSelection = ({
  totalItems,
  itemsPerPage,
  currentPage,
  setCurrentPage,
  totalPages,
}) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

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
