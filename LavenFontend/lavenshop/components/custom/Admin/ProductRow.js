import trimText from "@/utils/trimText";
import Image from "next/image";
import iconEye from "@/public/ic_eye.svg";
import { CustomCheckbox } from "./CustomCheckbox";
import { CustomDialog, CustomViewDialog } from "./CustomViewDialog";
import iconStar from "@/public/ic_star.svg";

const ProductRow = ({ product, className, onSelected, onClickViewDetail }) => {
  const formatMoney = (amount) => {
    // Ensure the input is treated as a string
    let amountStr = amount.toString();
    // Remove any commas
    amountStr = amountStr.replace(/,/g, "");
    // Convert to integer
    let number = parseInt(amountStr, 10);

    // Ensure the number is a valid integer
    if (isNaN(number)) {
      throw new Error("Invalid input: not a number");
    }

    // Format the number with commas as thousand separators
    let formattedAmount = number.toLocaleString("en-US");

    return formattedAmount;
  };

  return (
    <>
      {/* <td>
        <CustomCheckbox />
      </td> */}
      <td className={className + " rounded-l-[4px]"} onClick={onSelected}>
        <div className="py-[3px] w-[100px] pl-[4px]">
          <img
            src={product.thumbnailUrl}
            className="rounded-sm self-center h-[48px] w-[48px]"
            alt="product-prototype"
          />
        </div>
      </td>
      <td className={className} onClick={onSelected}>
        <div className="pr-[8px] line-clamp-2">{product.name}</div>
      </td>
      <td className={className} onClick={onSelected}>
        <div className="">{product.brand}</div>
      </td>
      <td className={className} onClick={onSelected}>
        <div className="flex flex-row items-center justify-start">
          <div>{formatMoney(product.price)}</div>
          <div className="ml-[4px]">đ</div>
        </div>
      </td>
      <td className={className} onClick={onSelected}>
        {product.discountRate}%
      </td>
      <td className={className} onClick={onSelected}>
        {product.ratingAverage}
      </td>
      <td className={className} onClick={onSelected}>
        {product.reviewCount}
      </td>
      <td className={className} onClick={onSelected}>
        {product.quantitySold}
      </td>
      <td className={className + " rounded-r-[4px]"} onClick={onSelected}>
        <div className="pr-[4px]" onClick={onClickViewDetail}></div>
        <CustomViewDialog
          itemTrigger={
            <Image
              alt="Show product info icon"
              src={iconEye}
              className="w-[20px] h-[20px]"
            />
          }
          title={product.name}
          itemContent={
            <>
              <div className="flex flex-col items-start justify-start w-full h-[500px] overflow-y-scroll">
                <div className="mt-[8px] flex flex-row items-start justify-start w-full">
                  <div className="flex flex-row items-start justify-start w-full">
                    {/* Product image */}
                    <div className="flex flex-col items-start justify-center w-fit">
                      <div>Ảnh sản phẩm</div>
                      <img
                        alt="Product image"
                        src={product.thumbnailUrl}
                        className="w-[240px] h-[240px] rounded-[8px] overflow-hidden border-[1.5px] border-gray-300 p-[8px] bg-white"
                      />
                    </div>

                    {/* Product info */}
                    <div className="w-fit flex flex-col items-start justify-center ml-[20px]">
                      <div>Thông tin</div>
                      <div className="text-black text-base flex flex-col items-start justify-center bg-white p-[16px] rounded-[8px] border-[1.5px] border-gray-300 w-full">
                      <div className="flex flex-row">
                          <div className="font-semibold">Phân loại: </div>
                          <div className="ml-[4px]">{product.categoryUrl}</div>
                        </div>
                        <div className="flex flex-row">
                          <div className="font-semibold">Số lượng: </div>
                          <div className="ml-[4px]">{product.quantitySold}</div>
                        </div>
                        <div className="flex flex-row">
                          <div className="font-semibold">Giá: </div>
                          <div className="ml-[4px]">
                            {formatMoney(product.price)}đ
                          </div>
                        </div>
                        <div className="flex flex-row">
                          <div className="font-semibold">Giảm giá: </div>
                          <div className="ml-[4px]">
                            {product.discountRate}%
                          </div>
                        </div>
                        <div className="flex flex-row">
                          <div className="font-semibold">Đánh giá: </div>
                          <div className="ml-[4px]">
                            <div className="flex flex-row items-center justify-start">
                              <div>{product.ratingAverage}</div>
                              <Image
                                alt="Product rating"
                                src={iconStar}
                                className="ml-[4px]"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-row">
                          <div className="font-semibold">Lượt đánh giá: </div>
                          <div className="ml-[4px]">{product.reviewCount}</div>
                        </div>
                      </div>
                    </div>
                   {/* Product option info */}
                   <div className="w-fit flex flex-col items-start justify-center ml-[20px] mr-[16px]">
                      <div>Thông tin tùy chọn/cấu hình</div>
                      <div className="text-black text-base flex flex-col items-start justify-center bg-white p-[16px] rounded-[8px] border-[1.5px] border-gray-300 w-full min-w-[220px]">
                        {product.options
                          .reduce((acc, cur) => {
                            const { name, value } = cur;
                            const existing = acc.find(
                              (item) => item.name === name
                            );
                            if (existing) {
                              existing.values.push(value);
                            } else {
                              acc.push({ name, values: [value] });
                            }
                            return acc;
                          }, [])
                          .map((option, index) => (
                            <div key={index} className="flex flex-row">
                              <div className="font-semibold">
                                {option.name}:
                              </div>
                              <div className="ml-[4px] flex flex-wrap">
                                {option.values.map((value, index) => (
                                  <div
                                    key={index}
                                    className="flex flex-row w-fit"
                                  >
                                    <div className="ml-[4px]">{value}</div>
                                    {index < option.values.length - 1 && ", "}
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Product details */}
                <div className="mt-[16px] mr-[16px]" style={{ width: "98%" }}>
                  <div>Thông tin chi tiết</div>
                  <div className="text-black text-base flex flex-col items-start justify-center bg-white p-[16px] rounded-[8px] border-[1.5px] border-gray-300 w-full">
                    {product.specifications.map((spec, index) => (
                      <div
                        key={index}
                        className="flex flex-row justify-start items-start w-full"
                      >
                        <div className="font-semibold w-1/3">
                          <div>{spec.name}</div>
                        </div>
                        <div
                          className="ml-[8px] w-2/3"
                          style={{ marginTop: index == 0 ? "" : "2px" }}
                        >
                          {spec.value}
                        </div>
                      </div>
                    ))}
                    {/* {product.options.map((spec, index) => (
                      <div
                        key={index}
                        className="flex flex-row justify-start items-start w-full"
                      >
                        <div className="font-semibold w-1/3">
                          <div>{spec.name}</div>
                        </div>
                        <div
                          className="ml-[8px] w-2/3"
                          style={{ marginTop: index == 0 ? "" : "2px" }}
                        >
                          {spec.value}
                        </div>
                      </div>
                    ))} */}
                  </div>
                </div>

                {/* Product description */}
                <div className="mt-[16px] mr-[16px]" style={{ width: "98%" }}>
                  <div>Mô tả sản phẩm</div>
                  <div className="text-black text-base flex flex-col items-start justify-center bg-white p-[16px] rounded-[8px] border-[1.5px] border-gray-300 w-full">
                    {product.description}
                  </div>
                </div>
              </div>
            </>
          }
        />
      </td>
    </>
  );
};

export default ProductRow;