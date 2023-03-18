export const getToken = () => {
  const tempToken = sessionStorage.getItem("dashboardToken")
    ? sessionStorage.getItem("dashboardToken")
    : "asdf";

  let charPlace = tempToken.indexOf(".");
  let payLoad = tempToken.slice(0, charPlace + 1);
  let legitToken = tempToken.slice(charPlace + 11);

  return payLoad + legitToken;
};
