import iconRemove from "@/public/ic_admin/ic_remove.svg";
import Image from "next/image";

export const NameValueForm = ({
  name,
  value,
  onNameChange,
  onValueChange,
  onRemove,
}) => {
  return (
    <>
      <div className="w-full mt-[12px] flex flex-row items-center">
        <div className="relative flex items-start justify-center flex-col w-2/5">
          <div className="text-sm font-semibold text-black flex flex-col justify-start items-start w-full">
            Tên
          </div>
          <input
            value={name || ""}
            onChange={onNameChange}
            type="text"
            className="border-[1.5px] border-gray-300 bg-gray-50 focus:outline-none focus:border-blue-600 focus:border-[1.5px] text-black text-sm py-[8px] px-[16px] rounded-[6px] w-full mt-[4px] pr-[32px]"
          />
        </div>

        <div className="relative flex items-start justify-center flex-col ml-[16px] flex-grow">
          <div className="text-sm font-semibold text-black flex flex-col justify-start items-start w-full">
            Giá trị
          </div>
          <input
            value={value || ""}
            onChange={onValueChange}
            type="text"
            className="border-[1.5px] border-gray-300 bg-gray-50 focus:outline-none focus:border-blue-600 focus:border-[1.5px] text-black text-sm py-[8px] px-[16px] rounded-[6px] w-full mt-[4px] pr-[32px]"
          />
        </div>

        <Image
          alt="Remove icon"
          src={iconRemove}
          height={20}
          width={20}
          className="mt-[22px] ml-[8px] cursor-pointer hover:opacity-80"
          onClick={onRemove}
        />
      </div>
    </>
  );
};