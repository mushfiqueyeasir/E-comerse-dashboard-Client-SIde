import React from "react";
import ProductCard from "../../components/productCard/ProductCard";
import SearchBar from "../../components/searchBar/SearchBar";
import useFetch from "../../hooks/useFetch";

const Products = () => {
  const [products, loading, refetch] = useFetch({ api: "products/active" });

  if (loading) {
    return <h2>loading..</h2>;
  }

  return (
    <section className="">
      <div className="flex justify-center">
        <SearchBar />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 xl:grid-cols-8  gap-3">
        {products.map((item, index) => (
          <ProductCard key={index} data={item} />
        ))}
      </div>
    </section>
  );
};

export default Products;
