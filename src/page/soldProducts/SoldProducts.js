import React from "react";
import ProductCard from "../../components/productCard/ProductCard";

const SoldProducts = ({ soldProducts, soldProductRefetch }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 xl:grid-cols-8  gap-3">
      {soldProducts.map((item, index) => (
        <ProductCard
          key={index}
          data={item}
          sold={true}
          refetch={soldProductRefetch}
        />
      ))}
    </div>
  );
};

export default SoldProducts;
