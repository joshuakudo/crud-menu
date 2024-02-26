import { Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { debounce } from "lodash";
import { SetStateAction, useCallback, useEffect, Fragment } from "react";

interface ToastProps {
  show: boolean
  setShow: React.Dispatch<SetStateAction<boolean>>
  title: string;
  content: string;
  iconObj: {
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
    colorClass: string
  }
}

const Toast: React.FC<ToastProps> = (props) => {
  const { show,
    setShow,
    title,
    content,
    iconObj, } = props;

  const destroy = () => {
    setShow(false)
  }

  const debounceFn = useCallback(debounce(destroy, 3000), [])

  useEffect(() => {
    debounceFn()
  }, [show])

  return (
    <>
      <div
        aria-live="assertive"
        className="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6"
      >
        <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
          {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
          <Transition
            show={show}
            as={Fragment}
            enter="transform ease-out duration-300 transition"
            enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
            enterTo="translate-y-0 opacity-100 sm:translate-x-0"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <iconObj.icon className={`h-6 w-6 ` + iconObj.colorClass} aria-hidden="true" />
                  </div>
                  <div className="ml-3 w-0 flex-1 pt-0.5">
                    <p className="text-sm font-bold text-gray-900">{title}</p>
                    <p className="mt-1 text-xs text-gray-500">
                      {content}
                    </p>
                    <div className="mt-3 flex space-x-7">

                      <button
                        type="button"
                        onClick={() => setShow(false)}
                        className="rounded-md bg-white text-xs font-semibold text-gray-700 hover:text-gray-500 focus:outline-none">
                        Dismiss
                      </button>
                    </div>
                  </div>
                  <div className="ml-4 flex flex-shrink-0">
                    <button
                      type="button"
                      className="inline-flex rounded-md bg-white text-gray-400 hover:text-primary focus:outline-none"
                      onClick={() => setShow(false)}
                    >
                      <span className="sr-only">Close</span>
                      <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </>
  )
}

export default Toast;