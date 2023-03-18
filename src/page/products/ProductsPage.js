import React, { useContext, useState } from "react";
import { COUNTER_CONTEXT } from "../../App";
import SearchBar from "../../components/searchBar/SearchBar";
import Products from "./Products";

const ProductsPage = () => {
  const { activeProducts } = useContext(COUNTER_CONTEXT);

  const [searchedData, setSearchedData] = useState([]);
  const [searchBarActive, setSearchbarActive] = useState(false);

  const handleSearch = (e) => {
    const input = e.target.value.toLowerCase();
    setSearchedData(
      activeProducts.filter(
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

      <Products products={searchBarActive ? searchedData : activeProducts} />
    </section>
  );
};

export default ProductsPage;
