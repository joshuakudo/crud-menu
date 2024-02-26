import { Fragment, useState } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { Popover, RadioGroup, Transition } from "@headlessui/react";
import {
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/outline";
import { classNames } from "../../utitlities";
import NumberPicker from "../NumberPicker";
import Modal from "../Modal";
import ModalConfirmation from "../ModalConfirmation";
import { useNavigate } from "react-router-dom";
import ComingSoonImage from "../../assets/ComingSoon.png";

const product = {
  name: "Basic Tee",
  price: "$35",
  rating: 3.9,
  reviewCount: 512,
  href: "#",
  breadcrumbs: [
    { id: 1, name: "Women", href: "#" },
    { id: 2, name: "Clothing", href: "#" },
  ],
  images: [
    {
      id: 1,
      imageSrc:
        "https://tailwindui.com/img/ecommerce-images/product-page-01-featured-product-shot.jpg",
      imageAlt: "Back of women's Basic Tee in black.",
      primary: true,
    },
  ],
  colors: [
    { name: "Black", bgColor: "bg-gray-900", selectedColor: "ring-gray-900" },
    {
      name: "Heather Grey",
      bgColor: "bg-gray-400",
      selectedColor: "ring-gray-400",
    },
  ],
  sizes: [
    { name: "XXS", inStock: true },
    { name: "XS", inStock: true },
    { name: "S", inStock: true },
    { name: "M", inStock: true },
    { name: "L", inStock: true },
    { name: "XL", inStock: false },
  ],
  description: `
    <p>The Basic tee is an honest new take on a classic. The tee uses super soft, pre-shrunk cotton for true comfort and a dependable fit. They are hand cut and sewn locally, with a special dye technique that gives each tee it's own look.</p>
    <p>Looking to stock your closet? The Basic tee also comes in a 3-pack or 5-pack at a bundle discount.</p>
  `,
  details: [
    "Only the best materials",
    "Ethically and locally made",
    "Pre-washed and pre-shrunk",
    "Machine wash cold with similar colors",
  ],
};


export default function GroceryCardDetails() {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[2]);
  const [open, setOpen] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openModalOne, setOpenModalOne] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);

  const navigate = useNavigate();

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

  const handleDelete = () => {};

  const handleCloseDeleteModal = () => {
    setDeleteModal(false);
  };

  const handleUpdate = () => {

  }

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
                        </div>
                      </Popover.Panel>
                    </Transition>
                  </Popover>
                </div>
                <div className="flex justify-between">
                  <h1 className="text-xl font-medium text-gray-900">
                    {product.name}
                  </h1>
                  <p className="text-xl font-medium text-gray-900">
                    {product.price}
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
              <div className="mt-8 lg:col-span-7 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0">
                <h2 className="sr-only">Images</h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-3 lg:gap-8">
                  {product.images.map((image) => (
                    <img
                      key={image.id}
                      src={image.imageSrc}
                      alt={image.imageAlt}
                      className={classNames(
                        image.primary
                          ? "lg:col-span-2 lg:row-span-2"
                          : "hidden lg:block",
                        "rounded-lg"
                      )}
                    />
                  ))}
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
                    <h2 className="text-lg font-medium text-gray-900">Size</h2>
                    <div
                      onClick={() => {
                        setOpenModalOne(true);
                      }}
                      className="text-lg font-medium text-emerald-900 hover:text-emerald-950"
                    >
                      See sizing chart
                    </div>
                  </div>

                  <RadioGroup
                    value={selectedSize}
                    onChange={setSelectedSize}
                    className="mt-2"
                  >
                    <RadioGroup.Label className="sr-only">
                      Choose a size
                    </RadioGroup.Label>
                    <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
                      {product.sizes.map((size) => (
                        <RadioGroup.Option
                          key={size.name}
                          value={size}
                          className={({ active, checked }) =>
                            classNames(
                              size.inStock
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
                          disabled={!size.inStock}
                        >
                          <RadioGroup.Label as="span">
                            {size.name}
                          </RadioGroup.Label>
                        </RadioGroup.Option>
                      ))}
                    </div>
                  </RadioGroup>
                </div>
                <h2 className="text-lg mt-5 font-medium text-gray-900">
                  Stocks Left
                </h2>
                <NumberPicker />

                <h2 className="text-lg mt-5 font-medium text-gray-900">Cost</h2>

                <h2 className="text-lg mt-5 text-gray-900">$20</h2>

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
                    dangerouslySetInnerHTML={{ __html: product.description }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
