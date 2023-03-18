import React, { useContext, useState } from "react";
import { COUNTER_CONTEXT } from "../../App";
import ProductCard from "../../components/productCard/ProductCard";
import SearchBar from "../../components/searchBar/SearchBar";
import SoldProducts from "./SoldProducts";

const SoldProductsPage = () => {
  const { soldProducts, soldProductRefetch } = useContext(COUNTER_CONTEXT);

  const [searchedData, setSearchedData] = useState([]);
  const [searchBarActive, setSearchbarActive] = useState(false);

  const handleSearch = (e) => {
    const input = e.target.value.toLowerCase();
    setSearchedData(
      soldProducts.filter(
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
      <SoldProducts
        soldProducts={searchBarActive ? searchedData : soldProducts}
        soldProductRefetch={soldProductRefetch}
      />
    </section>
  );
};

export default SoldProductsPage;
