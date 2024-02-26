import React, { useEffect, useState } from "react";
import Card from "../../../../components/GroceryCard";
import AddModalForm from "../../../../components/Form";
import { useProducts } from "hooks/product";
import { useDispatch } from "react-redux";
import { getProductRequest } from "../../../../redux/product/action";

const Body = () => {
  const [open, setOpen] = useState<boolean>(false)
  const product = useProducts()
  const dispatch = useDispatch()

  const handleClose = () => {
    setOpen(false)
  }

  const getProducts = () => {
    dispatch(getProductRequest())
  }

  useEffect(() => {
    getProducts()
  },[])

  console.log('product', product)

  return (
    <>
      <AddModalForm
        open={open}
        setOpen={setOpen}
      />
      <div className="relative m-8 rounded-lg bg-white pt-5 pb-12 shadow sm:px-6 sm:pt-6">
        <div className="flex absolute right-20">
          <button
            onClick={() => {setOpen(true)}}
            className="ml-10 w-48 bg-emerald-900 hover:bg-emerald-950 text-white border-transparent cursor-pointer py-3 h-14 mt-1 px-10 border rounded-md shadow-sm disabled:opacity-40 text-lg"
          >
            <span className="text-custom-white-900">Add</span>
          </button>
        </div>
        <div className="mt-20">

          <Card item={product!}/>
        </div>
      </div>
    </>
  );
};

export default Body;
