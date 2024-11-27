import { useEffect, useState } from "react";
import { convertPrice } from "@/utils/convertPrice";
import { Button } from "@/components/ui/button";
import { addToCart, getCart } from "@/services/cartServices";
import { ShoppingCart } from "@/components/icons/shopping-cart";
import { Toaster } from "@/components/ui/toaster";
import { toast, useToast } from "@/components/ui/use-toast";
export const ProductInformation = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [productItemId, setProductItemId] = useState(null);
  const [productId, setProductId] = useState(null);
  const [options, setOptions] = useState([]);
  const [optionsValue, setOptionsValue] = useState([]);

  const handleAddToCart = async () => {
    const productsInCart = await getCart();
    let finalQuantity = quantity;

    if (productsInCart.length === 0) {
      await addToCart(productItemId, productId, finalQuantity);
      return;
    }

    for (let i = 0; i < productsInCart.length; i++) {
      if (product.id === productsInCart[i].id) {
        if (productsInCart[i].option) {
          let productsInCartOptions = [];
          for (let j = 0; j < productsInCart[i].option.length; j++) {
            productsInCartOptions.push(productsInCart[i].option[j].id);
          }
          if (productsInCartOptions.toString() === productItemId.toString()) {
            finalQuantity += productsInCart[i].quantity;
          }
        }
      }
    }

    // console.log({ productItemId, productId, finalQuantity });

    const response = await addToCart(
      productItemId,
      productId,
      finalQuantity
    );

    console.log(response);

    if (response === "Add to cart successfully!") {
      toast({
        title: "Giỏ hàng",
        description: "Thêm đơn hàng thành công!",
      });
    } else {
      toast({
        title: "Giỏ hàng",
        description: "Thêm đơn hàng thất bại!",
      });
    }  };

  const incQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    } else {
      setQuantity(1);
    }
  };

  // useEffect(() => {
  //   (async () => {
  //     setAccessToken(await getAccessToken());
  //   })();
  // }, []);

  useEffect(() => {
    if (product && product.options && product.options.length > 0) {
      let result = [];
      for (let i = 0; i < product.options.length; i++) {
        result.push(product.options[i].name);
      }

      result = result.filter((value, index, array) => {
        return array.indexOf(value) === index;
      });

      let optionsValue = [];
      let initProductItemId = [];
      for (let i = 0; i < result.length; i++) {
        let value = [];
        for (let j = 0; j < product.options.length; j++) {
          if (result[i] === product.options[j].name) {
            const temp = {
              id: product.options[j].id,
              value: product.options[j].value,
            };

            value.push(temp);
          }
        }
        optionsValue.push(value);
        initProductItemId.push(optionsValue[i][0].id);
      }

      setOptions(result);
      setOptionsValue(optionsValue);
      setProductItemId(initProductItemId);
    } else if (product && product.options && product.options.length === 0) {
      setProductId(product.id);
    }
  }, [product]);
  const starsCount = Math.round(product.ratingAverage);

  // console.log(productItemId.toString());
  // console.log(accessToken);
  console.log(product);

  return (
    <>
      {product && (
        <div className="w-100 pt-5 pl-5 pr-9">
          {/* Product Name */}
          <div className="text-xl font-medium leading-6 flex">
            <span>{product.name}</span>
          </div>
          {/* Product Rating */}
          <div className="mt-3">
            <div className="cursor-pointer flex items-center gap-1">
              <span className="text-black font-semibold">
                {product.ratingAverage}
              </span>
              <div className="flex gap-1 items-center">
                {Array.from({ length: 5 }).map((_, index) => (
                  <svg
                    key={index}
                    className={`size-4 ${
                      index < starsCount ? "text-yellow-300" : "text-gray-400"
                    }`}
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>
          {/* Product Price */}
          <div className="mt-3 flex flex-col">
            <div className="flex flex-col py-4 px-5 bg-price">
              <section className="flex items-center gap-4">
                {product && product.discountRate > 0 && (
                  <div className="line-through text-gray-400 text-sm">
                    ₫
                    {convertPrice(
                      (product.price * (100 - product.discountRate)) / 100
                    )}
                  </div>
                )}
                <div className="text-2xl text-red-500">
                  ₫{convertPrice(product.price)}
                </div>
                {product.discountRate > 0 && (
                  <>
                    {" "}
                    <div className="uppercase text-sm text-white bg-red-500 p-1 rounded-sm">
                      {product.discountRate}% Giảm
                    </div>
                  </>
                )}
              </section>
            </div>
          </div>
          {/* Product Option */}
          <div className="flex flex-col mt-4 gap-4">
            {options &&
              options.map((option, index) => (
                <div
                  key={`option-${index}`}
                  className="flex gap-3 items-center"
                >
                  <div className="w-24 text-gray-500 text-sm">{option}:</div>
                  <div className="flex flex-wrap gap-3">
                    {optionsValue[index].map((optionValue, idx) => {
                      return (
                        <Button
                          key={optionValue.id}
                          variant="outline"
                          className={
                            optionValue.id === productItemId[index]
                              ? "border-primary text-primary"
                              : ""
                          }
                          onClick={() => {
                            let newProductItemId = [...productItemId];
                            newProductItemId[index] = optionValue.id;
                            setProductItemId(newProductItemId);
                          }}
                        >
                          {optionValue.value}
                        </Button>
                      );
                    })}
                  </div>
                </div>
              ))}
          </div>
          {/* Quantity */}
          <div className="flex items-center gap-4 text-sm mt-6 h-8">
            <div className="w-28 mt-2 text-gray-500">Số lượng </div>
            <div className="flex items-center">
              <button
                style={{ border: "1px solid rgba(0, 0, 0, .09)" }}
                className="inline-flex mt-2 p-2 rounded-sm items-center justify-center w-8"
                onClick={() => decQuantity()}
              >
                -
              </button>
              <input
                type="text"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                style={{ border: "1px solid rgba(0, 0, 0, .09)" }}
                className="inline-flex mt-2 p-2 w-12 text-center"
              />
              <button
                style={{ border: "1px solid rgba(0, 0, 0, .09)" }}
                className="inline-flex mt-2 p-2 rounded-sm items-center justify-center w-8"
                onClick={() => incQuantity()}
              >
                +
              </button>
              <label className="text-gray-500 items-center inline-flex ms-4 mt-2">
                9999 sản phẩm có sẵn
              </label>
            </div>
          </div>
          {/* Add To Cart */}
          <div className="mt-4 flex w-100 pt-5 pr-9 text-sm">
            <Button className="text-white" onClick={() => handleAddToCart()}>
              <ShoppingCart className="mr-2 size-5" />
              Thêm vào giỏ hàng
            </Button>
          </div>
          <Toaster />
        </div>
      )}
    </>
  );
};