import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

import { XMarkIcon } from "@heroicons/react/24/outline";

interface IProps {
  title: string
  subTitle?: string
  message: string
  image: string
  onClose: () => void;
  callback: () => void
  open: boolean;
  buttonlabel: string;
  withCloseBtn?: boolean
}

const Modal: React.FC<IProps> = ({ title, message, image, callback, open, buttonlabel, onClose, withCloseBtn, subTitle }) => {
  const [isClosing, setIsClosing] = useState<boolean>(false);

  const handleTransitionEnd = () => {
    if (isClosing) {
      onClose();
    }
  };

  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10 " onClose={setIsClosing} onTransitionEnd={handleTransitionEnd}>
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
            <div className="flex items-center px-12 min-h-full justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all w-96 sm:my-8 sm:w-full sm:max-w-sm sm:p-6 md:ml-64">
                  <div>
                    {
                      withCloseBtn &&
                      <button className="absolute right-4 focus:outline-none" onClick={() => onClose()}>
                        <XMarkIcon className="h-5 w-5 text-gray-400"></XMarkIcon>
                      </button>
                    }

                    <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full ">
                      <img src={image} className="" alt="" />
                    </div>
                    <div className="mt-3 text-center sm:mt-5">
                      <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                        {title}
                      </Dialog.Title>
                      {
                        subTitle &&

                        <p className="text-sm text-gray-500 mb-2">
                          {subTitle}
                        </p>
                      }
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          {message}
                        </p>


                      </div>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md border border-transparent bg-emerald-900 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-emerald-950 focus:outline-none focus:ring-2 focus:ring-emerald-900 focus:ring-offset-2 sm:text-sm"
                      onClick={callback}
                    >
                      {buttonlabel}
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  )
}

export default Modal;