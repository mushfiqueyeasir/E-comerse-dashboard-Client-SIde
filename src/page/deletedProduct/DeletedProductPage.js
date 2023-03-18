import React, { useContext, useState } from "react";
import { COUNTER_CONTEXT } from "../../App";
import ProductCard from "../../components/productCard/ProductCard";
import ProductUpdateModal from "../../components/productUpdateModal/ProductUpdateModal";
import SearchBar from "../../components/searchBar/SearchBar";
import DeletedProduct from "./DeletedProduct";

const DeletedProductPage = () => {
  const { deletedProducts, deletedProductRefetch } =
    useContext(COUNTER_CONTEXT);

  const [searchedData, setSearchedData] = useState([]);
  const [searchBarActive, setSearchbarActive] = useState(false);

  const handleSearch = (e) => {
    const input = e.target.value.toLowerCase();
    setSearchedData(
      deletedProducts.filter(
        (item) =>
          item.productName.toLowerCase().search(input) >= 0 ||
          item.productCategory.toLowerCase().search(input) >= 0 ||
          item.productBrand.toLowerCase().search(input) >= 0
      )
    );
    setSearchbarActive(e.target.value ? true : false);
  };

  return (
    <section className="">
      <div className="flex justify-center">
        <SearchBar handleSearch={handleSearch} />
      </div>

      <DeletedProduct
        deletedProducts={searchBarActive ? searchedData : deletedProducts}
      />

      {deletedProducts.map((item, index) => (
        <ProductUpdateModal
          key={index}
          data={item}
          refetch={deletedProductRefetch}
        />
      ))}
    </section>
  );
};

export default DeletedProductPage;
