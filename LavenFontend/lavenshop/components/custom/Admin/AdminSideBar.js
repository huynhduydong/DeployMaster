"use client";

import Image from "next/image";
import logo from "@/public/ic_logo_2.svg";
import icExit from "@/public/ic_admin/ic_exit.svg";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { logout } from "@/services/authServices";

const AdminSideBar = ({ menu, others }) => {
  const pathname = usePathname();
  const [selectedTab, setSelectedTab] = useState("Dashboard");

  useEffect(() => {
    const name = menu.find((item) => item.link === pathname)?.name;
    if (name) {
      setSelectedTab(name);
    } else {
      const name = others.find((item) => item.link === pathname)?.name;
      if (name) {
        setSelectedTab(name);
      }
    }
  }, []);

  return (
    <div className="bg-black px-[32px] py-[16px] flex flex-col items-center">
      <Link href="/">
        <Image alt="Laven Logo" priority={true} src={logo} width={160} />
      </Link>
      <div className="flex flex-col justify-center h-fit mt-[64px]">
        <div className="text-gray-400 font-semibold text-[14px]">MENU</div>
        {menu.map((item, index) => (
          <Link
            key={index}
            href={item.link}
            onClick={() => {
              setSelectedTab(item.name);
            }}
          >
            <div
              className={`flex row items-center mt-[24px] py-[8px] pl-[12px] rounded-[8px] cursor-pointer transition-all duration-300 ease-in-out w-[180px] hover:bg-[#0077B6] ${
                selectedTab === item.name ? "bg-[#0077B6]" : "bg-transparent"
              }`}
            >
              <Image
                alt={`${item.name} icon`}
                src={item.icon}
                className="w-[20px] h-[20px] mr-[12px]"
              />
              <div className="text-gray-200 text-[17px] mr-[40px]">
                {item.name}
              </div>
            </div>
          </Link>
        ))}
        <button
          onClick={() => {
            logout();
          }}
        >
          <div className="flex row items-center mt-[24px] py-[8px] pl-[12px] rounded-[8px] cursor-pointer transition-all duration-300 ease-in-out w-[160px]">
            <Image alt={`Exit icon`} src={icExit} className="size-4 mr-2" />
            <div className="text-red-500 text-[17px] mr-[40px]">Đăng xuất</div>
          </div>
        </button>

        {/* <div className="text-gray-400 font-semibold text-[14px] mt-[40px]">
          OTHERS
        </div>
        {others.map((item, index) =>
          item.link != "/admin/exit" ? (
            <Link
              key={index}
              href={item.link}
              onClick={() => {
                setSelectedTab(item.name);
              }}
            >
              <div
                className="flex row items-center mt-[12px] py-[8px] pl-[12px] rounded-[8px] cursor-pointer transition-all duration-300 ease-in-out w-[160px]"
                style={{
                  backgroundColor:
                    selectedTab === item.name ? "#0077B6" : "transparent",
                }}
              >
                <Image
                  alt={`${item.name} icon`}
                  src={item.icon}
                  className="w-[20px] h-[20px] mr-[12px]"
                />
                <div className="text-gray-200 text-[17px] mr-[40px]">
                  {item.name}
                </div>
              </div>
            </Link>
          ) : ( */}
        {/* <button
              key={index}
              onClick={() => {
                setSelectedTab(item.name);
                logout();
              }}
            >
              <div
                className="flex row items-center mt-[12px] py-[8px] pl-[12px] rounded-[8px] cursor-pointer transition-all duration-300 ease-in-out w-[160px]"
                style={{
                  backgroundColor:
                    selectedTab === item.name ? "#0077B6" : "transparent",
                }}
              >
                <Image
                  alt={`${item.name} icon`}
                  src={item.icon}
                  className="w-[20px] h-[20px] mr-[12px]"
                />
                <div className="text-gray-200 text-[17px] mr-[40px]">
                  {item.name}
                </div>
              </div>
            </button>
          )
        )} */}
      </div>
    </div>
  );
};

export default AdminSideBar;