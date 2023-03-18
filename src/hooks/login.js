import { toast } from "react-toastify";
import { getToken } from "../utility/Constant";

export const loginUser = ({ endPoint, data, navigate }) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getToken(),
    },
    body: JSON.stringify(data),
  };
  fetch(`${process.env.REACT_APP_API_URL}/${endPoint}`, requestOptions)
    .then(async (response) => {
      const isJson = response.headers
        .get("content-type")
        ?.includes("application/json");
      const data = isJson && (await response.json());
      let success = "";

      // check for error response
      if (!response.ok) {
        // get error message from body or default to response status
        const error = data.error;
        return Promise.reject(error);
      } else {
        success = data.message;
        toast.success(success, {
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
      sessionStorage.setItem("dashboardToken", data.data.token);
      navigate("/");
    })
    .catch((error) => {
      toast.error(error, {
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
