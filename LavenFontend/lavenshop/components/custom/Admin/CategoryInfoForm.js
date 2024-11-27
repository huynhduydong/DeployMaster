import ImagePicker from "@/components/custom/Admin/ImagePicker";
import iconPlusBlue from "@/public/ic_admin/ic_plus_blue.svg";
import { NameValueForm } from "./NameValueForm";
import Image from "next/image";

export const CategoryInfoForm = ({
  selectedFiles,
  onFileAccepted,
  categoryName,
  onCategoryNameChange,
  categoryThumbnailUrl,
}) => {
  return (
    <>
      <div className="flex flex-col items-start justify-start w-full h-[500px] overflow-y-scroll py-[8px]">
        {/* Image picker and price */}
        <div className="flex flex-row w-full">
          {/* Image picker */}
          <div className="p-[16px] bg-white rounded-[8px] border-[1.5px] border-gray-300">
            <div className="text-base text-black font-semibold">
              Ảnh phân loại
            </div>
            <div className="flex flex-row items-center justify-center p-[16px] bg-white rounded-[8px] border-[1.5px] border-gray-300 mt-[24px]">
              <ImagePicker
                onFileAccepted={onFileAccepted}
                width={"240px"}
                height={"240px"}
              />
              <div className=" flex items-center justify-center">
                <div className="w-[240px] h-[240px]">
                  {categoryThumbnailUrl && selectedFiles.length <= 0 && (
                    <div className="ml-[16px] rounded-[8px]">
                      <img
                        src={categoryThumbnailUrl}
                        alt={categoryThumbnailUrl}
                        className="w-[240px] h-[240px]"
                      />
                    </div>
                  )}
                  {selectedFiles.length > 0 && (
                    <div>
                      {selectedFiles.map((file, index) => (
                        <div key={index} className="ml-[16px] rounded-[8px]">
                          <Image
                            src={URL.createObjectURL(new Blob([file]))}
                            alt={file.name}
                            width={240}
                            height={240}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Price */}
          <div className="p-[16px] bg-white rounded-[8px] border-[1.5px] border-gray-300 flex flex-grow flex-col mx-[16px] h-fit">
            <div className="text-base text-black font-semibold">
              Thông tin phân loại
            </div>
            <div className="flex flex-col items-start justify-start bg-white mt-[12px] flex-grow">
              <div className="w-full mt-[12px]">
                <div className="text-sm font-semibold text-black flex flex-col justify-start items-start">
                  Tên
                </div>
                <div className="w-full relative flex items-center justify-center flex-row">
                  <input
                    value={categoryName || ""}
                    type="text"
                    className="border-[1.5px] border-gray-300 bg-gray-50 focus:outline-none focus:border-blue-600 focus:border-[1.5px] text-black text-sm py-[8px] px-[16px] rounded-[6px] w-full mt-[4px] pr-[32px]"
                    onChange={onCategoryNameChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};