import React from "react";

import ProductCard from "../../components/productCard/ProductCard";

const DeletedProduct = ({ deletedProducts, deletedProductRefetch }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6  gap-3">
      {deletedProducts.map((item, index) => (
        <ProductCard
          key={index}
          data={item}
          sold={true}
          deleted={true}
          refetch={deletedProductRefetch}
        />
      ))}
    </div>
  );
};

export default DeletedProduct;
