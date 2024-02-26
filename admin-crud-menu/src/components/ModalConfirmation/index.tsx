import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { FormikValues } from "formik";

interface IProps {
  title: string
  message: string
  image: string
  onClose: () => void;
  callback: (() => void) | ((values: FormikValues) => void)
  open: boolean
  buttonlabel: string
}

const ModalConfirmation: React.FC<IProps> = ({ title, message, image, callback, open, buttonlabel, onClose }) => {
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
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                  <div>
                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
                    <ExclamationTriangleIcon className="text-red-500 h-8 w-8" />
                    </div>
                    <div className="mt-3 text-center sm:mt-5">
                      <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                        {title}
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          {message}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-6 space-y-2">
                    <button
                      type="button"
                      className={`inline-flex w-full justify-center rounded-md border border-transparent bg-red-500 px-4 py-2 text-base font-medium text-white shadow-sm  sm:text-sm`}
                      onClick={callback}
                    >
                      {buttonlabel}
                    </button>

                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md border border-transparent bg-white px-4 py-2 text-base font-medium shadow-sm hover:bg-gray-50 focus:outline-none sm:text-sm"
                      onClick={onClose}
                    >
                      Cancel
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

export default ModalConfirmation;