import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

import { CheckIcon } from "@heroicons/react/24/outline";
import { FormikValues } from "formik";
import { PhotoIcon } from "@heroicons/react/24/solid";

interface IProps {
  onClose: () => void;
  callback: (() => void) | ((values: FormikValues) => void);
  open: boolean;
  buttonlabel: string;
}

const ModalForm: React.FC<IProps> = ({
  callback,
  open,
  buttonlabel,
  onClose,
}) => {
  const [isClosing, setIsClosing] = useState<boolean>(false);

  const handleTransitionEnd = () => {
    if (isClosing) {
      onClose();
    }
  };

  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10 "
          onClose={setIsClosing}
          onTransitionEnd={handleTransitionEnd}
        >
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
                  <div className="space-y-10 divide-y divide-gray-900/10">
                    <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-3">
                      <form className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
                        <div className="px-4 py-6 sm:p-8">
                          <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-4">
                              <label
                                htmlFor="website"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                Website
                              </label>
                              <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                  <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
                                    http://
                                  </span>
                                  <input
                                    type="text"
                                    name="website"
                                    id="website"
                                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    placeholder="www.example.com"
                                  />
                                </div>
                              </div>
                            </div>

                            <div className="col-span-full">
                              <label
                                htmlFor="about"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                About
                              </label>
                              <div className="mt-2">
                                <textarea
                                  id="about"
                                  name="about"
                                  rows={3}
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  defaultValue={""}
                                />
                              </div>
                              <p className="mt-3 text-sm leading-6 text-gray-600">
                                Write a few sentences about yourself.
                              </p>
                            </div>

                            <div className="col-span-full">
                              <label
                                htmlFor="cover-photo"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                Cover photo
                              </label>
                              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                <div className="text-center">
                                  <PhotoIcon
                                    className="mx-auto h-12 w-12 text-gray-300"
                                    aria-hidden="true"
                                  />
                                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                    <label
                                      htmlFor="file-upload"
                                      className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                    >
                                      <span>Upload a file</span>
                                      <input
                                        id="file-upload"
                                        name="file-upload"
                                        type="file"
                                        className="sr-only"
                                      />
                                    </label>
                                    <p className="pl-1">or drag and drop</p>
                                  </div>
                                  <p className="text-xs leading-5 text-gray-600">
                                    PNG, JPG, GIF up to 10MB
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
                          <button
                            type="button"
                            className="text-sm font-semibold leading-6 text-gray-900"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                          >
                            Save
                          </button>
                        </div>
                      </form>
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
  );
};

export default ModalForm;
