"use client";

import { Separator } from "@/components/ui/separator";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const SearchInput = ({ placeholder, value, onValueChange, onSubmit ,disabled,
  opacity,}) => {
  return (
    <div style={{ opacity: opacity ? opacity : "1" }}>
      <label
        htmlFor="default-search"
        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
      >
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>

        <form onSubmit={onSubmit}>
          <input
            type="search"
            id="default-search"
            className="pr-20 block w-full p-2.5 ps-10 text-sm text-gray-900 border-gray-300 rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:outline-none focus:border-blue-500 border-2"
            placeholder={placeholder}
            value={value}
            onChange={onValueChange}
            disabled={disabled || false}

          />

          <button
            type="submit"
            className="absolute top-0 end-0 p-2.5 text-sm h-full text-primary bg-transparent rounded-e-lg border-0 border-gray-300 hover:bg-blue-200 focus:ring-blue-300 dark:bg-primary dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Tìm kiếm
          </button>
        </form>
      </div>
    </div>
  );
};

export default SearchInput;