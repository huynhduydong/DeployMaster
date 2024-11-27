const convertPrice = (price) => {
  if (price === undefined || price === null) {
    return "";
  }
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

const convertNumber = (price) => {
  if (price === undefined || price === null) {
    return "";
  }
  return price.toString().replaceAll(",", "");
};

export { convertNumber, convertPrice };