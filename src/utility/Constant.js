export const getToken = () => {
  const token = sessionStorage.getItem("dashboardToken")
    ? sessionStorage.getItem("dashboardToken")
    : "";
  return token;
};
