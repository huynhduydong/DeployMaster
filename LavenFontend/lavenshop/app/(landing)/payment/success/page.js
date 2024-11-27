"use client";

import { deleteAllCart } from "@/services/cartServices";
import axios from "axios";
import { useEffect, useState } from "react";

export default function PaymentSuccess() {
  const [newestOrderId, setNewestOrderId] = useState();



  useEffect(() => {
    getAllOrders();
  }, []);

  useEffect(() => {
    if (!newestOrderId) return;

    captureOrder(newestOrderId);
    deleteAllCart();
  }, [newestOrderId]);

  const getAllOrders = async () => {
    let data = "";

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "http://localhost:8080/api/v1/order",
      headers: {
        "X-Auth-User-Id": "1",  
      },
      data: data,
    };

    try {
      const response = await axios.request(config);

      if (response) {
        setNewestOrderId(response.data.totalElements);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const captureOrder = async (newestOrderId) => {
    let data = "";

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `http://localhost:8080/api/v1/order/paypal_capture/${newestOrderId}`,
      headers: {
        "X-Auth-User-Id": "1",  
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error;
      });
  };

  return (
    <div className="h-full py-6">
      <div className="bg-phuoc mx-32">
        <div className="bg-white p-6 md:mx-auto">
          <svg
            viewBox="0 0 24 24"
            className="text-green-600 w-16 h-16 mx-auto my-6"
          >
            <path
              fill="currentColor"
              d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
            ></path>
          </svg>
          <div className="text-center">
            <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
              Thanh toán thành công!
            </h3>
            <p className="text-gray-600 my-2">
              Chân thành cảm ơn bạn đã mua hàng tại cửa hàng của chúng tôi.
            </p>
            <p> Chúc bạn một ngày tốt lành! </p>
            <div className="py-10 text-center">
              <a
                href="/"
                className="px-12 bg-primary hover:bg-blue-500 text-white font-semibold rounded-md py-3"
              >
                QUAY LẠI
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}