import Image from "next/image";
import userAvatar from "@/public/pictures/user/user-01.png";
import iconDown from "@/public/ic_admin/ic_down.svg";

const AdminHeader = ({ title }) => {
  return (
    <div className="border-b-[1px] border-gray-300 w-full py-[10px] px-[32px] flex flex-row justify-between items-center">
      <div className="text-[24px] font-semibold tracking-wide">{title}</div>
      <div className="flex flex-row items-center">
        <div className="flex flex-col items-end w-fit">
          <div className="text-[15px] w-fit font-medium">Huynh Duy Dong</div>
          <div className="font-light text-[12px] w-fit">Admin</div>
        </div>
        <div className="rounded-[100px] p-[8px] bg-gray-300 ml-[8px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6 "
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>
            </div>
      </div>
    </div>
  );
};

export default AdminHeader;