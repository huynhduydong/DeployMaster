"use client";

import AdminHeader from "@/components/custom/Admin/AdminHeader";
import AdminSideBar from "@/components/custom/Admin/AdminSideBar";
import icDashboards from "@/public/ic_admin/ic_dashboards.svg";
import icProduct from "@/public/ic_admin/ic_product.svg";
import icTag from "@/public/ic_admin/ic_tag.svg";
import icOrder from "@/public/ic_admin/ic_order.svg";
import icSetting from "@/public/ic_admin/ic_setting.svg";
import icExit from "@/public/ic_admin/ic_exit.svg";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";
import icNotification from "@/public/ic_admin/ic_notification.svg";

export default function AdminLayout({ children }) {
  const menu = [
    { name: "Dashboard", icon: icDashboards, link: "/admin" },
    { name: "Product", icon: icProduct, link: "/admin/product" },
    { name: "Category", icon: icTag, link: "/admin/category" },
    { name: "Order", icon: icOrder, link: "/admin/order" },
    { name: "Notification", icon: icNotification, link: "/admin/notification" },

  ];

  const others = [
    { name: "Setting", icon: icSetting, link: "/admin/user/settings" },
        { name: "Exit", icon: icExit, link: "/admin/exit" },
  ];

  const pathname = usePathname();
  const [headerTitle, setHeaderTitle] = useState("");
  useEffect(() => {
    const name = menu.find((item) => item.link === pathname)?.name;
    if (name) {
      setHeaderTitle(name);
    } else {
      const name = others.find((item) => item.link === pathname)?.name;
      if (name) {
        setHeaderTitle(name);
      }
    }
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-row">
      <AdminSideBar menu={menu} others={others} />
      <div className="flex-grow flex flex-col">
        <AdminHeader title={headerTitle} />
        <div className="flex-grow">{children}</div>
      </div>
    </div>
  );
}