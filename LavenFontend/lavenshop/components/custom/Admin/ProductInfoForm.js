import ImagePicker from "@/components/custom/Admin/ImagePicker";
import iconPlusBlue from "@/public/ic_admin/ic_plus_blue.svg";
import { NameValueForm } from "./NameValueForm";
import Image from "next/image";

export const ProductInfoForm = ({
  selectedFiles,
  onFileAccepted,
  productBrand,
  onProductBrandChange,
  productPrice,
  onProductPriceChange,
  productDiscount,
  onProductDiscountChange,
  productName,
  onProductNameChange,
  productOptionList,
  productQuantity,
  onProductQuantityChange,
  productDescription,
  onProductDescriptionChange,
  productSpecList,
  onSpecNameChange,
  onSpecValueChange,
  onSpecAdd,
  onSpecRemove,
  onOptionNameChange,
  onOptionValueChange,
  onOptionAdd,
  onOptionRemove,
  productThumbnailUrl,
}) => {
  return (
    <>
      <div className="flex flex-col items-start justify-start w-full h-[500px] overflow-y-scroll py-[8px]">
        {/* Image picker and price */}
        <div className="flex flex-row w-full">
          {/* Image picker */}
          <div className="p-[16px] bg-white rounded-[8px] border-[1.5px] border-gray-300">
            <div className="text-base text-black font-semibold">
              Ảnh sản phẩm
            </div>
            <div className="flex flex-row items-center justify-center p-[16px] bg-white rounded-[8px] border-[1.5px] border-gray-300 mt-[24px]">
            <ImagePicker
                onFileAccepted={onFileAccepted}
                width={"240px"}
                height={"240px"}
              />              
              <div className=" flex items-center justify-center">
                <div className="w-[240px] h-[240px]">
                {productThumbnailUrl && selectedFiles.length <= 0 && (
                    <div className="ml-[16px] rounded-[8px]">
                      <img
                        src={productThumbnailUrl}
                        alt={productThumbnailUrl}
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
          <div className="p-[16px] bg-white rounded-[8px] border-[1.5px] border-gray-300 flex flex-grow flex-col mx-[16px]">
            <div className="text-base text-black font-semibold">
              Hãng, giá và số lượng
            </div>
            <div className="flex flex-col items-start justify-start bg-white mt-[12px] flex-grow">
              <div className="w-full mt-[12px]">
                <div className="text-sm font-semibold text-black flex flex-col justify-start items-start">
                  Hãng
                </div>
                <div className="w-full relative flex items-center justify-center flex-row">
                  <input
                    value={productBrand || ""}
                    type="text"
                    className="border-[1.5px] border-gray-300 bg-gray-50 focus:outline-none focus:border-blue-600 focus:border-[1.5px] text-black text-sm py-[8px] px-[16px] rounded-[6px] w-full mt-[4px] pr-[32px]"
                    onChange={onProductBrandChange}
                  />
                </div>
              </div>

              <div className="w-full mt-[12px]">
                <div className="text-sm font-semibold text-black flex flex-col justify-start items-start">
                  Giá cơ bản
                </div>
                <div className="w-full relative flex items-center justify-center flex-row">
                  <input
                    value={productPrice || ""}
                    type="number"
                    className="border-[1.5px] border-gray-300 bg-gray-50 focus:outline-none focus:border-blue-600 focus:border-[1.5px] text-black text-sm py-[8px] px-[16px] rounded-[6px] w-full mt-[4px] pr-[32px]"
                    onChange={onProductPriceChange}
                  />
                  <div className="text-sm text-black absolute right-[16px] mt-[4px]">
                    đ
                  </div>
                </div>
              </div>

              <div className="w-full mt-[12px]">
                <div className="text-sm font-semibold text-black flex flex-col justify-start items-start">
                  Giảm giá
                </div>
                <div className="w-full relative flex items-center justify-center flex-row">
                  <input
                    value={productDiscount || ""}
                    onChange={onProductDiscountChange}
                    type="number"
                    className="border-[1.5px] border-gray-300 bg-gray-50 focus:outline-none focus:border-blue-600 focus:border-[1.5px] text-black text-sm py-[8px] px-[16px] rounded-[6px] w-full mt-[4px] pr-[32px]"
                  />
                  <div className="text-sm text-black absolute right-[16px] mt-[4px]">
                    %
                  </div>
                </div>
              </div>

              <div className="w-full mt-[12px]">
                <div className="text-sm font-semibold text-black flex flex-col justify-start items-start">
                  Số lượng
                </div>
                <div className="w-full relative flex items-center justify-center flex-row">
                  <input
                    value={productQuantity || ""}
                    onChange={onProductQuantityChange}
                    type="number"
                    className="border-[1.5px] border-gray-300 bg-gray-50 focus:outline-none focus:border-blue-600 focus:border-[1.5px] text-black text-sm py-[8px] pl-[16px] pr-[8px] rounded-[6px] w-full mt-[4px]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product general information */}
        <div className="flex flex-row w-full">
          <div className="w-full p-[16px] bg-white rounded-[8px] border-[1.5px] border-gray-300 flex flex-grow flex-col mr-[16px] mt-[16px]">
            <div className="text-base text-black font-semibold">
              Thông tin chung
            </div>
            <div className="flex flex-col items-start justify-start bg-white mt-[12px] flex-grow">
              <div className="w-full mt-[12px]">
                <div className="text-sm font-semibold text-black flex flex-col justify-start items-start">
                  Tên sản phẩm
                </div>
                <div className="w-full relative flex items-center justify-center flex-row">
                  <input
                    value={productName || ""}
                    onChange={onProductNameChange}
                    type="text"
                    className="border-[1.5px] border-gray-300 bg-gray-50 focus:outline-none focus:border-blue-600 focus:border-[1.5px] text-black text-sm py-[8px] px-[16px] rounded-[6px] w-full mt-[4px] pr-[32px]"
                  />
                </div>
              </div>

              <div className="w-full mt-[12px]">
                <div className="text-sm font-semibold text-black flex flex-col justify-start items-start">
                  Mô tả
                </div>
                <div className="w-full relative flex items-center justify-center flex-row">
                  <textarea
                    value={productDescription || ""}
                    onChange={onProductDescriptionChange}
                    className="border-[1.5px] border-gray-300 bg-gray-50 focus:outline-none focus:border-blue-600 focus:border-[1.5px] text-black text-sm py-[8px] px-[16px] rounded-[6px] w-full mt-[4px] pr-[32px]"
                    rows="11"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product detail information */}
        <div className="flex flex-row w-full">
          {/* Product specification */}
          <div className="w-3/5 p-[16px] bg-white rounded-[8px] border-[1.5px] border-gray-300 flex flex-grow flex-col mr-[16px] mt-[16px] h-fit">
            <div className="text-base text-black font-semibold w-full">
              Thông tin chi tiết
            </div>
            <div className="flex flex-col items-start justify-start bg-white mt-[12px] flex-grow w-full">
              {productSpecList.map((item, index) => (
                <NameValueForm
                  key={index}
                  name={item.name}
                  value={item.value}
                  onNameChange={(e) => {
                    onSpecNameChange(e, index);
                  }}
                  onValueChange={(e) => {
                    onSpecValueChange(e, index);
                  }}
                  onRemove={() => {
                    onSpecRemove(index);
                  }}
                />
              ))}
              <button
                className="w-full bg-blue-100 flex justify-center items-center py-[12px] rounded-[8px] border-[2px] border-blue-400 border-dashed mt-[12px]"
                onClick={onSpecAdd}
              >
                <Image
                  alt="Add product specification"
                  src={iconPlusBlue}
                  height={18}
                  width={18}
                />
              </button>
            </div>
          </div>

          {/* Product options */}
          <div className="p-[16px] bg-white rounded-[8px] border-[1.5px] border-gray-300 flex w-2/5 flex-col mr-[16px] mt-[16px] h-fit">
            <div className="text-base text-black font-semibold w-full">
              Thông tin phân loại hàng
            </div>
            <div className="flex flex-col items-start justify-start bg-white mt-[12px] flex-grow w-full">
              {productOptionList.map((item, index) => (
                <NameValueForm
                  key={index}
                  name={item.name}
                  value={item.value}
                  onNameChange={(e) => {
                    onOptionNameChange(e, index);
                  }}
                  onValueChange={(e) => {
                    onOptionValueChange(e, index);
                  }}
                  onRemove={() => {
                    onOptionRemove(index);
                  }}
                />
              ))}
              <button
                className="w-full bg-blue-100 flex justify-center items-center py-[12px] rounded-[8px] border-[2px] border-blue-400 border-dashed mt-[12px]"
                onClick={onOptionAdd}
              >
                <Image
                  alt="Add product option"
                  src={iconPlusBlue}
                  height={18}
                  width={18}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};