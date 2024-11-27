import trimText from "@/utils/trimText";

const NotificationRow = ({ notification, className, onSelected }) => {
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

  return (
    <>
      {/* <td>
          <CustomCheckbox />
        </td> */}
      <td className={className + " rounded-l-[4px]"} onClick={onSelected}>
        <div className="px-[4px]">{formatDate(notification.timestamp)}</div>
      </td>
      <td className={className} onClick={onSelected}>
        <div className="">{notification.title}</div>
      </td>
      <td className={className + " rounded-r-[4px]"} onClick={onSelected}>
        <div className="py-[12px]">
          {notification?.message?.length > 0
            ? trimText(notification.message, 60)
            : ""}
        </div>
      </td>
    </>
  );
};

export default NotificationRow;