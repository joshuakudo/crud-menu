import { Fragment, useState } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { Popover, RadioGroup, Transition } from "@headlessui/react";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { classNames } from "../../utilities";
import Modal from "../Modal";
import ModalConfirmation from "../ModalConfirmation";
import { useNavigate } from "react-router-dom";
import ComingSoonImage from "../../assets/ComingSoon.png";

import { useProduct } from "../../hooks/product";
import { useDispatch } from "react-redux";
import {
  deleteProductRequest,
  getProductDetailsRequest,
} from "../../redux/product/action";
import AddModalForm from "components/Form";

const product = {
  rating: 5.0,
  reviewCount: 512,
  colors: [
    { name: "Black", bgColor: "bg-gray-900", selectedColor: "ring-gray-900" },
    {
      name: "Heather Grey",
      bgColor: "bg-gray-400",
      selectedColor: "ring-gray-400",
    },
  ],
};

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const GroceryCardDetails: React.FC<IProps> = ({ setOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productDetails = useProduct();

  const option = {
    sizes: [
      {
        name: "S",
        value: "smallStocks",
        inStock: productDetails?.smallStocks! > 0,
        stock: productDetails?.smallStocks,
      },
      {
        name: "M",
        value: "mediumStocks",
        inStock: productDetails?.mediumStocks! > 0,
        stock: productDetails?.mediumStocks,
      },
      {
        name: "L",
        value: "largeStocks",
        inStock: productDetails?.largeStocks! > 0,
        stock: productDetails?.largeStocks,
      },
    ],
    capacities: [
      {
        name: "128GB",
        value: "stocks128gbStorage",
        inStock: productDetails?.stocks128gbStorage! > 0,
        stock: productDetails?.stocks128gbStorage,
      },
      {
        name: "256GB",
        value: "stocks256gbStorage",
        inStock: productDetails?.stocks256gbStorage! > 0,
        stock: productDetails?.stocks256gbStorage,
      },
      {
        name: "1TB",
        value: "stocks1tbStorage",
        inStock: productDetails?.stocks1tbStorage! > 0,
        stock: productDetails?.stocks1tbStorage,
      },
    ],
  };

  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedOption, setSelectedOption] = useState(
    productDetails.category === "apparel"
      ? option.sizes[0]
      : option.capacities[0]
  );

  const options =
    productDetails.category !== "Gadget" ? option.sizes : option.capacities;

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openModalOne, setOpenModalOne] = useState<boolean>(false);
  const [addModal, setAddModal] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [stockLeft, setStockLeft] = useState<number>(
    productDetails?.stocksLeft
  );

  const handleClose = () => {
    setOpen(false);
  };
  const handleCallback = () => {
    setOpenModal(false);
    navigate(-2);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleCloseModalOne = () => {
    setOpenModalOne(false);
  };

  const handleDelete = () => {
    console.log("key", productDetails.key);
    dispatch(deleteProductRequest(productDetails.key));
    setOpen(false);
    setDeleteModal(false);
  };

  const handleCloseDeleteModal = () => {
    setDeleteModal(false);
  };

  const handleUpdate = () => {
    setAddModal(true);
    dispatch(getProductDetailsRequest(productDetails.key));
  };

  const handleOptionClick = (option: {
    name: string;
    inStock: boolean;
    stock: number | undefined;
  }) => {
    setStockLeft(option?.stock!);
  };

  return (
    <>
      <ModalConfirmation
        title="Delete Product"
        message={
          "Are you sure you want to delete this product? This action cannot be undone."
        }
        image={""}
        onClose={handleCloseDeleteModal}
        callback={handleDelete}
        open={deleteModal}
        buttonlabel={"Delete"}
      />

      <ModalConfirmation
        title="Unsaved Changes"
        message="Are you sure you want to cancel?"
        open={openModal}
        callback={handleCallback}
        onClose={handleCloseModal}
        buttonlabel="Continue"
        image=""
      />
      <Modal
        title="Unavailable Right Now"
        message="This feature will be available soon."
        image={ComingSoonImage}
        buttonlabel="Close"
        open={openModalOne}
        onClose={handleCloseModalOne}
        callback={handleCloseModalOne}
      />

      <AddModalForm open={addModal} setOpen={setAddModal} isUpdate />

      <div className="bg-white relative max-h-[1150px]">
        <div className="pb-16 pt-6 ">
          <div className="mx-auto mt-8 max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8 rounded-lg">
            <div className="lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8">
              <div className="lg:col-span-5 lg:col-start-8">
                <div className="flex justify-end mb-4">
                  <Popover className="relative z-40 -top-3">
                    <Popover.Button
                      className="inline-flex outline-none cursor-pointer items-center gap-x-1 text-sm font-bold leading-6 text-gray-500"
                      aria-label="Options"
                    >
                      <EllipsisHorizontalIcon
                        className="h-8 w-8"
                        aria-hidden="true"
                      />
                    </Popover.Button>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="opacity-0 translate-y-1"
                      enterTo="opacity-100 translate-y-0"
                      leave="transition ease-in duration-150"
                      leaveFrom="opacity-100 translate-y-0"
                      leaveTo="opacity-0 translate-y-1"
                    >
                      <Popover.Panel className="absolute z-10 -left-4 top-6 flex w-screen max-w-min -translate-x-1/2 px-10">
                        <div className="w-24 rounded-md bg-white p-2 text-lg leading-6 text-gray-900 shadow-lg ring-1 ring-gray-900/5">
                          <button
                            key="delete"
                            onClick={() => setDeleteModal(true)}
                            className="block py-1 mx-3 w-full text-lg text-left"
                          >
                            Delete
                          </button>
                          <button
                            onClick={handleClose}
                            className="block py-1 mx-3 w-full text-lg text-left"
                          >
                            Close
                          </button>
                        </div>
                      </Popover.Panel>
                    </Transition>
                  </Popover>
                </div>
                <div className="flex justify-between">
                  <h1 className="text-xl font-medium text-gray-900">
                    {productDetails.name}
                  </h1>
                  <p className="text-xl font-medium text-gray-900">
                    ₱ {productDetails.price}
                  </p>
                </div>
                {/* Reviews */}
                <div className="mt-4">
                  <h2 className="sr-only">Reviews</h2>
                  <div className="flex items-center">
                    <p className="text-lg text-gray-700">
                      {product.rating}
                      <span className="sr-only"> out of 5 stars</span>
                    </p>
                    <div className="ml-1 flex items-center">
                      {[0, 1, 2, 3, 4].map((rating) => (
                        <StarIcon
                          key={rating}
                          className={classNames(
                            product.rating > rating
                              ? "text-yellow-400"
                              : "text-gray-200",
                            "h-5 w-5 flex-shrink-0"
                          )}
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                    <div
                      aria-hidden="true"
                      className="ml-4 text-lg text-gray-300"
                    >
                      ·
                    </div>
                    <div className="ml-4 flex">
                      <div
                        onClick={() => {
                          setOpenModalOne(true);
                        }}
                        className="text-lg font-medium text-emerald-900 hover:text-emerald-950"
                      >
                        See all {product.reviewCount} reviews
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Image gallery */}
              <div className="mt-8 lg:col-span-7 lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:mt-0">
                <h2 className="sr-only">Images</h2>

                <div className=" w-full mx-10">
                  <img
                    src={productDetails.files}
                    alt="product"
                    className="h-full w-full object-center object-contain lg:h-[45rem] lg:w-[30rem]"
                  />
                </div>
              </div>

              <div className="mt-8 lg:col-span-5">
                {/* Color picker */}
                <div>
                  <h2 className="text-lg font-medium text-gray-900">Color</h2>

                  <RadioGroup
                    value={selectedColor}
                    onChange={setSelectedColor}
                    className="mt-2"
                  >
                    <RadioGroup.Label className="sr-only">
                      Choose a color
                    </RadioGroup.Label>
                    <div className="flex items-center space-x-3">
                      {product.colors.map((color) => (
                        <RadioGroup.Option
                          key={color.name}
                          value={color}
                          className={({ active, checked }) =>
                            classNames(
                              color.selectedColor,
                              active && checked ? "ring ring-offset-1" : "",
                              !active && checked ? "ring-2" : "",
                              "relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none"
                            )
                          }
                        >
                          <RadioGroup.Label as="span" className="sr-only">
                            {color.name}
                          </RadioGroup.Label>
                          <span
                            aria-hidden="true"
                            className={classNames(
                              color.bgColor,
                              "h-8 w-8 rounded-full border border-black border-opacity-10"
                            )}
                          />
                        </RadioGroup.Option>
                      ))}
                    </div>
                  </RadioGroup>
                </div>

                {/* Size picker */}
                <div className="mt-8">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-medium text-gray-900">
                      Options
                    </h2>
                    {productDetails.category === "Gadget" ? (
                      ""
                    ) : (
                      <>
                        <div
                          onClick={() => {
                            setOpenModalOne(true);
                          }}
                          className="text-lg font-medium text-emerald-900 hover:text-emerald-950"
                        >
                          See sizing chart
                        </div>
                      </>
                    )}
                  </div>

                  <RadioGroup
                    value={selectedOption}
                    onChange={(option) => {
                      setSelectedOption(option);
                      handleOptionClick(option); // Call your specific function here
                    }}
                    className="mt-2"
                  >
                    <RadioGroup.Label className="sr-only">
                      Choose an option
                    </RadioGroup.Label>
                    <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
                      {options.map((option) => (
                        <RadioGroup.Option
                          key={option.name}
                          value={option}
                          className={({ active, checked }) =>
                            classNames(
                              option.inStock
                                ? "cursor-pointer focus:outline-none"
                                : "cursor-not-allowed opacity-25",
                              active
                                ? "ring-2 ring-emerald-950 ring-offset-2"
                                : "",
                              checked
                                ? "border-transparent bg-emerald-900 text-white hover:bg-emerald-950"
                                : "border-gray-200 bg-white text-gray-900 hover:bg-gray-50",
                              "flex items-center justify-center rounded-md border py-3 px-3 text-lg font-medium uppercase sm:flex-1"
                            )
                          }
                          disabled={!option.inStock}
                        >
                          <RadioGroup.Label as="span">
                            {option.name}
                          </RadioGroup.Label>
                        </RadioGroup.Option>
                      ))}
                    </div>
                  </RadioGroup>
                </div>
                <h2 className="text-lg mt-5 font-medium text-gray-900">
                  Stocks Left
                </h2>

                <h2 className="text-lg mt-5 text-gray-900">{stockLeft} pc/s</h2>

                <h2 className="text-lg mt-5 font-medium text-gray-900">Cost</h2>

                <h2 className="text-lg mt-5 text-gray-900">
                  ₱ {productDetails.cost}
                </h2>

                <button
                  onClick={handleUpdate}
                  className="mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-emerald-900 px-8 py-3 text-base font-medium text-white hover:bg-emerald-950 focus:outline-none focus:ring-2 focus:ring-emerald-950 focus:ring-offset-2"
                >
                  Update
                </button>

                {/* Product details */}
                <div className="mt-10">
                  <h2 className="text-lg font-medium text-gray-900">
                    Description
                  </h2>

                  <div
                    className="prose prose-sm mt-4 text-gray-500"
                    dangerouslySetInnerHTML={{
                      __html: productDetails.description,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GroceryCardDetails;
