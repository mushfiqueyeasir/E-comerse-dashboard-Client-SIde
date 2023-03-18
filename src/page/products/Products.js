import React from "react";
import ProductCard from "../../components/productCard/ProductCard";
import ProductUpdateModal from "../../components/productUpdateModal/ProductUpdateModal";

const Products = ({ products }) => {
  return (
    <section className="">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 xl:grid-cols-8  gap-3">
        {products.map((item, index) => (
          <ProductCard key={index} data={item} />
        ))}
      </div>
      {products.map((item, index) => (
        <ProductUpdateModal key={index} data={item} />
      ))}
    </section>
  );
};

export default Products;
