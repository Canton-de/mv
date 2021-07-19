 const cutString = (str, maxLen = 200) => {
  if (str.length <= maxLen) return str;
  const cuttedStr = str.slice(0, maxLen);
  return `${cuttedStr.slice(0, cuttedStr.lastIndexOf(' '))}...`;
};
export default cutString