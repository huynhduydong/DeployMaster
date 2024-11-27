"use client";
import { BreadCrumb } from "@/components/custom/BreadCrumb";
import React from "react";
import { ProductImage } from "@/components/custom/ProductDetail/ProductImage";
import { ProductSharing } from "@/components/custom/ProductDetail/ProductSharing";
import { ProductInformation } from "@/components/custom/ProductDetail/ProductInformation";
import { useState, useEffect } from "react";
import { getProductById } from "@/services/productServices";
import { useParams } from "next/navigation";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
const Page = () => {
  const [product, setProduct] = new useState({});
  const params = useParams();
  const [isFullDescription, setIsFullDescription] = useState(false);
  console.log(">>> check router:", params);
  const getProductData = async () => {
    const productData = await getProductById(params.productId);
    console.log(">>> check product_data:", productData);
    setProduct(productData);
  };
  //get data
  useEffect(() => {
    if (params.productId) {
      getProductData();
    }
  }, [params.productId]);
  return (
    <>
      {product && product.category && (
        <div className="bg-gray-100 px-32">
          <BreadCrumb category={product.category} information={product.name} />
          <div className="space-y-4">
            <div className="flex p-0 bg-white gap-8 rounded-md">
              <section
                className="shrink-0 p-4 block"
                style={{ width: "450px" }}
              >
                <ProductImage product={product} />
              </section>
              <section className="flex flex-auto">
                <ProductInformation product={product} />
              </section>
            </div>

            <div className="px-4 pt-6 pb-2 bg-white rounded-md space-y-2">
              <div className="text-lg font-medium ml-4">Thông tin chi tiết</div>
              <Table>
                <TableBody>
                  {product &&
                    product?.specifications.map((specification) => (
                      <TableRow key={specification.id}>
                        <TableCell className="text-gray-500">
                          {specification.name}
                        </TableCell>
                        <TableCell>{specification.value}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>

            <div className="px-4 pt-6 pb-4 bg-white rounded-md space-y-2">
              <div className="text-lg font-medium ml-4">Mô tả sản phẩm</div>
              {product && product?.description && (
                <div className="flex flex-col justify-center items-center">
                  <p
                    className={isFullDescription ? "ml-4" : "ml-4 line-clamp-3"}
                  >
                    {product.description.split("\n").map((str, index) => (
                       <span key={`string-${index}`} className="block">
                       {str}
                     </span>
                    ))}
                  </p>
                  <Button
                    variant="link"
                    className={isFullDescription ? "inline" : "hidden"}
                    onClick={() => setIsFullDescription(false)}
                  >
                    Xem ít
                  </Button>
                  <Button
                    variant="link"
                    className={!isFullDescription ? "inline" : "hidden"}
                    onClick={() => setIsFullDescription(true)}
                  >
                    Xem thêm
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Page;