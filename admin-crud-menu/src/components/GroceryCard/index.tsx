import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import GroceryCardDetails from "../GroceryCardDetails";
import { StarIcon } from "@heroicons/react/24/solid";
import { Product } from "redux/product/interface";
import { useDispatch } from "react-redux";
import { getProductDetailsRequest } from "../../redux/product/action";

interface IProps {
  item: Product | null;
}

const Card: React.FC<IProps> = ({item}) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch()

  const handleClick = () => {
    dispatch(getProductDetailsRequest(item?.key!))
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div className="relative h-[29rem] flex w-full max-w-[26rem] flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg">
        <div className="relative mx-4 mt-4 overflow-hidden text-white shadow-lg rounded-xl bg-blue-gray-500 bg-clip-border shadow-blue-gray-500/40">
          <img
            src={item?.files}
            alt="ui/ux review check"
            className="w-full h-44 object-center object-contain"
          />
          <div className="absolute inset-0 w-full h-full to-bg-black-10 bg-gradient-to-tr from-transparent via-transparent to-black/60"></div>
        </div>
        <div className="p-6">
          <div className="flex items-center justify-between mb-3">
            <h5 className="block font-sans text-xl antialiased font-medium leading-snug tracking-normal text-blue-gray-900">
              {item?.name}
            </h5>
            <p className="flex items-center gap-1.5 font-sans text-base font-normal leading-relaxed text-blue-gray-900 antialiased">
              <StarIcon className="text-yellow-600 h-5 w-5" />
              5.0
            </p>
          </div>
          <p className="block font-sans text-base antialiased font-light leading-relaxed text-gray-700">
            {item?.description}
          </p>
        </div>
        <div className="p-6 pt-3">
          <div className="flex bottom-5 inset-x-auto">
          <button
            className="block w-full select-none rounded-lg bg-emerald-900 py-3.5 px-10 text-center align-middle font-sans text-sm font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            onClick={handleClick}
            type="button"
          >
            View Details
          </button>
          </div>

          <Transition show={open} as={Fragment}>
            <Dialog
              as="div"
              className="fixed inset-0 z-10 overflow-y-auto"
              onClose={handleClose}
            >
              <div className="flex items-center justify-center min-h-screen">
                <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <div className="bg-white rounded-lg m-10">
                    {/* ... rest of your card content */}
                    {open && <GroceryCardDetails setOpen={setOpen}/>}
                  </div>
                </Transition.Child>
              </div>
            </Dialog>
          </Transition>
        </div>
      </div>
    </div>
  );
};

export default Card;
