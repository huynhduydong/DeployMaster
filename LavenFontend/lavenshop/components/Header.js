"use client";

import { Input } from "./ui/input";
import { Button } from "./ui/button";
import SearchInput from "./custom/SearchInput";
import { Separator } from "./ui/separator";
import DialogAddress from "./custom/DialogAddress";
import BorderSide from "./custom/BorderSide";
import Link from "next/link";
import { nunito } from "./ui/fonts";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Header = () => {
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();
  const handleSearchProduct = async (event) => {
  event.preventDefault();
  router.push("/search?name=" + searchValue);
};
  return (
    <div className="flex justify-center px-32">
      <div className="pb-1 pt-2 bg-white grid grid-cols-12 items-start">
        {/* Logo */}
        <Link href="/" className={`${nunito.className}`}>
          <div className="flex-col items-center text-primary col-span-1">
            <div className="flex">
              <div className="text-5xl font-extrabold">La</div>
              <div className="text-5xl font-bold text-yellow-500">ven</div>
            </div>
            <div className="font-bold text-center">Tốt & Nhanh</div>
          </div>
        </Link>

        {/* Body */}
        <div className="col-span-11 ml-10">
          <div className="flex justify-center items-center gap-10 pl-10">
            {/* Search */}
            <div className="flex-grow pr-10">
            <SearchInput
          placeholder={"Bạn tìm gì hôm nay"}
          value={searchValue}
          onValueChange={(e) => setSearchValue(e.target.value)}
          onSubmit={handleSearchProduct}
        />            </div>

            {/* Buttons */}
            <div className="grid grid-cols-3 items-center gap-8 text-sm justify-end">
              {/* Trang chủ */}
              <Link
                href="/"
                className="flex text-primary items-center col-span-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
                  <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
                </svg>
                <div>Trang chủ</div>
              </Link>

              {/* Tài khoản */}
              <div className="flex items-center text-gray-500 col-span-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"
                  />
                </svg>
                <div>Tài khoản</div>
              </div>
 {/* Cart */}
          <Link href="/cart"  className="flex items-center border-l-2 pl-6 col-span-1 text-primary" >                
          <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                  />
                </svg>
                <div className="mb-4 w-5 h-4 rounded-full text-white flex items-center justify-center text-xs bg-red-500">
                  0
                </div>
                </Link>
            </div>
          </div>

          <div className="pl-10 my-1 flex justify-between items-center text-sm text-gray-500 ">
            {/* Danh mục */}
            <div className="flex gap-3">
              <div>điện gia dụng</div>
              <div>xe cộ</div>
              <div>mẹ & bé</div>
              <div>khỏe đẹp</div>
              <div>nhà cửa</div>
              <div>sách</div>
              <div>thể thao</div>
            </div>

            {/* Giao đến */}
            <div className="flex">
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                  />
                </svg>
                Giao đến:
              </div>
              <DialogAddress />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
