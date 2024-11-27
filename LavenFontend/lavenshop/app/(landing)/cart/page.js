"use client";

import { useState, useEffect } from "react";
import { getCart, updateCart, deleteCart } from "@/services/cartServices";
import { convertPrice } from "@/utils/convertPrice";
import { useRouter } from "next/navigation";
export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const router = useRouter();
  const fetchCartItems = async () => {
      setCartItems(await getCart());
  };

  const updateCartItem = async (productId, productItemId, delta) => {
    if (productItemId === null) {
      await updateCart(productId, null, delta);
    } else {
      for (let i = 0; i < productItemId.length; i++) {
        productItemId[i] = productItemId[i].id;
      }
      await updateCart(null, productItemId, delta);
    }
  };

  const deleteCartItem = async (productId, productItemId) => {
    if (productItemId === null) {
      await deleteCart(productId, null);
    } else {
      for (let i = 0; i < productItemId.length; i++) {
        productItemId[i] = productItemId[i].id;
      }
      await deleteCart(null, productItemId);
    }
  };

  // useEffect(() => {
  //   (async () => {
  //     setAccessToken(await getAccessToken());
  //   })();
  // }, []);

  useEffect(() => {
    fetchCartItems();
  }, []);

  const lessOfThisProduct = async (itemId, itemOption, itemQuantity) => {
    console.log({ itemId, itemOption, itemQuantity });

    if (itemQuantity > 1) {
      updateCartItem(itemId, itemOption, -1);
      fetchCartItems();
    } else {
      if (
        window.confirm("Bạn có chắc muốn xóa sản phẩm này ra khỏi giỏ hàng?")
      ) {
        deleteCartItem(itemId, itemOption);
        fetchCartItems();
      }
    }
  };

  const moreOfThisProduct = (itemId, itemOption) => {
    updateCartItem(itemId, itemOption, 1);
    fetchCartItems();
  };

  const calculateTotalPrice = () => {
    let total = 0;
    for (let i = 0; i < cartItems.length; i++) {
      total +=
        cartItems[i].price *
        (100 - cartItems[i].discountRate) *
        cartItems[i].quantity;
    }
    return total / 100;
    };

  console.log(cartItems);

  return (
    <div className="bg-gray-100 w-full px-32 py-10 h-full ">
      <div className="text-lg font-medium pb-8">GIỎ HÀNG</div>
      {cartItems && cartItems.length == 0 && (
        <div className="flex flex-col bg-white p-6 gap-2 items-center rounded-md">
          <img
            src="https://salt.tikicdn.com/ts/upload/43/fd/59/6c0f335100e0d9fab8e8736d6d2fbcad.png"
            alt="empty-cart"
            className="w-[200px]"
          />
          <div className="font-medium">Giỏ hàng đang trống!</div>
          <div>
            Bạn tham khảo thêm các sản phẩm được Laven gợi ý bên dưới nhé!
          </div>
        </div>
      )}
      {cartItems && cartItems.length > 0 && (
        <table className="table-auto w-full mb-4">
          <thead className="bg-white mb-4">
            <tr>
              <th
                scope="col"
                className="flex items-center gap-6 py-5 px-12 text-sm text-left font-semibold"
              >
                <input type="checkBox" />
                <span>Sản phẩm</span>
              </th>
              <th scope="col" className="px-2 py-4 text-sm font-semibold">
                Phân loại hàng
              </th>
              <th scope="col" className="px-2 py-4 text-sm font-semibold ">
                Đơn giá
              </th>
              <th scope="col" className="px-2 py-4 text-sm font-semibold">
                Số lượng
              </th>
              <th scope="col" className="px-2 py-4 text-sm font-semibold">
                Số tiền
              </th>
              <th scope="col" className="px-2 py-4 text-sm font-semibold"></th>
            </tr>
          </thead>
          <tbody className="bg-detail">
            <tr className="bg-detail h-4"></tr>
            {cartItems &&
              cartItems.length > 0 &&
              cartItems.map((item, index) => (
                <tr key={`cart-item-${index}`} className="bg-white mb-4">
                  <td className="flex items-center gap-6 px-12 py-4">
                    <input type="checkBox" />
                    <img
                      src={item.thumbnailUrl}
                      alt="Product"
                      className="w-20"
                    />
                    <div className="text-sm line-clamp-2">{item.name}</div>
                  </td>
                  <td className="px-2 py-4 text-sm">
                    {!item.option && <div>Không có</div>}
                    {item.option &&
                      item.option.length > 0 &&
                      item.option.map((option, index) => (
                        <div key={option.id}>
                          <span className="text-gray-500 ">{option.name}:</span>{" "}
                          {option.value}
                        </div>
                      ))}
                  </td>
                  <td className="px-2 py-4 text-sm whitespace-nowrap flex items-center justify-center gap-2">
                    {item.discountRate > 0 && (
                      <div className="flex gap-3">
                        <span className="text-gray-300 line-through">
                          {convertPrice(item.price)}đ
                        </span>
                        {convertPrice(
                          item.price * (1 - item.discountRate * 0.01)
                        )}
                        đ
                      </div>
                    )}
                    {item.discountRate === 0 && (
                      <div>{convertPrice(item.price)}đ</div>
                    )}
                  </td>
                  <td className="px-2 py-4 text-sm whitespace-nowrap text-center">
                    <div className="flex items-center justify-center">
                      <button
                        style={{ border: "1px solid rgba(0, 0, 0, .09)" }}
                        className="inline-flex mt-2 p-2 rounded-l-sm items-center justify-center w-8"
                        onClick={() =>
                          lessOfThisProduct(item.id, item.option, item.quantity)
                        }
                      >
                        -
                      </button>
                      <input
                        type="text"
                        value={item.quantity}
                        style={{
                          borderStyle: "solid",
                          borderWidth: "1px 0px",
                          borderColor: "rgba(0, 0, 0, .09)",
                        }}
                        className="inline-flex mt-2 p-2 w-12 text-center"
                        onChange={() => {}}
                      />
                      <button
                        style={{ border: "1px solid rgba(0, 0, 0, .09)" }}
                        className="inline-flex mt-2 p-2 rounded-r-sm items-center justify-center w-8"
                        onClick={() => moreOfThisProduct(item.id, item.option)}
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="px-2 py-4 text-sm whitespace-nowrap text-center font-semibold text-primary">
                    {convertPrice(
                      item.price *
                        (1 - item.discountRate * 0.01) *
                        item.quantity
                    )}
                  </td>
                  <td className="px-2 py-4 text-sm whitespace-nowrap text-center text-warning">
                    <button
                      onClick={() => {
                        if (
                          window.confirm(
                            "Bạn có chắc muốn xóa sản phẩm này ra khỏi giỏ hàng?"
                          )
                        ) {
                          deleteCartItem(item.id, item.option);
                          fetchCartItems();
                        }
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
          <tfoot className="bg-white divide-y-2 divide-dashed">
            <tr>
              <td className="px-12 py-4 text-sm whitespace-nowrap text-center"></td>
              <td className="px-2 py-4 text-sm whitespace-nowrap text-center"></td>
              <td className="px-2 py-4 text-sm whitespace-nowrap text-center"></td>
              <td className="px-2 py-4 text-sm whitespace-nowrap text-center flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z"
                  />
                </svg>
                Mã giảm giá
              </td>
              <td
                className="px-2 py-4 text-sm whitespace-nowrap text-center"
                colSpan={2}
              >
                <p className="text-primary text-end pr-16">Chọn hoặc nhập mã</p>
              </td>
            </tr>
            <tr className="font-medium">
              <td
                className="px-2 py-8 text-sm whitespace-nowrap flex items-center gap-2 pl-12"
                colSpan={1}
              >
                <input type="checkBox" />
                <span>Chọn tất cả ({cartItems.length})</span>
                <span>Xóa</span>
              </td>
              <td
                className="px-2 py-4 text-sm whitespace-nowrap text-end pr-16"
                colSpan={5}
              >
                <span>Tổng thanh toán ({cartItems.length} sản phẩm): </span>
                <span className="text-primary text-lg">
                  đ{convertPrice(calculateTotalPrice())}
                </span>
                <button
                  className="px-16 bg-primary text-white py-3 rounded-md ms-8"
                  onClick={() => {
                    router.push(`/purchase`);
                  }}
                >
                  Mua hàng
                </button>
              </td>
            </tr>
          </tfoot>
        </table>
      )}
    </div>
  );
}