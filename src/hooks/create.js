import axios from "axios";
import { toast } from "react-toastify";
import { getToken } from "../utility/Constant";

export const create = ({
  endPoint,
  data,
  imageUpdate,
  fileUpdate,
  item,
  refetch,
}) => {
  const headers =
    item === "user"
      ? {
          Authorization: "Bearer " + getToken(),
          "Content-Type": "application/json",
        }
      : {
          Authorization: "Bearer " + getToken(),
          "Content-Type": "multipart/form-data",
        };
  axios({
    method: "post",
    url: `${process.env.REACT_APP_API_URL}/${endPoint}`,
    data: data,
    headers: headers,
  })
    .then(function (response) {
      if (imageUpdate) {
        imageUpdate("");
      }
      if (fileUpdate) {
        fileUpdate("No file chosen");
      }
      if (refetch) {
        refetch();
      }
      toast.success(
        `${item === "user" ? "User" : "Product"} Added Successfully`,
        {
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );
    })
    .catch(function (response) {
      //handle error
      console.log(response);
      toast.error(response.message, {
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    });
};
