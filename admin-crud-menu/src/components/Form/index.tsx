import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik, FormikValues } from "formik";
import React, { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { PhotoIcon, XCircleIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { useDispatch } from "react-redux";
import { FileRejection, useDropzone } from "react-dropzone";
import SelectOption from "../SelectOption";
import { addProductRequest, updateProductRequest } from "../../redux/product/action";
import { useAddProductSuccess, useProduct } from "hooks/product";
import { ISelectOption } from "interface/common";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from "firebase/storage";
import app from "firebaseInit";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { SuccessToast } from "components/Toastify";
import { Modal } from "@mui/material";
import { CheckIcon } from "@heroicons/react/24/outline";

interface IProps {
  open: boolean;
  isUpdate?: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const FilterOptions = [
  { key: 0, value: "Gadget", label: "Gadget" },
  { key: 1, value: "Apparel", label: "Apparel" },
  { key: 2, value: "Snacks", label: "Snacks" },
  { key: 3, value: "Dairy", label: "Dairy" },
  { key: 4, value: "Canned", label: "Canned foods" },
  { key: 5, value: "Hygiene", label: "Hygiene" },
  { key: 6, value: "Frozen", label: "Frozen Foods" },
  { key: 7, value: "Vegetable", label: "Vegetables" },
  { key: 8, value: "Fruit", label: "Fruits" },
  { key: 9, value: "Condiment", label: "Condiments" },
  { key: 10, value: "Meat", label: "Meat" },
  { key: 11, value: "Other", label: "Other" },
];

const AddModalForm: React.FC<IProps> = ({ open, setOpen, isUpdate }) => {
  const dispatch = useDispatch();
  const addProductSuccess = useAddProductSuccess();
  const [fileValue, setFileValue] = useState<File[]>();
  const [fileError, setFileError] = useState<string>("");

  const [disable, setDisable] = useState<boolean>(false);
  const [imgUrl, setImgUrl] = useState<string[]>([]);
  const [image, setImage] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [uploadDisable, setUploadDisable] = useState<boolean>(false)

  const product = useProduct()

  const imageDB = getStorage(app);

  const [selectOption, setSelectOption] = useState<ISelectOption>({
    label: "Other",
    value: "Other",
  });

  const [imagePreview, setImagePreview] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    if (fileValue && fileValue.length > 0) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(fileValue[0]);
    } else {
      setImagePreview(undefined);
    }
  }, [fileValue]);

  const removeFile = () => {
    setImagePreview(undefined);
    setUploadDisable(false)
    setMessage("")
  };

  const initialValues = {
    name: isUpdate ? product.name : "",
    category: isUpdate ? product.category : "",
    description: isUpdate ? product.description : "",
    stocksLeft: isUpdate ? product.stocksLeft : 0,
    cost: isUpdate ? product.cost : 0,
    price: isUpdate ? product.price : 0,
    stocks128gbStorage: isUpdate ? product.stocks128gbStorage :0,
    stocks256gbStorage: isUpdate ? product.stocks256gbStorage :0,
    stocks1tbStorage: isUpdate ? product.stocks1tbStorage :0,
    smallStocks: isUpdate ? product.smallStocks :0,
    mediumStocks: isUpdate ? product.mediumStocks : 0,
    largeStocks: isUpdate ? product.largeStocks :0,
    files: isUpdate ? product.files : undefined,
  };

  const handleUpload = async () => {
    try {
      setDisable(true);
      if (fileValue !== null) {
        const imgRef = ref(imageDB, `files/${uuidv4()}`);
        const uploadTaskSnapshot = await uploadBytes(imgRef, fileValue![0]);
        const url = await getDownloadURL(uploadTaskSnapshot.ref);

        setImgUrl((data) => [...data, url]);
        setImage(url); // Update the image state with the latest URL
        setDisable(false);

        setMessage("Upload Successfully!")
        setUploadDisable(true)
        return url; // Return the URL
      }

      return null; // Return null if fileValue is null
    } catch (error) {
      console.error("Error uploading image:", error);
      setFileError("Error Uploading Image")
      setDisable(false);
      throw error; // Re-throw the error
    }
  };

  const handleSubmit = async (values: FormikValues) => {
    console.log(values);
    console.log('image', image)
    try {
      if(isUpdate) {
        const updateFields = {
          name: values.name,
          category: selectOption?.value,
          description: values.description,
          stocksLeft: values.stocksLeft,
          cost: values.cost,
          price: values.price,
          smallStocks: values.smallStocks,
          mediumStocks: values.mediumStocks,
          largeStocks: values.largeStocks,
          stocks128gbStorage: values.stocks128gbStorage,
          stocks256gbStorage: values.stocks256gbStorage,
          stocks1tbStorage: values.stocks1tbStorage,
          files: image === "" ? product.files : image,
        }
        dispatch(updateProductRequest({
          key: product.key,
          updatedFields: updateFields
        }))
      } else {
        if (image) {
          dispatch(
            addProductRequest({
              name: values.name,
              category: selectOption?.value,
              description: values.description,
              stocksLeft: values.stocksLeft,
              cost: values.cost,
              price: values.price,
              smallStocks: values.smallStocks,
              mediumStocks: values.mediumStocks,
              largeStocks: values.largeStocks,
              stocks128gbStorage: values.stocks128gbStorage,
              stocks256gbStorage: values.stocks256gbStorage,
              stocks1tbStorage: values.stocks1tbStorage,
              files: image,
            })
          );
        }
  
      }
      
      if (addProductSuccess) {
        setOpen(false);
      }
    } catch (error) {
      console.error("Error handling form submission:", error);
      // Handle the error as needed
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/png": [".png"],
      "image/jpeg": [],
    },
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024,
    onDrop: (acceptedFiles, fileRejections) => {
      if (fileRejections.length === 0) {
        console.log("accepted files", acceptedFiles);
        setFileValue(acceptedFiles);
      } else {
        // Handle rejected files (e.g., display an error message)
        console.error("File rejected:", fileRejections[0].file);
        setFileError("The image size must be below 5mb.");
        setDisable(true)
      }
    },
  });

  const validationSchema = () => {
    return Yup.object().shape({
      name: Yup.string().required("This field is required!"),
      description: Yup.string().required("This field is required!"),
      stocksLeft: Yup.number()
        .min(0, "Stocks left must be a non-negative number")
        .required("Stocks left is required"),
      price: Yup.number()
        .min(0, "Price must be a non-negative number")
        .required("Price left is required"),
      cost: Yup.number()
        .min(0, "Cost must be a non-negative number")
        .required("Cost left is required"),
      // category: Yup.string().required("This field is required!"),
      smallStocks: Yup.number().min(0, "Stocks must be a non-negative number"),
      mediumStocks: Yup.number().min(0, "Stocks must be a non-negative number"),
      largeStocks: Yup.number().min(0, "Stocks must be a non-negative number"),
    });
  };

  return (
    <>
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel
                className={
                  "relative transform overflow-hidden rounded-lg bg-white pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl"
                }
              >
                <Formik
                  initialValues={initialValues}
                  onSubmit={handleSubmit}
                  validationSchema={validationSchema}
                >
                  {({ errors, touched, isValid, values, setFieldValue }) => (
                    <Form>
                      <div className="absolute top-0 right-0 hidden pt-4 pr-4 sm:block">
                        <button
                          type="button"
                          className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-100 focus:ring-offset-2"
                          onClick={() => setOpen(false)}
                        >
                          <span className="sr-only">Close</span>
                          <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                      <div className="sm:flex sm:items-start px-4 pt-2">
                        <div className="w-full mt-3 text-center sm:mt-0 sm:mx-4 sm:text-left">
                          <Dialog.Title
                            as="h3"
                            className="text-2xl font-medium leading-6 text-gray-900"
                          >
                            Add Product
                          </Dialog.Title>
                          <div className="mt-10 mb-4 w-full">
                            <div>
                              <label
                                htmlFor="name"
                                className="block text-lg font-medium text-black"
                              >
                                Product Name
                              </label>
                              <div className="mt-1 w-full">
                                <Field
                                  type="text"
                                  name="name"
                                  id="name"
                                  className="block w-full h-10 rounded-md border-gray-300 shadow-sm focus:border-emerald-900 focus:ring-emerald-900 sm:text-lg"
                                  placeholder="Name..."
                                />
                                <ErrorMessage
                                  name="name"
                                  component="div"
                                  className="mt-1 block text-sm font-bold text-red-500"
                                />
                              </div>
                            </div>

                            <div className="mb-4">
                              <label
                                htmlFor="category"
                                className="block text-lg font-medium text-gray-700 mt-5"
                              >
                                Category
                              </label>
                              <div className="mt-1">
                                <SelectOption
                                  defaultValue="Others"
                                  selectOption={selectOption}
                                  setSelectOption={setSelectOption}
                                  onChange={(selectedOption) =>
                                    setFieldValue(
                                      "category",
                                      selectedOption?.value
                                    )
                                  }
                                  options={FilterOptions}
                                />
                                <ErrorMessage
                                  name="category"
                                  component="div"
                                  className="mt-1 block text-sm font-bold text-red-500"
                                />
                              </div>
                            </div>

                            <div className="mb-4">
                              <label
                                htmlFor="description"
                                className="block text-lg font-medium text-gray-700 mt-5"
                              >
                                Short Description
                              </label>
                              <div className="mt-1">
                                <Field
                                  as="textarea"
                                  type="text"
                                  name="description"
                                  id="description"
                                  className="block w-full rounded-md min-h-10 border-gray-300 shadow-sm focus:border-emerald-900 focus:ring-emerald-900 sm:text-lg"
                                  placeholder="Enter description..."
                                />
                                <ErrorMessage
                                  name="description"
                                  component="div"
                                  className="mt-1 block text-sm font-bold text-red-500"
                                />
                              </div>
                            </div>

                            <div className="mb-4">
                              <label
                                htmlFor="stocksLeft"
                                className="block text-lg font-medium text-black"
                              >
                                Total Stocks Left
                              </label>
                              <div className="mb-4 w-full">
                                <Field
                                  type="number"
                                  name="stocksLeft"
                                  id="stocksLeft"
                                  className="block pl-3 w-full h-10 rounded-md border-gray-300 shadow-sm focus:border-emerald-900 focus:ring-emerald-900 sm:text-lg"
                                  placeholder="Enter the total stocks left..."
                                />
                                <ErrorMessage
                                  name="stocksLeft"
                                  component="div"
                                  className="mt-1 block text-sm font-bold text-red-500"
                                />
                              </div>
                            </div>

                            <div className="flex">
                              <div className="mb-4 mr-4">
                                <label
                                  htmlFor={selectOption?.value === "Gadget" ? "stocks128gbStorage" : "smallStocks"}
                                  className="block text-lg font-medium text-black"
                                >
                                  {selectOption?.value === "Gadget" ? "Stocks of 128GB Storage" : "Small Size Stocks"}
                                </label>
                                <div className="mt-1 w-full relative">
                                  <Field
                                    type="number"
                                    name={selectOption?.value === "Gadget" ? "stocks128gbStorage" : "smallStocks"}
                                    id={selectOption?.value === "Gadget" ? "stocks128gbStorage" : "smallStocks"}
                                    className="block pl-3 w-full h-10 rounded-md border-gray-300 shadow-sm focus:border-emerald-900 focus:ring-emerald-900 sm:text-lg"
                                    placeholder="Enter the stocks amount..."
                                  />
                                  <ErrorMessage
                                    name={selectOption?.value === "Gadget" ? "stocks128gbStorage" : "smallStocks"}
                                    component="div"
                                    className="mt-1 block text-sm font-bold text-red-500"
                                  />
                                </div>
                              </div>

                              <div className="mb-4 mr-4">
                                <label
                                  htmlFor={selectOption?.value === "Gadget" ? "stocks256gbStorage" : "mediumStocks"}
                                  className="block text-lg font-medium text-black"
                                >
                                  {selectOption?.value === "Gadget" ? "Stocks of 256GB Storage" : "Medium Size Stocks"}
                                </label>
                                <div className="mt-1 w-full relative">
                                  <Field
                                    type="number"
                                    name={selectOption?.value === "Gadget" ? "stocks256gbStorage" : "mediumStocks"}
                                    id={selectOption?.value === "Gadget" ? "stocks256gbStorage" : "mediumStocks"}
                                    className="block pl-3 w-full h-10 rounded-md border-gray-300 shadow-sm focus:border-emerald-900 focus:ring-emerald-900 sm:text-lg"
                                    placeholder="Enter the stocks amount..."
                                  />
                                  <ErrorMessage
                                    name={selectOption?.value === "Gadget" ? "stocks256gbStorage" : "mediumStocks"}
                                    component="div"
                                    className="mt-1 block text-sm font-bold text-red-500"
                                  />
                                </div>
                              </div>

                              <div className="mb-4">
                                <label
                                  htmlFor={selectOption?.value === "Gadget" ? "stocks1tbStorage" : "largeStocks"}
                                  className="block text-lg font-medium text-black"
                                >
                                  {selectOption?.value === "Gadget" ? "Stocks of 1TB Storage" : "Large Size Stocks"}
                                  
                                </label>
                                <div className="mt-1 w-full relative">
                                  <Field
                                    type="number"
                                    name={selectOption?.value === "Gadget" ? "stocks1tbStorage" : "largeStocks"}
                                    id={selectOption?.value === "Gadget" ? "stocks1tbStorage" : "largeStocks"}
                                    className="block w-full pl-3 h-10 rounded-md border-gray-300 shadow-sm focus:border-emerald-900 focus:ring-emerald-900 sm:text-lg"
                                    placeholder="Enter the stocks amount..."
                                  />
                                  <ErrorMessage
                                    name={selectOption?.value === "Gadget" ? "stocks1tbStorage" : "largeStocks"}
                                    component="div"
                                    className="mt-1 block text-sm font-bold text-red-500"
                                  />
                                </div>
                              </div>
                            </div>

                            <div className="mb-4">
                              <label
                                htmlFor="cost"
                                className="block text-lg font-medium text-black"
                              >
                                Cost
                              </label>
                              <div className="mt-1 w-full relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-emerald-900">
                                  ₱
                                </span>
                                <Field
                                  type="number"
                                  name="cost"
                                  id="cost"
                                  className="pl-8 block w-full h-10 rounded-md border-gray-300 shadow-sm focus:border-emerald-900 focus:ring-emerald-900 sm:text-lg"
                                  placeholder="Enter the price amount..."
                                />
                                <ErrorMessage
                                  name="cost"
                                  component="div"
                                  className="mt-1 block text-sm font-bold text-red-500"
                                />
                              </div>
                            </div>

                            <div className="mb-4">
                              <label
                                htmlFor="price"
                                className="block text-lg font-medium text-black"
                              >
                                Price
                              </label>
                              <div className="mt-1 w-full relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-emerald-900">
                                  ₱
                                </span>
                                <Field
                                  type="number"
                                  name="price"
                                  id="price"
                                  className="pl-8 block w-full h-10 rounded-md border-gray-300 shadow-sm focus:border-emerald-900 focus:ring-emerald-900 sm:text-lg"
                                  placeholder="Enter the price amount..."
                                />
                                <ErrorMessage
                                  name="price"
                                  component="div"
                                  className="mt-1 block text-sm font-bold text-red-500"
                                />
                              </div>
                            </div>

                            <div className="col-span-full">
                              <div>
                                <label
                                  htmlFor="cover-photo"
                                  className="block text-lg mt-5 font-medium leading-6 text-gray-900"
                                >
                                  Product photo
                                </label>
                                {imagePreview !== undefined || isUpdate ? (
                                  <div className="relative">
                                    <div className="mt-5">
                                      <img src={isUpdate ? product.files : imagePreview} alt="Product" />
                                    </div>
                                    <div className="z-10 mt-5 ">
                                      <button
                                      disabled={uploadDisable}
                                        type="button"
                                        onClick={handleUpload}
                                        className="rounded-md bg-white/10 border border-emerald-900 px-3 py-2 text-md font-semibold text-black shadow-sm hover:bg-white/20"
                                      >
                                        Upload
                                      </button>
                                    </div>

                                    <div className="mt-5 text-lg flex ">
                                      {
                                        message !== ''
                                        ? 
                                        <>
                                        <CheckIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                                        {message}
                                        </> 
                                        : ""
                                      }
                                    
                                      </div>

                                    <div className="z-10 absolute top-2 right-3 h-9 w-9">
                                      <XCircleIcon
                                        onClick={removeFile}
                                        className="text-gray-500 "
                                      />
                                    </div>
                                  </div>
                                ) : (
                                  <div
                                    {...getRootProps()}
                                    className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10"
                                  >
                                    <input {...getInputProps()} />
                                    <div className="text-center">
                                      <PhotoIcon
                                        className="mx-auto h-12 w-12 text-gray-300"
                                        aria-hidden="true"
                                      />

                                      <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                        <label
                                          htmlFor="file-upload"
                                          className="relative cursor-pointer rounded-md bg-white font-semibold text-emerald-900 focus-within:outline-none focus-within:ring-2 focus-within:ring-emerald-950 focus-within:ring-offset-2 hover:text-emerald-950"
                                        >
                                          <span>Upload a file</span>
                                        </label>
                                        <p className="pl-1">or drag and drop</p>
                                      </div>
                                      <p className="text-xs leading-5 text-gray-600">
                                        PNG and JPG up to 5MB
                                      </p>
                                    </div>
                                  </div>
                                )}

                                <span className="mt-1 block text-sm font-bold text-red-500">
                                  {fileError}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-10 sm:flex sm:flex-row-reverse pt-6 pb-2 px-6 gap-x-2 border-t">
                        <button
                          type="submit"
                          disabled={disable || fileError.length > 0}
                          className="bg-emerald-900 hover:bg-emerald-950 text-white inline-flex w-full justify-center rounded-md border border-transparent  shadow-sm sm:ml-3 sm:w-auto sm:text-sm px-4 py-2 text-base font-medium"
                        >
                          Save
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
    </>
  );
};

export default AddModalForm;
