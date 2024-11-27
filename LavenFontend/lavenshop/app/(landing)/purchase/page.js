"use client";

import { MapPin } from "@/components/icons/map-pin";
import { Ticket } from "@/components/icons/ticket";
import { convertPrice } from "@/utils/convertPrice";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { deleteAllCart, getCart } from "@/services/cartServices";
import axios from "axios";

export default function PurchasePage() {
  const [cartItems, setCartItems] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("COD");

  const router = useRouter();

  const fetchCartItems = async () => {
    setCartItems(await getCart());
  };


  useEffect(() => {
    fetchCartItems();
  }, []);

  const createOrder = async (addressId, paymentMethod) => {
    let data = JSON.stringify({
      addressId: addressId,
      paymentMethod: paymentMethod,
      returnUrl: "http://localhost:3000/payment/success",
      cancelUrl: "http://localhost:3000/payment/error",
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:8080/api/v1/order",
      headers: {
        "Content-Type": "application/json",
        "X-Auth-User-Id": "1",  
      },
      data: data,
    };

    try {
      const response = await axios.request(config);

      if (response) {
        return response;
      }
    } catch (error) {
      return error;
    }
  };

  const onLocationClick = () => {};

  const calculateTotalPrice = () => {
    let total = 0;

    if (!cartItems) return;

    for (let i = 0; i < cartItems.length; i++) {
      total +=
        cartItems[i].price *
        (100 - cartItems[i].discountRate) *
        cartItems[i].quantity;
    }
    return total / 100;
  };

  // console.log(cartItems);
  // console.log(paymentMethod);
  // console.log(accessToken);

  return (
    <div className="bg-gray-100 px-32 h-full">
      <div className="space-y-4 py-4">
        <div className="bg-white p-8 space-y-4 rounded items-center">
          <div className="flex gap-x-2 text-primary items-center">
            <MapPin className="size-5" />
            <span>Địa chỉ nhận hàng</span>
          </div>
          <div className="flex gap-4 items-center">
            <span className="block w-1/6">Huỳnh Duy Đông (+84) 338688127</span>

            <div className="flex flex-grow gap-2">
              <span className="flex-grow">
                Trường Đại Học Mở TPHCM, 97 Võ Văn Tần, Phường 6, Quận 3, TP.HCM
              </span>
              <div className="flex items-center justify-center w-[130px]">
                <span
                  className="bg-white text-primary border-primary border text-xs font-medium me-2 px-2.5 py-0.5"
                  onClick={() => onLocationClick()}
                >
                  Mặc định
                </span>
              </div>
            </div>

            <div className="flex w-1/6 items-center justify-center">
              <button className="text-primary hover:underline">Thay đổi</button>
            </div>
          </div>
        </div>

        <div className="flex flex-col bg-white rounded items-center divide-y divide-dashed">
          <div className="w-full p-8">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-gray-500">
                  <th className="px-6 py-3 text-left">Sản phẩm</th>
                  <th className="px-6 py-3 text-left">Phân loại hàng</th>
                  <th className="px-6 py-3">Đơn giá</th>
                  <th className="px-6 py-3">Số lượng</th>
                  <th className="px-6 py-3">Thành tiền</th>
                </tr>
              </thead>
              {/* <tbody>
                {PRODUCT_ARRAY &&
                  PRODUCT_ARRAY.length > 0 &&
                  PRODUCT_ARRAY.map((product, index) => {
                    return (
                      <tr key={`product-${index}`}>
                        <td className="flex items-center gap-2 px-6 py-4">
                          <img className="size-10" src={product.img} />
                          <span className="line-clamp-1">{product.name}</span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          {product.color}
                        </td>
                        <td className="px-6 py-4 text-center">
                          {convertPrice(product.price)}
                        </td>
                        <td className="px-6 py-4 text-center">
                          {product.quantity}
                        </td>
                        <td className="px-6 py-4 text-center">
                          {convertPrice(product.total)}
                        </td>
                      </tr>
                    );
                  })}
              </tbody> */}
              <tbody className="bg-detail">
                {cartItems &&
                  cartItems?.length > 0 &&
                  cartItems?.map((item, index) => (
                    <tr key={`cart-item-${index}`} className="bg-white mb-4">
                      <td className="flex items-center gap-6 px-12 py-4">
                        <img
                          src={item.thumbnailUrl}
                          alt="Product"
                          className="w-20"
                        />
                        <div className="text-sm line-clamp-2">{item.name}</div>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        {!item.option && <div>Không có</div>}
                        {item.option &&
                          item.option.length > 0 &&
                          item.option.map((option) => (
                            <div key={option.id}>
                              <span className="text-gray-500 ">
                                {option.name}:
                              </span>{" "}
                              {option.value}
                            </div>
                          ))}
                      </td>
                      <td className="px-6 py-4 text-sm items-center justify-center">
                        {item.discountRate > 0 && (
                          <div className="flex gap-3">
                            {/* <span className="text-gray-300 line-through">
                              {convertPrice(item.price)}đ
                            </span> */}
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
                      <td className="px-6 py-4 text-sm whitespace-nowrap text-center">
                        <div className="flex items-center justify-center">
                          {item.quantity}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm whitespace-nowrap text-center font-semibold text-primary">
                        {convertPrice(
                          item.price *
                            (1 - item.discountRate * 0.01) *
                            item.quantity
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          <div className="flex gap-4 w-full items-center p-8">
            <div>Lời nhắn:</div>
            <input
              type="text"
              id="message"
              className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[300px] p-2.5"
              placeholder="Lưu ý cho người bán..."
            />
          </div>
        </div>

        <div className="flex flex-col bg-white rounded items-center divide-y divide-dashed">
          {/* <div className="flex w-full justify-between p-8">
            <div className="flex gap-2 items-center">
              <Ticket className="size-5" />
              <span>Mã giảm giá</span>
            </div>
            <button
              className="text-primary hover:underline"
              onClick={() => onVoucherClick()}
            >
              Chọn hoặc nhập mã giảm giá
            </button>
          </div> */}

          <div className="flex w-full justify-between p-8">
            <span>Phương thức thanh toán:</span>
            <Select
              value={paymentMethod}
              onValueChange={(value) => setPaymentMethod(value)}
            >
              <SelectTrigger className="w-[250px]">
                <SelectValue placeholder="Chọn phương thức thanh toán" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem className="hover:cursor-pointer" value="COD">
                  Thanh toán khi nhận hàng
                </SelectItem>
                <SelectItem className="hover:cursor-pointer" value="PAYPAL">
                  Thanh toán qua Paypal
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end w-full bg-blue-50 p-8">
            <div className="space-y-4 w-[400px]">
              <div className="flex justify-between items-center">
                <span className="text-gray-500 text-sm">Tổng tiền hàng:</span>
                <span className="text-sm">
                  {convertPrice(calculateTotalPrice())}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500 text-sm">Phí giao hàng:</span>
                <span className="text-sm">{convertPrice(20000)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500 text-sm">
                  Tổng thanh toán ({cartItems?.length ?? 0} sản phẩm):
                </span>
                <span className="text-xl text-primary font-semibold">
                  {convertPrice(calculateTotalPrice() + 20000)}đ
                </span>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="w-[150px] text-white bg-primary hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
                  onClick={() =>
                    createOrder("", paymentMethod)
                      .then((response) => {
                        if (paymentMethod === "COD") {
                          router.push(`/payment/success`);
                          deleteAllCart();
                        } else if (paymentMethod === "PAYPAL") {
                          // console.log(response.data.paypalLink);
                          router.push(response.data.paypalLink);
                        }
                      })
                      .catch((error) => router.push(`/payment/error`))
                  }
                >
                  Mua hàng
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}