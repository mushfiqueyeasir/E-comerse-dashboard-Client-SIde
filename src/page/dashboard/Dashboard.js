import React, { useContext } from "react";
import ProductsCharts from "./ProductsCharts";
import product from "../../assets/product.gif";
import stock from "../../assets/stock.gif";
import sale from "../../assets/sale.gif";
import user from "../../assets/user.gif";
import InfoCard from "./InfoCard";

import { COUNTER_CONTEXT } from "../../App";

const Dashboard = () => {
  const { usersList, activeProducts } = useContext(COUNTER_CONTEXT);

  let totalStock = 0;
  let totalSold = 0;
  activeProducts.map((item) => {
    totalStock = totalStock + item.productStock.sum;
    totalSold = totalSold + item.productSold;
  });

  return (
    <section className="container mx-auto py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 py-5 gap-5">
        <InfoCard
          logo={product}
          name={"Product Category"}
          count={activeProducts.length}
        />
        <InfoCard logo={stock} name={"Total Stock"} count={totalStock} />
        <InfoCard logo={sale} name={"Total Sale"} count={totalSold} />
        <InfoCard logo={user} name={"Manager"} count={usersList.length} />
      </div>

      <div className="py-10">
        <h1 className="flex items-center gap-3 font-bold text-xl  md:text-2xl px-4 py-5 text-gray-500">
          <hr className="border-[1.5px] md:border-2 border-gray-500 w-[52px]" />{" "}
          Products Analytics
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {activeProducts.map((item, index) => (
            <ProductsCharts key={index} product={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
