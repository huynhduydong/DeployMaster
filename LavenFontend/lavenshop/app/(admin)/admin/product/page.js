"use client";

import React from "react";
import SearchInput from "@/components/custom/SearchInput";
import {
  createProduct,
  deleteProductById,
  getListProduct,
  updateProductById,
  searchProductByName
} from "@/services/productServices";
import Image from "next/image";
import { useState, useEffect } from "react";
import icPlus from "@/public/ic_admin/ic_plus.svg";
import icEditBlue from "@/public/ic_admin/ic_edit_blue.svg";
import icBin from "@/public/ic_admin/ic_bin.svg";
import { PaginationSelection } from "@/components/HomePage";
import ProductRow from "@/components/custom/Admin/ProductRow";
import { CustomCreateDialog } from "@/components/custom/Admin/CustomCreateDialog";
import { uploadFile } from "@/services/firebaseService";
import { ProductInfoForm } from "@/components/custom/Admin/ProductInfoForm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CustomUpdateDialog } from "@/components/custom/Admin/CustomUpdateDialog";
import { CustomAlertDialog } from "@/components/custom/Admin/CustomAlertDialog";
import CustomTable from "@/components/custom/Admin/Table/CustomTable";
const ProductAdminPage = () => {
  const [productList, setProductList] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [totalItems, setTotalItems] = useState();
  const productField = [
  { name: "Ảnh", width: "6%" },
    { name: "Tên sản phẩm", width: "36%" },
    { name: "Hãng", width: "11%" },
    { name: "Giá", width: "11%" },
    { name: "Giảm giá", width: "7%" },
    { name: "Đánh giá", width: "7%" },
    { name: "Lượt đánh giá", width: "9.5%" },
    { name: "Số lượng", width: "9.5%" },
  ];
  const [totalProductQuantity, setTotalProductQuantity] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(-1);
  const [productSpecList, setProductSpecList] = useState([]);
  const [productOptionList, setProductOptionList] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [productPrice, setProductPrice] = useState(0);
  const [productDiscount, setProductDiscount] = useState(0);
  const [productQuantity, setProductQuantity] = useState(0);
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productBrand, setProductBrand] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const getProductData = async () => {
    const data = await getListProduct(currentPage, itemsPerPage);
    setProductList(data.content);
    setTotalItems(data.totalElements);
  };

  const handleFileAccepted = (files) => {
    setSelectedFiles(files);
  };
  const getSearchProductData = async () => {
    const data = await searchProductByName(
      searchValue,
      currentPage,
      itemsPerPage
    );
    setProductList(data.content);
    setTotalItems(data.totalElements);
  };
  const resetState = () => {
    setSelectedFiles([]);
    setProductOptionList([]);
    setProductSpecList([]);
    setProductPrice(0);
    setProductDiscount(0);
    setProductQuantity(0);
    setProductName("");
    setProductDescription("");
    setProductBrand("");
  };

  // const getAllProductQuantity = async () => {
  //   const data = await getListProduct();
  //   console.log(data);
  //   setTotalProductQuantity(data.content.length);
  // };

  // useEffect(() => {
  //   getAllProductQuantity();
  // }, []);

  useEffect(() => {
    if (searchValue && searchValue.length > 0) {
      getSearchProductData();
    } else {
      getProductData();
    }  }, [currentPage]);

  return (
    <div className="flex flex-col justify-between items-center h-full">
      {/* Search bar */}
      <div className="flex flex-row items-center w-full border-b-[1px] border-gray-300 px-[32px] py-[10px]">
        <div className="flex flex-row items-center mr-[64px]">
        <div className="text-[18px] font-semibold">Tổng sản phẩm</div>
                  <div className="px-[8px] py-[1px] bg-blue-600 text-white text-[14px] rounded-[16px] ml-[12px] flex items-center justify-center">
            {totalItems}
          </div>
        </div>

        <div className="grow">

        <SearchInput
            placeholder={"Nhập từ khóa tên sản phẩm..."}
            value={searchValue}
            onValueChange={(e) => setSearchValue(e.target.value)}
            onSubmit={async (e) => {
              e.preventDefault();
              if (searchValue && searchValue.length > 0) {
                await getSearchProductData();
              } else {
                await getProductData();
              }
            }}
          />
        </div>

        <div className="flex flex-row justify-center items-center gap-[16px] ml-[64px]">
          {/* Delete product button */}
          <CustomAlertDialog
            itemTrigger={
              <button
                className="border-warning border-[1px] px-[20px] py-[6px] rounded-[8px] hover:drop-shadow-xl hover:opacity-80 flex flex-row items-center justify-center bg-red-50 w-[110px]"
                style={{ opacity: selectedProduct != -1 ? 1 : 0 }}
              >
                <Image alt="Bin icon" src={icBin} width={12} height={12} />
                <div className="text-warning text-[14px] font-bold ml-[4px]">
                  Xóa
                </div>
              </button>
            }
            title={"Xóa sản phẩm: " + productList[selectedProduct]?.name}
            content={
              "Bạn có chắc chắn muốn xóa sản phẩm này? Thao tác này không thể hoàn tác!"
            }
            cancelContent={"Hủy"}
            confirmContent={"Xóa"}
            onConfirm={async () => {
              console.log("Confirm delete product");
              
              const res = await deleteProductById(
                productList[selectedProduct].id
              );
              console.log(res);
              if (res.status == 200) {
                toast.success("Xóa sản phẩm thành công");
                await getProductData();
                setSelectedProduct(-1);
              } else {
                const errorArray = Object.entries(res.data);
                errorArray.forEach((error) => {
                  toast.error(error[1]);
                });
              }
            }}
          />

          {/* Update product dialog */}
          <CustomUpdateDialog
          confirmDialogTitle={"Bạn có chắc chắn muốn cập nhật sản phẩm này?"}
          confirmDialogContent={"Thông tin của sản phẩm sẽ được cập nhật."}
            confirmContent={"Cập nhật"}
            onConfirm={async () => {
              console.log("Confirm update product");
              const imgURL = selectedFiles[0]
                ? await uploadFile(selectedFiles[0])
                : productList[selectedProduct].thumbnailUrl;             
              const res = await updateProductById(
                {
                  name: productName,
                  description: productDescription,
                  brand: productBrand,
                  price: productPrice,
                  discountRate: productDiscount,
                  quantitySold: productQuantity,
                  thumbnailUrl: imgURL,
                  options: productOptionList,
                  specifications: productSpecList,
                  categoryUrl: "new-cate",
                },
                productList[selectedProduct].id
              );
              console.log(res);
              if (res.status == 200) {
                toast.success("Cập nhật sản phẩm thành công");
                await getProductData();
                resetState();
              } else {
                const errorArray = Object.entries(res.data);
                errorArray.forEach((error) => {
                  toast.error(error[1]);
                });
              }
            }}
            onCancel={() => {
              console.log("Cancel update product");
              resetState();
            }}
            itemTrigger={
              <button
                className="border-blue-600 border-[1px] px-[20px] py-[6px] rounded-[8px] hover:drop-shadow-xl hover:opacity-80 flex flex-row items-center justify-center bg-blue-50 w-[110px]"
                style={{ opacity: selectedProduct != -1 ? 1 : 0 }}
                onClick={() => {
                  resetState();
                  setProductName(productList[selectedProduct].name);
                  setProductDescription(
                    productList[selectedProduct].description
                  );
                  setProductBrand(productList[selectedProduct].brand);
                  setProductPrice(productList[selectedProduct].price);
                  setProductDiscount(productList[selectedProduct].discountRate);
                  setProductQuantity(productList[selectedProduct].quantitySold);
                  setProductSpecList(
                    productList[selectedProduct].specifications.map((spec) => {
                      return { name: spec.name, value: spec.value };
                    })
                  );
                  setProductOptionList(
                    productList[selectedProduct].options.map((option) => {
                      return { name: option.name, value: option.value };
                    })
                  );
                  setProductOptionList(productList[selectedProduct].options);
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
            title={"Cập nhật sản phẩm"}
            itemContent={
              <ProductInfoForm
                selectedFiles={selectedFiles}
                onFileAccepted={handleFileAccepted}
                productBrand={productBrand}
                onProductBrandChange={(e) => {
                  setProductBrand(e.target.value);
                }}
                productPrice={productPrice}
                onProductPriceChange={(e) => {
                  setProductPrice(e.target.value);
                }}
                productDiscount={productDiscount}
                onProductDiscountChange={(e) => {
                  setProductDiscount(e.target.value);
                }}
                productQuantity={productQuantity}
                onProductQuantityChange={(e) => {
                  setProductQuantity(e.target.value);
                }}
                productName={productName}
                onProductNameChange={(e) => {
                  setProductName(e.target.value);
                }}
                productDescription={productDescription}
                onProductDescriptionChange={(e) => {
                  setProductDescription(e.target.value);
                }}
                productSpecList={productSpecList}
                onSpecAdd={() => {
                  setProductSpecList([
                    ...productSpecList,
                    { name: "", value: "" },
                  ]);
                }}
                onSpecRemove={(index) => {
                  setProductSpecList(
                    productSpecList.filter((_, i) => i != index)
                  );
                }}
                onSpecNameChange={(e, index) => {
                  const temp = [...productSpecList];
                  temp[index].name = e.target.value;
                  setProductSpecList(temp);
                }}
                onSpecValueChange={(e, index) => {
                  const temp = [...productSpecList];
                  temp[index].value = e.target.value;
                  setProductSpecList(temp);
                }}
                productOptionList={productOptionList}
                onOptionAdd={() => {
                  setProductOptionList([
                    ...productOptionList,
                    { name: "", value: "" },
                  ]);
                }}
                onOptionRemove={(index) => {
                  setProductOptionList(
                    productOptionList.filter((_, i) => i != index)
                  );
                }}
                onOptionNameChange={(e, index) => {
                  const temp = [...productOptionList];
                  temp[index].name = e.target.value;
                  setProductOptionList(temp);
                }}
                onOptionValueChange={(e, index) => {
                  const temp = [...productOptionList];
                  temp[index].value = e.target.value;
                  setProductOptionList(temp);
                }}
                productThumbnailUrl={
                  selectedProduct != -1 &&
                  productList[selectedProduct] != undefined
                  ? productList[selectedProduct].thumbnailUrl
                  : null                }
              />
            }
          />

          {/* Create product dialog */}
          <CustomCreateDialog
           confirmDialogTitle={"Bạn có chắc chắn muốn thêm sản phẩm này?"}
           confirmDialogContent={
             "Sản phẩm sẽ được thêm vào danh sách sản phẩm."
           }
            confirmContent={"Thêm"}
            onConfirm={async () => {
              console.log("Confirm create product");
              const imgURL = selectedFiles[0]
                ? await uploadFile(selectedFiles[0])
                : "";
           
              const res = await createProduct(
                {
                  name: productName,
                  description: productDescription,
                  brand: productBrand,
                  price: productPrice,
                  discountRate: productDiscount,
                  quantitySold: productQuantity,
                  thumbnailUrl: imgURL,
                  options: productOptionList,
                  specifications: productSpecList,
                  categoryUrl: "new-cate",
                },           
              );
              console.log(res);
              // resetState();
            }}

            onCancel={() => {
              console.log("Cancel create product");
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
            title={"Thêm sản phẩm"}
            itemContent={
              <ProductInfoForm
                selectedFiles={selectedFiles}
                onFileAccepted={handleFileAccepted}
                productBrand={productBrand}
                onProductBrandChange={(e) => {
                  setProductBrand(e.target.value);
                }}
                productPrice={productPrice}
                onProductPriceChange={(e) => {
                  setProductPrice(e.target.value);
                }}
                productDiscount={productDiscount}
                onProductDiscountChange={(e) => {
                  setProductDiscount(e.target.value);
                }}
                productQuantity={productQuantity}
                onProductQuantityChange={(e) => {
                  setProductQuantity(e.target.value);
                }}
                productName={productName}
                onProductNameChange={(e) => {
                  setProductName(e.target.value);
                }}
                productDescription={productDescription}
                onProductDescriptionChange={(e) => {
                  setProductDescription(e.target.value);
                }}
                productSpecList={productSpecList}
                onSpecAdd={() => {
                  setProductSpecList([
                    ...productSpecList,
                    { name: "", value: "" },
                  ]);
                }}
                onSpecRemove={(index) => {
                  setProductSpecList(
                    productSpecList.filter((_, i) => i != index)
                  );
                }}
                onSpecNameChange={(e, index) => {
                  const temp = [...productSpecList];
                  temp[index].name = e.target.value;
                  setProductSpecList(temp);
                }}
                onSpecValueChange={(e, index) => {
                  const temp = [...productSpecList];
                  temp[index].value = e.target.value;
                  setProductSpecList(temp);
                }}
                productOptionList={productOptionList}
                onOptionAdd={() => {
                  setProductOptionList([
                    ...productOptionList,
                    { name: "", value: "" },
                  ]);
                }}
                onOptionRemove={(index) => {
                  setProductOptionList(
                    productOptionList.filter((_, i) => i != index)
                  );
                }}
                onOptionNameChange={(e, index) => {
                  const temp = [...productOptionList];
                  temp[index].name = e.target.value;
                  setProductOptionList(temp);
                }}
                onOptionValueChange={(e, index) => {
                  const temp = [...productOptionList];
                  temp[index].value = e.target.value;
                  setProductOptionList(temp);
                }}
              />
            }
          />
        </div>
      </div>

      {/* Product table data */}
      <div className="py-[10px] flex flex-col justify-between items-center grow px-[32px] py-[20px] w-full">
        <CustomTable
          data={productList}
          renderRow={(item, index) => (
            <ProductRow
              key={index}
              product={item}
              onSelected={() => {
                selectedProduct == index
                  ? setSelectedProduct(-1)
                  : setSelectedProduct(index);
              }}
              className={selectedProduct == index ? "bg-blue-200" : ""}
              onClickViewDetail={() => {
                console.log("View detail");
              }}
            />
          )}
          field={productField}
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

export default ProductAdminPage;