"use client";

import React from "react";
import Image from "next/image";
import { useState, useEffect } from "react";
import icPlus from "@/public/ic_admin/ic_plus.svg";
import icEditBlue from "@/public/ic_admin/ic_edit_blue.svg";
import icBin from "@/public/ic_admin/ic_bin.svg";
import { PaginationSelection } from "@/components/HomePage";
import CustomTable from "@/components/custom/Admin/Table/CustomTable";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  createNotification,
  deleteNotificationById,
  getAllNotifications,
  getShockNotificationById,
  searchNotificationByTitle,
  updateNotificationById,
} from "@/services/notificationSevice";
import SearchInput from "@/components/custom/SearchInput";
import { CustomCreateDialog } from "@/components/custom/Admin/CustomCreateDialog";
import { CustomUpdateDialog } from "@/components/custom/Admin/CustomUpdateDialog";
import { CustomAlertDialog } from "@/components/custom/Admin/CustomAlertDialog";
import { NotificationInfoForm } from "@/components/custom/Admin/Form/NotificationForm";
import NotificationRow from "@/components/custom/Admin/Table/NotificationRow";
import { CustomViewDialog } from "@/components/custom/Admin/CustomViewDialog";

const NotificationAdminPage = () => {
  const [notificationList, setNotificationList] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(9);
  const [totalItems, setTotalItems] = useState(0);
  const notificationField = [
    { name: "Ngày tạo", width: "25%" },
    { name: "Tiêu đề", width: "30%" },
    { name: "Nội dung", width: "45%" },
  ];
  const [selectedNotification, setSelectedNotification] = useState(-1);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [searchKey, setSearchKey] = useState("");

  const getSearchNotificationData = async () => {
    const data = await searchNotificationByTitle(
      searchKey,
      currentPage,
      itemsPerPage
    );
    console.log("Search:", data);
    setNotificationList(data.content);
    
    const shockNoti = await getShockNotificationById(2);
    console.log("Shock notification: ", shockNoti);
    setNotificationList((prevData) => {
      const updatedData = [...prevData];
      if (updatedData.length > totalItems - 1) updatedData.pop();
      updatedData.push(shockNoti);
      updatedData.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      return updatedData;
    });
    setTotalItems(data.totalElements);
  };

  const getNotificationData = async () => {
    const data = await getAllNotifications(currentPage, itemsPerPage);
    console.log(data);
    setNotificationList(data?.content);
   
    const shockNoti = await getShockNotificationById(2);
    console.log("Shock notification: ", shockNoti);
    setNotificationList((prevData) => {
      const updatedData = [...prevData];
      updatedData.pop();
      updatedData.push(shockNoti);
      updatedData.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      return updatedData;
    });
    setTotalItems(data.totalElements);
  };

  const resetState = () => {
    setTitle("");
    setMessage("");
  };

  const showError = (errorArr) => {
    errorArr.forEach((error) => {
      toast.error(error[1]);
    });
  };

  useEffect(() => {
    if (searchKey && searchKey.length > 0) {
      getSearchNotificationData();
    } else {
      getNotificationData();
    }
  }, [currentPage]);

  return (
    <div className="flex flex-col justify-between items-center h-full">
      {/* Search bar */}
      <div className="flex flex-row items-center w-full border-b-[1px] border-gray-300 px-[32px] py-[10px]">
        <div className="flex flex-row items-center mr-[64px]">
          <div className="text-[18px] font-semibold">Tổng thông báo</div>
          <div className="px-[8px] py-[1px] bg-blue-600 text-white text-[14px] rounded-[16px] ml-[12px] flex items-center justify-center">
            {totalItems}
          </div>
        </div>

        <div className="grow">
          <SearchInput
            placeholder={"Nhập từ khóa tiêu đề..."}
            value={searchKey}
            onValueChange={(e) => setSearchKey(e.target.value)}
            onSubmit={(e) => {
              e.preventDefault();
              if (searchKey && searchKey.length > 0) {
                getSearchNotificationData();
              } else {
                getNotificationData();
              }
            }}
          />
        </div>

        <div className="flex flex-row justify-center items-center gap-[16px] ml-[64px]">
          {/* View Noti  */}
          <CustomViewDialog
            itemTrigger={
              <button
                className="border-blue-600 border-[1px] px-[20px] py-[6px] rounded-[8px] hover:drop-shadow-xl hover:opacity-80 flex flex-row items-center justify-center bg-blue-50 w-[110px]"
                style={{ opacity: selectedNotification != -1 ? 1 : 0 }}
                disabled={selectedNotification == -1}
                onClick={async () => {
                  resetState();
                  setTitle(notificationList[selectedNotification].title);
                  setMessage(notificationList[selectedNotification].message);
                }}
              >
                <div className="text-blue-600 text-[14px] font-bold ml-[4px]">
                  Xem
                </div>
              </button>
            }
            title={`Thông báo: ${
              selectedNotification != -1 &&
              notificationList[selectedNotification].title
            }`}
            itemContent={
              <NotificationInfoForm
                message={message}
                onMessageChange={(e) => {
                  setMessage(e.target.value);
                }}
                title={title}
                onTitleChange={(e) => {
                  setTitle(e.target.value);
                }}
                disabled={true}
              />
            }
          />

          {/* Delete noti button */}
          <CustomAlertDialog
            itemTrigger={
              <button
                className="border-red-500 border-[1px] px-[20px] py-[6px] rounded-[8px] hover:drop-shadow-xl hover:opacity-80 flex flex-row items-center justify-center bg-red-50 w-[110px]"
                style={{ opacity: selectedNotification != -1 ? 1 : 0 }}
                disabled={selectedNotification == -1}
              >
                <Image alt="Bin icon" src={icBin} width={12} height={12} />
                <div className="text-red-500 text-[14px] font-bold ml-[4px]">
                  Xóa
                </div>
              </button>
            }
            title={
              "Xóa thông báo: " + notificationList[selectedNotification]?.title
            }
            content={
              "Bạn có chắc chắn muốn xóa thông báo này? Thao tác này không thể hoàn tác!"
            }
            cancelContent={"Hủy"}
            confirmContent={"Xóa"}
            onConfirm={async () => {
             
              const res = await deleteNotificationById(
                notificationList[selectedNotification].id
              );
              console.log(res);
              if (res.status == 200) {
                toast.success("Xóa thông báo thành công");
                await getNotificationData();
                setSelectedNotification(-1);
              } else {
                const errorArray = Object.entries(res.data);
                showError(errorArray);
              }
            }}
          />

          {/* Update noti dialog */}
          <CustomUpdateDialog
            confirmDialogTitle={
              "Bạn có chắc chắn muốn cập nhật thông tin của thông báo này này?"
            }
            confirmDialogContent={
              "Thông tin của thông báo sẽ được lưu vào hệ thống."
            }
            confirmContent={"Cập nhật"}
            onConfirm={async () => {
              
              const res = await updateNotificationById(
                {
                  title: title,
                  message: message,
                },
                notificationList[selectedNotification].id
              );
              console.log(res);
              if (res.status == 200) {
                toast.success("Cập nhật thông báo thành công");
                await getNotificationData();
                resetState();
              } else {
                const errorArray = Object.entries(res.data);
                showError(errorArray);
              }
            }}
            onCancel={() => {
              console.log("Cancel update notification");
              resetState();
            }}
            itemTrigger={
              <button
                className="border-blue-600 border-[1px] px-[20px] py-[6px] rounded-[8px] hover:drop-shadow-xl hover:opacity-80 flex flex-row items-center justify-center bg-blue-50 w-[110px]"
                style={{ opacity: selectedNotification != -1 ? 1 : 0 }}
                disabled={selectedNotification == -1}
                onClick={() => {
                  resetState();
                  setTitle(notificationList[selectedNotification].title);
                  setMessage(notificationList[selectedNotification].message);
                }}
              >
                <Image
                  alt="Edit icon"
                  src={icEditBlue}
                  width={12}
                  height={12}
                />
                <div className="text-blue-600 text-[14px] font-bold ml-[4px]">
                  Sửa
                </div>
              </button>
            }
            title={"Cập nhật thông tin thông báo"}
            itemContent={
              <NotificationInfoForm
                message={message}
                onMessageChange={(e) => {
                  setMessage(e.target.value);
                }}
                title={title}
                onTitleChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            }
          />

          {/* Create noti dialog */}
          <CustomCreateDialog
            confirmDialogTitle={"Bạn có chắc chắn muốn thêm thông báo này?"}
            confirmDialogContent={
              "Thông tin thông báo sẽ được thêm vào hệ thống."
            }
            confirmContent={"Thêm"}
            onConfirm={async () => {
              
              const res = await createNotification(
                {
                  title: title,
                  message: message,
                },
              );
              console.log(res);
              if (res.status == 201) {
                toast.success("Thêm thông báo thành công");
                await getNotificationData();
                setSelectedNotification(-1);
                resetState();
              } else {
                const errorArray = Object.entries(res.data);
                showError(errorArray);
              }
            }}
            onCancel={() => {
              console.log("Cancel create notification");
              // resetState();
            }}
            itemTrigger={
              <button className="bg-blue-600 px-[20px] py-[6px] rounded-[8px] hover:drop-shadow-xl hover:opacity-80 flex flex-row items-center justify-center w-[110px]">
                <Image alt="Plus icon" src={icPlus} width={12} height={12} />
                <div className="text-white text-[14px] font-bold  ml-[4px]">
                  Thêm
                </div>
              </button>
            }
            title={"Thêm thông báo"}
            itemContent={
              <NotificationInfoForm
                message={message}
                onMessageChange={(e) => {
                  setMessage(e.target.value);
                }}
                title={title}
                onTitleChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            }
          />
        </div>
      </div>

      {/* User table data */}
      <div className="flex flex-col justify-between items-center grow px-[32px] py-[20px] w-full">
        <CustomTable
          data={notificationList}
          renderRow={(item, index) => (
            <NotificationRow
              key={index}
              notification={item}
              onSelected={() => {
                selectedNotification == index
                  ? setSelectedNotification(-1)
                  : setSelectedNotification(index);
              }}
              className={selectedNotification == index ? "bg-blue-200" : ""}
            />
          )}
          field={notificationField}
        />

        {/* Pagination */}
        <div>
          <PaginationSelection
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
      <ToastContainer position="top-center" />
    </div>
  );
};

export default NotificationAdminPage;