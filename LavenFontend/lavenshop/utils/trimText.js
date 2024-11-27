const trimText = (title, maxTitleLength) => {
  return title.length > maxTitleLength
    ? title.substring(0, maxTitleLength) + ".."
    : title;
};

export default trimText;
