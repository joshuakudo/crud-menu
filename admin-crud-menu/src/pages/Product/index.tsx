import React, { useState } from "react";
import Header from "./components/Header";
import { ISelectOption } from "../../interface/common";
import Body from "./components/Body";

export const FilterOptions = [
  { value: "All", label: "All" },
  { key: 0, value: "BY_CATEGORY", label: "By Category" },
  { key: 1, value: "BY_PRICE", label: "By Price" },
];

const Product = () => {
  const [search, setSearch] = useState<string>("");
  const [selectedFilter, setSelectedFilter] = useState<ISelectOption>({
    label: "All",
    value: "All",
  });

  const handleSearch = () => {};

  return (
    <div className="">
      <div className="relative">
        <Header
          search={search}
          handleSearch={handleSearch}
          setSearch={setSearch}
          filterBy={FilterOptions}
          setFilterBy={setSelectedFilter}
        />
      </div>
      <Body />
    </div>
  );
};

export default Product;
