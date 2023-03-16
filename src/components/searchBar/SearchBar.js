import React, { useState } from "react";

import {
  searchBarBodyStyle,
  searchBarContainerStyle,
  searchBarIconStyle,
  searchBarInputStyle,
} from "./styledClass";

const SearchBar = ({ handleSearch }) => {
  const [search, setSearch] = useState(false);
  const [searchText, setSearchText] = useState("");
  return (
    <div className={searchBarContainerStyle}>
      <div className={searchBarBodyStyle}>
        <input
          onChange={
            (handleSearch, (event) => setSearchText(event.target.value))
          }
          onFocus={() => setSearch(true)}
          onBlur={() => setSearch(searchText ? true : false)}
          type="text"
          name="search"
          placeholder="Search..."
          className={searchBarInputStyle}
        />
        {!search && (
          <label className={searchBarIconStyle}>
            <i className="fas fa-search"></i>
          </label>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
