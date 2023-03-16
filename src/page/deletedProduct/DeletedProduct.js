import React from "react";
import ProductCard from "../../components/productCard/ProductCard";
import SearchBar from "../../components/searchBar/SearchBar";
import useFetch from "../../hooks/useFetch";

const DeletedProduct = () => {
  const [products, loading, refetch] = useFetch({ api: "products/inactive" });

  if (loading) {
    return <h2>loading..</h2>;
  }

  return (
    <section className="">
      <div className="flex justify-center">
        <SearchBar />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6  gap-3">
        {products.map((item, index) => (
          <ProductCard key={index} data={item} sold={true} deleted={true} />
        ))}
      </div>
    </section>
  );
};

export default DeletedProduct;
