import { useEffect, useState } from "react";
const OrderRow = ({ order, className, onSelected }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    return formattedDate;
  };
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
  // const [userName, setUserName] = useState("");
  // const getUserName = async () => {
    
  //   const data = await getUserById( order.userId);
  //   setUserName(data?.name);
  // };
  // useEffect(() => {
  //   getUserName();
  // }, []);
  return (
    <>
      <td className={className + " rounded-l-[4px]"} onClick={onSelected}>
        <div className="px-[4px]">{formatDate(order.createdAt)}</div>
      </td>
      <td className={className} onClick={onSelected}>
        <div className="">{order.status}</div>
      </td>
      <td className={className} onClick={onSelected}>
        {/* <div className="">{userName}</div> */}
        <div className="">Đông</div>

      </td>
      <td className={className} onClick={onSelected}>
        <div className="">{formatMoney(order.total)}đ</div>
      </td>
      <td className={className} onClick={onSelected}>
        <div className="">{order.paymentMethod}</div>
      </td>
      <td className={className} onClick={onSelected}>
        <div className="">{order.paymentStatus}</div>
      </td>
      <td className={className + " rounded-r-[4px]"} onClick={onSelected}>
        <div className="py-[12px]">{formatMoney(order.shippingFee)}đ</div>
      </td>
    </>
  );
};
export default OrderRow;