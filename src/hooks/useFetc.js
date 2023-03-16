import { useEffect, useState } from "react";
import { getToken } from "../utility/Constant";
const useGet = ({ page, pageSize, body }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getToken(),
    },
    body: JSON.stringify(body),
  };

  const api = `lead/list?page=${page}&limit=${pageSize}`;

  const url = `${process.env.REACT_APP_API_URL}/${api}`;

  useEffect(() => {
    fetch(url, requestOptions)
      .then((res) => res.json())
      .then((data) => {
        setData(data.data.data);
        setLoading(false);
      });
  }, [api]);
  return [data, setData, loading];
};

export default useGet;
