import React, { useState } from "react";
import Header from "./components/Header";
import { ISelectOption } from "../../interface/common";
import Body from "./components/Body";
import ComingSoonImage from "../../assets/ComingSoon.png";
import Modal from "components/Modal";

export const FilterOptions = [
  { value: "All", label: "All" },
  { key: 0, value: "BY_CATEGORY", label: "By Category" },
  { key: 1, value: "BY_PRICE", label: "By Price" },
];

const Product = () => {
  const [search, setSearch] = useState<string>("");
  const [openModalOne, setOpenModalOne] = useState<boolean>(false);
  const [selectedFilter, setSelectedFilter] = useState<ISelectOption>({
    label: "All",
    value: "All",
  });

  const handleSearch = () => {
    setOpenModalOne(true)
  };

  const handleCloseModalOne = () => {
    setOpenModalOne(false);
  };

  return (
    <div className="">
      <Modal
        title="Unavailable Right Now"
        message="This feature will be available soon."
        image={ComingSoonImage}
        buttonlabel="Close"
        open={openModalOne}
        onClose={handleCloseModalOne}
        callback={handleCloseModalOne}
      />
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
