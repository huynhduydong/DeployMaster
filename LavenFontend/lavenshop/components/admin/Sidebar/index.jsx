"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import SidebarLinkGroup from "./SidebarLinkGroup";
import { nunito } from "@/components/ui/fonts";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const pathname = usePathname();

  const trigger = useRef(null);
  const sidebar = useRef(null);

  // Get sidebar state from localStorage
  const getSidebarStateFromLocalStorage = () => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem("sidebar-expanded") === "true";
  };

  const [sidebarExpanded, setSidebarExpanded] = useState(
    getSidebarStateFromLocalStorage()
  );

  // Close sidebar on outside click
  useEffect(() => {
    const clickHandler = (event) => {
      if (
        !sidebar.current ||
        !trigger.current ||
        sidebar.current.contains(event.target) ||
        trigger.current.contains(event.target)
      )
        return;
      setSidebarOpen(false);
    };

    if (typeof window !== "undefined") {
      document.addEventListener("click", clickHandler);
    }
    return () => {
      if (typeof window !== "undefined") {
        document.removeEventListener("click", clickHandler);
      }
    };
  }, [sidebarOpen]);

  // Close sidebar when "Esc" key is pressed
  useEffect(() => {
    const keyHandler = (event) => {
      if (event.key === "Escape") {
        setSidebarOpen(false);
      }
    };

    if (typeof window !== "undefined") {
      document.addEventListener("keydown", keyHandler);
    }
    return () => {
      if (typeof window !== "undefined") {
        document.removeEventListener("keydown", keyHandler);
      }
    };
  }, [sidebarOpen]);

  // Save sidebar state to localStorage and update body class
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
      const body = document.querySelector("body");
      if (body) {
        sidebarExpanded
          ? body.classList.add("sidebar-expanded")
          : body.classList.remove("sidebar-expanded");
      }
    }
  }, [sidebarExpanded]);

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black text-white duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        <Link href="/" className={`${nunito.className} py-4 px-3`}>
          <div className="flex-col items-center justify-center text-primary">
            <div className="flex items-center justify-center">
              <div className="text-5xl font-extrabold">Har</div>
              <div className="text-5xl font-bold text-yellow-500">be</div>
            </div>
            <div className="font-bold text-center">Tốt & Nhanh</div>
          </div>
        </Link>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <svg
            className="fill-current"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill=""
            />
          </svg>
        </button>
      </div>
      {/* Sidebar Header */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* Sidebar Menu */}
        <nav className="mt-5 px-4 py-4 lg:mt-9 lg:px-6">
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-gray-400">
              MENU
            </h3>
            <ul className="mb-6 flex flex-col gap-1.5">
              <SidebarLinkGroup activeCondition={pathname === "/dashboard"}>
                {(handleClick, open) => (
                  <>
                    <Link
                      href="#"
                      className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                        pathname === "/dashboard" &&
                        "bg-graydark dark:bg-meta-4"
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        sidebarExpanded
                          ? handleClick()
                          : setSidebarExpanded(true);
                      }}
                    >
                      Dashboard
                    </Link>
                  </>
                )}
              </SidebarLinkGroup>
            </ul>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
