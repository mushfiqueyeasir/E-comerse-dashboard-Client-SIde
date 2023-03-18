import React, { useEffect, useRef, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const ProductsCharts = ({ product }) => {
  const [divWidth, setDivWidth] = useState(0);
  const divRef = useRef(null);

  useEffect(() => {
    if (divRef.current) {
      setDivWidth(divRef.current.offsetWidth);
      const handleResize = () => {
        setDivWidth(divRef.current.offsetWidth);
      };
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);
  const data = [
    {
      name: product.productName,
      Stock: product.productStock.sum,
      Sold: product.productSold,
    },
  ];

  return (
    <div
      ref={divRef}
      className="border-2 rounded-lg w-full shadow-lg p-1 py-4 lg:pr-4 lg:pt-8 hover:scale-[1.05] duration-300"
    >
      <BarChart
        width={(divWidth / 100) * 90}
        height={(divWidth / 100) * 80}
        data={data}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Stock" fill="#7CD9E2" />
        <Bar dataKey="Sold" fill="#649FD3" />
      </BarChart>
    </div>
  );
};

export default ProductsCharts;
