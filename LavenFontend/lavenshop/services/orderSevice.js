import axios from "axios";
export const getAllOrders = async (token, pageNo, pageSize) => {
  let config = {
    maxBodyLength: Infinity,
    headers: {
        "X-Auth-User-Id": "1",  
    },
    params: {
      pageNo,
      pageSize,
    },
  };
  try {
    const res = await axios.get("http://localhost:8080/api/v1/order", config);
    if (res && res.data) {
      console.log("res.data", res.data);
      return res.data;
    }
  } catch (error) {
    console.log(error);
  }
};