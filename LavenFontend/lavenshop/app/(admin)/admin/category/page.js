"use client";

import React from "react";
import SearchInput from "@/components/custom/SearchInput";
import Image from "next/image";
import { useState, useEffect } from "react";
import icPlus from "@/public/ic_admin/ic_plus.svg";
import icEditBlue from "@/public/ic_admin/ic_edit_blue.svg";
import icBin from "@/public/ic_admin/ic_bin.svg";
import { PaginationSelection } from "@/components/HomePage";
import { uploadCategoryImage } from "@/services/firebaseService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  createCategory,
  deleteCategoryById,
  getCategories,
  getCategoryById,
  searchCategoryByName,
  updateCategoryById,
} from "@/services/categoryServices";
import CategoryAdminCard from "@/components/custom/Admin/CategoryAdminCard";
import { CustomCreateDialog } from "@/components/custom/Admin/CustomCreateDialog";
import { CustomUpdateDialog } from "@/components/custom/Admin/CustomUpdateDialog";
import { CustomAlertDialog } from "@/components/custom/Admin/CustomAlertDialog";
import { CustomViewDialog } from "@/components/custom/Admin/CustomViewDialog";
import { CategoryInfoForm } from "@/components/custom/Admin/CategoryInfoForm";
import ProductRow from "@/components/custom/Admin/ProductRow";
import CustomTable from "@/components/custom/Admin/Table/CustomTable";

const CategoryAdminPage = () => {
  const productField = [
    { name: "Ảnh", width: "6%" },
    { name: "Tên", width: "34%" },
    { name: "Hãng", width: "11%" },
    { name: "Giá", width: "11%" },
    { name: "Giảm giá", width: "7%" },
    { name: "Đánh giá", width: "7%" },
    { name: "Lượt đánh giá", width: "11.5%" },
    { name: "Số lượng", width: "9.5%" },
  ];
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [totalItems, setTotalItems] = useState(0);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(-1);
  const [categoryName, setCategoryName] = useState("");
  const [categoryWithProducts, setCategoryWithProducts] = useState();
  const [searchValue, setSearchValue] = useState("");

  const getSearchCategoryData = async () => {
    const data = await searchCategoryByName(
      searchValue,
      currentPage,
      itemsPerPage
    );
    setCategoryList(data.content);
    // setTotalItems(data.totalElements);
  };

  const getCategoryData = async () => {
    const data = await getCategories(currentPage, itemsPerPage);
    setCategoryList(data.content);
    setTotalItems(data.totalElements);
  };

  const getCategoryWithProducts = async (id) => {
    const data = await getCategoryById(id);
    setCategoryWithProducts(data);
  };

  const handleFileAccepted = (files) => {
    setSelectedFiles(files);
  };

  const resetState = () => {
    setSelectedFiles([]);
  };

  useEffect(() => {
    if (searchValue && searchValue.length > 0) {
      getSearchCategoryData();
    } else {
      getCategoryData();
    }
  }, [currentPage]);

  console.log(categoryList);

  return (
    <div className="flex flex-col justify-between items-center h-full">
      {/* Search bar */}
      <div className="flex flex-row items-center w-full border-b-[1px] border-gray-300 px-[32px] py-[10px]">
        <div className="flex flex-row items-center mr-[64px]">
          <div className="text-[18px] font-semibold">Tổng phân loại</div>
          <div className="px-[8px] py-[1px] bg-blue-600 text-white text-[14px] rounded-[16px] ml-[12px] flex items-center justify-center">
            {totalItems}
          </div>
        </div>

        <div className="grow">
          <SearchInput
            placeholder={"Nhập từ khóa tên phân loại..."}
            value={searchValue}
            onValueChange={(e) => setSearchValue(e.target.value)}
            onSubmit={async (e) => {
              e.preventDefault();
              if (searchValue && searchValue.length > 0) {
                await getSearchCategoryData();
              } else {
                await getCategoryData();
              }
            }}
          />
        </div>

        <div className="flex flex-row justify-center items-center gap-[16px] ml-[24px]">
          {/* View category  */}
          <CustomViewDialog
            itemTrigger={
              <button
                className="border-blue-600 border-[1px] px-[20px] py-[6px] rounded-[8px] hover:drop-shadow-xl hover:opacity-80 flex flex-row items-center justify-center bg-blue-50 w-[110px]"
                style={{ opacity: selectedCategory != -1 ? 1 : 0 }}
                disabled={selectedCategory == -1}
                onClick={async () => {
                  resetState();
                  await getCategoryWithProducts(
                    categoryList[selectedCategory].id
                  );
                }}
              >
                <div className="text-blue-600 text-[14px] font-bold ml-[4px]">
                  Xem
                </div>
              </button>
            }
            title={`Phân loại: ${
              selectedCategory != -1 && categoryList[selectedCategory]?.name
            }`}
            itemContent={
              <div className="w-full">
                {/* Product count */}
                <div className="flex flex-row items-center mr-[64px] mt-[8px] mb-[16px]">
                  <div className="text-[16px] font-semibold text-black">
                    Tổng sản phẩm
                  </div>
                  <div className="px-[8px] py-[1px] bg-blue-600 text-white text-[14px] rounded-[16px] ml-[12px] flex items-center justify-center">
                    {categoryWithProducts?.products?.length}
                  </div>
                </div>

                {/* Product list */}
                {categoryWithProducts && (
                  <CustomTable
                    data={categoryWithProducts?.products}
                    renderRow={(item, index) => (
                      <ProductRow key={index} product={item} />
                    )}
                    field={productField}
                  />
                )}
              </div>
            }
          />

          {/* Delete category button */}
          <CustomAlertDialog
            itemTrigger={
              <button
                className="border-red-500 border-[1px] px-[20px] py-[6px] rounded-[8px] hover:drop-shadow-xl hover:opacity-80 flex flex-row items-center justify-center bg-red-50 w-[110px]"
                style={{ opacity: selectedCategory != -1 ? 1 : 0 }}
                disabled={selectedCategory == -1}
              >
                <Image alt="Bin icon" src={icBin} width={12} height={12} />
                <div className="text-red-500 text-[14px] font-bold ml-[4px]">
                  Xóa
                </div>
              </button>
            }
            title={"Xóa phân loại: " + categoryList[selectedCategory]?.name}
            content={
              "Bạn có chắc chắn muốn xóa phân loại này? Thao tác này không thể hoàn tác!"
            }
            cancelContent={"Hủy"}
            confirmContent={"Xóa"}
            onConfirm={async () => {
              console.log("Confirm delete category");
              let token = "";
             
              const res = await deleteCategoryById(
                categoryList[selectedCategory].id
              );
              console.log(res);
              if (res.status == 200) {
                toast.success("Xóa phân loại thành công");
                await getCategoryData();
                setSelectedCategory(-1);
              } else if (res.status == 500) {
                toast.error(
                  "Không thể xóa phân loại này. Hãy xóa sản phẩm trước!"
                );
              } else {
                const errorArray = Object.entries(res.data);
                errorArray.forEach((error) => {
                  toast.error(error[1]);
                });
              }
            }}
          />

          {/* Update category dialog */}
          <CustomUpdateDialog
            confirmDialogTitle={"Bạn có chắc chắn muốn cập nhật phân loại này?"}
            confirmDialogContent={
              "Phân loại này sẽ được cập nhật trong cơ sở dữ liệu."
            }
            confirmContent={"Cập nhật"}
            onConfirm={async () => {
              console.log("Confirm update category");
              const imgURL = selectedFiles[0]
                ? await uploadCategoryImage(selectedFiles[0])
                : categoryList[selectedCategory].thumbnailUrl;
              
              const res = await updateCategoryById(
                {
                  name: categoryName,
                  thumbnailUrl: imgURL,
                },
                categoryList[selectedCategory].id
              );
              console.log(res);
              if (res.status == 200) {
                toast.success("Cập nhật phân loại thành công");
                await getCategoryData();
                resetState();
              } else {
                const errorArray = Object.entries(res.data);
                errorArray.forEach((error) => {
                  toast.error(error[1]);
                });
              }
            }}
            onCancel={() => {
              console.log("Cancel update category");
              resetState();
            }}
            itemTrigger={
              <button
                className="border-blue-600 border-[1px] px-[20px] py-[6px] rounded-[8px] hover:drop-shadow-xl hover:opacity-80 flex flex-row items-center justify-center bg-blue-50 w-[110px]"
                style={{ opacity: selectedCategory != -1 ? 1 : 0 }}
                disabled={selectedCategory == -1}
                onClick={() => {
                  resetState();
                  setCategoryName(categoryList[selectedCategory].name);
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
            title={"Cập nhật phân loại"}
            itemContent={
              <CategoryInfoForm
                selectedFiles={selectedFiles}
                onFileAccepted={handleFileAccepted}
                categoryName={categoryName}
                onCategoryNameChange={(e) => setCategoryName(e.target.value)}
                categoryThumbnailUrl={
                  selectedCategory != -1 &&
                  categoryList[selectedCategory] != undefined
                    ? categoryList[selectedCategory].thumbnailUrl
                    : null
                }
              />
            }
          />

          {/* Create category dialog */}
          <CustomCreateDialog
            confirmDialogTitle={"Bạn có chắc chắn muốn thêm phân loại này?"}
            confirmDialogContent={
              "Phân loại này sẽ được thêm vào cơ sở dữ liệu."
            }
            confirmContent={"Thêm"}
            onConfirm={async () => {
              console.log("Confirm create category");
              const imgURL = selectedFiles[0]
                ? await uploadCategoryImage(selectedFiles[0])
                : "";
             
              const res = await createCategory(
                {
                  name: categoryName,
                  thumbnailUrl: imgURL,
                },
              );
              console.log(res);
              if (res.status == 201) {
                toast.success("Tạo phân loại thành công");
                await getCategoryData(currentPage, itemsPerPage);
                setSelectedCategory(-1);
                resetState();
              } else {
                const errorArray = Object.entries(res.data);
                errorArray.forEach((error) => {
                  toast.error(error[1]);
                });
              }
            }}
            onCancel={() => {
              console.log("Cancel create category");
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
            title={"Thêm phân loại"}
            itemContent={
              <CategoryInfoForm
                selectedFiles={selectedFiles}
                onFileAccepted={handleFileAccepted}
                categoryName={categoryName}
                onCategoryNameChange={(e) => setCategoryName(e.target.value)}
              />
            }
          />
        </div>
      </div>

      {/* Category data */}
      <div className="flex flex-col justify-between items-center grow px-[32px] py-[16px] w-full">
        <div className="w-full flex flex-wrap gap-[12px]">
          {categoryList.map((item, index) => (
            <div key={index}>
              <CategoryAdminCard
                category={item}
                onSelected={() => {
                  setSelectedCategory(index);
                }}
                className1={
                  selectedCategory == index ? "bg-blue-200" : "bg-white"
                }
                className2={
                  selectedCategory == index
                    ? "border-blue-200"
                    : "border-blue-100"
                }
              />
            </div>
          ))}
        </div>

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

export default CategoryAdminPage;