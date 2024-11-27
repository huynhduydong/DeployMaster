import ImagePicker from "@/components/custom/Admin/ImagePicker";
import iconPlusBlue from "@/public/ic_admin/ic_plus_blue.svg";
import { NameValueForm } from "./NameValueForm";
import Image from "next/image";

export const NotificationInfoForm = ({
  title,
  onTitleChange,
  message,
  onMessageChange,
  disabled,
}) => {
  return (
    <>
      <div className="flex flex-col items-start justify-start w-full h-[500px] overflow-y-scroll py-[8px]">
        {/* User general information */}
        <div className="flex flex-row w-full">
          <div className="w-full p-[16px] bg-white rounded-[8px] border-[1.5px] border-gray-300 flex flex-grow flex-col mr-[16px] mt-[16px]">
            <div className="text-base text-black font-semibold">
              Thông tin thông báo
            </div>
            <div className="flex flex-col items-start justify-start bg-white mt-[12px] flex-grow">
              <div className="w-full mt-[12px]">
                <div className="text-sm font-semibold text-black flex flex-col justify-start items-start">
                  Tiêu đề
                </div>
                <div className="w-full relative flex items-center justify-center flex-row">
                  <input
                    disabled={disabled || false}
                    value={title || ""}
                    onChange={onTitleChange}
                    type="text"
                    className="border-[1.5px] border-gray-300 bg-gray-50 focus:outline-none focus:border-blue-600 focus:border-[1.5px] text-black text-sm py-[8px] px-[16px] rounded-[6px] w-full mt-[4px] pr-[32px]"
                  />
                </div>
              </div>

              <div className="w-full mt-[12px]">
                <div className="text-sm font-semibold text-black flex flex-col justify-start items-start">
                  Nội dung
                </div>
                <div className="w-full relative flex items-center justify-center flex-row">
                  <textarea
                    disabled={disabled || false}
                    value={message || ""}
                    onChange={onMessageChange}
                    className="border-[1.5px] border-gray-300 bg-gray-50 focus:outline-none focus:border-blue-600 focus:border-[1.5px] text-black text-sm py-[8px] px-[16px] rounded-[6px] w-full mt-[4px] pr-[32px]"
                    rows="5"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};