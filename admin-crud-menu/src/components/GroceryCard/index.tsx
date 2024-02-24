import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import GroceryCardDetails from '../GroceryCardDetails';
import { StarIcon } from '@heroicons/react/24/solid';

const Card = () => {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <div>
      <div className="relative flex w-full max-w-[26rem] flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg">
  <div
    className="relative mx-4 mt-4 overflow-hidden text-white shadow-lg rounded-xl bg-blue-gray-500 bg-clip-border shadow-blue-gray-500/40">
    <img
      src="https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1470&amp;q=80"
      alt="ui/ux review check" />
    <div
      className="absolute inset-0 w-full h-full to-bg-black-10 bg-gradient-to-tr from-transparent via-transparent to-black/60">
    </div>

  </div>
  <div className="p-6">
    <div className="flex items-center justify-between mb-3">
      <h5 className="block font-sans text-xl antialiased font-medium leading-snug tracking-normal text-blue-gray-900">
        Wooden House, Florida
      </h5>
      <p
        className="flex items-center gap-1.5 font-sans text-base font-normal leading-relaxed text-blue-gray-900 antialiased">
     <StarIcon className='text-yellow-600 h-5 w-5'/>
        5.0
      </p>
    </div>
    <p className="block font-sans text-base antialiased font-light leading-relaxed text-gray-700">
      Enter a freshly updated and thoughtfully furnished peaceful home
      surrounded by ancient trees, stone walls, and open meadows.
    </p>

  </div>
  <div className="p-6 pt-3">
    <button
      className="block w-full select-none rounded-lg bg-emerald-900 py-3.5 px-7 text-center align-middle font-sans text-sm font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
      onClick={handleClick}
      type="button">
      View Details
    </button>

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
                {open && <GroceryCardDetails />}
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
  </div>
</div>
</div> 
  )
}

export default Card