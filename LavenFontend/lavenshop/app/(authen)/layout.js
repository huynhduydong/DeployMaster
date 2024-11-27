"use client";

import HeaderWithoutSearch from "@/components/HeaderWithoutSearch";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function AuthenLayout({ children }) {
  const pathName = usePathname();
  const [title, setTitle] = useState("");
  useEffect(() => {
    switch (pathName) {
      case "/login":
        setTitle("Đăng nhập");
        break;
      case "/register":
        setTitle("Đăng ký");
      default:
        break;
    }
  }, [pathName]);
  return (
    <div className="min-h-screen flex flex-col">
      <HeaderWithoutSearch pageTitle={title}></HeaderWithoutSearch>
      <div className="flex flex-grow">{children}</div>
    </div>
  );
}