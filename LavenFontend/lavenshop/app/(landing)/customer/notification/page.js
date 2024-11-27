"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { PaginationSelection } from "@/components/HomePage";
import { getAllNotifications } from "@/services/notificationSevice";
import trimText from "@/utils/trimText";
import iconEye from "@/public/ic_eye.svg";
import iconDiscount from "@/public/ic_profile/ic_discount.svg";
import { CustomViewNoti } from "@/components/custom/Customer/CustomViewNoti";

const NotificationPage = () => {
  const [notificationList, setNotificationList] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [totalItems, setTotalItems] = useState(0);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    return formattedDate;
  };

  const getNotificationData = async () => {
    const data = await getAllNotifications(currentPage, itemsPerPage);
    console.log(data);
    setNotificationList(data?.content);
    setTotalItems(data.totalElements);
  };

  useEffect(() => {
    getNotificationData();
  }, [currentPage]);

  return (
    <>
      <div className="bg-white h-fit pb-10 rounded-md">
        <div className="mx-auto max-w-270 mt-[20px]">
          {/* <Breadcrumb pageName="Settings" /> */}

          <div className="rounded-sm bg-white shadow-default">
            <div className="px-7 py-4">
              <h3 className="text-xl font-medium text-black">
                Thông báo của tôi
              </h3>
            </div>
            <div className="px-7">
              {/* Notification list */}
              {notificationList && notificationList.length > 0 ? (
                notificationList.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between border-b border-gray-200 py-4 w-full hover:bg-blue-100 px-[16px] rounded-[8px]"
                  >
                    <div
                      className="flex items-center pr-[16px]"
                      style={{ width: "30%" }}
                    >
                      {trimText(item.title, 24)}
                    </div>
                    <div
                      className="flex flex-row items-center justify-between"
                      style={{ width: "70%" }}
                    >
                      <div
                        className="flex flex-col items-start justify-start"
                        style={{ width: "90%" }}
                      >
                        <div className="text-gray-400 text-xs italic w-full">
                          {formatDate(item.timestamp)}
                        </div>
                        <div className="text-gray-400 text-sm w-full">
                          {item.message}
                        </div>
                      </div>

                      <div className="cursor-pointer">
                        <CustomViewNoti
                          itemTrigger={
                            <Image
                              alt="Show product info icon"
                              src={iconEye}
                              className="w-[20px] h-[20px]"
                            />
                          }
                          title={"THÔNG BÁO"}
                          itemContent={
                            <>
                              <div className="flex flex-col items-center justify-center w-full">
                                <Image
                                  src={iconDiscount}
                                  width={120}
                                  height={120}
                                />
                                <div className="text-center text-lg font-semibold text-black mt-[20px] w-full">
                                  {item.title}
                                </div>
                                <div className="text-center text-xs italic text-gray-400 w-full">
                                  {formatDate(item.timestamp)}
                                </div>
                                <div className="text-center text-sm text-gray-600 mt-[20px] w-full">
                                  {item.message}
                                </div>
                              </div>
                            </>
                          }
                        />
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-5">Không có thông báo nào</div>
              )}

              {/* Pagination */}
              {notificationList && notificationList.length > 0 ? (
                <div>
                  <PaginationSelection
                    totalItems={totalItems}
                    itemsPerPage={itemsPerPage}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                  />
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotificationPage;