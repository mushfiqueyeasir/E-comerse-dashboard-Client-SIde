import axios from "axios";
import { toast } from "react-toastify";
import { getToken } from "../utility/Constant";

export const update = ({
  endPoint,
  data,
  method,
  item,
  activeRefetch,
  soldRefetch,
  deleteRefetch,
  deleted,
  modalCloseID,
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
    method: method,
    url: `${process.env.REACT_APP_API_URL}/${endPoint}`,
    data: data,
    headers: headers,
  })
    .then(function (response) {
      if (activeRefetch) {
        activeRefetch();
      }
      if (soldRefetch) {
        soldRefetch();
      }
      if (deleteRefetch) {
        deleteRefetch();
      }
      if (modalCloseID) {
        document.getElementById(modalCloseID).checked = false;
      }

      toast.success(`Product ${deleted ? "Deleted" : "Added"} Successfully`, {
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
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
