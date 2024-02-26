import { CheckCircleIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";


interface ToastProps {
  title: string
  message: string,
  linkObj?: {
    to: string,
    linkText: string
  },
  closeToast: () => void | undefined
}

export const SuccessToast: React.FC<ToastProps> = ({ title, message, linkObj, closeToast }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex items-start z-50">
        <div className="flex-shrink-0">
          <CheckCircleIcon className="h-6 w-6 text-green-500" />
        </div>
        <div className="ml-3 w-0 flex-1 pt-0.5">
          <p className="text-sm font-bold text-gray-900">{title}</p>
          <p className="mt-1 text-xs text-gray-500">
            {message}
          </p>
          <div className="mt-3 flex space-x-7">
            {
              linkObj && (
                <button
                  type="button"
                  onClick={() => {
                    navigate(linkObj.to);
                    closeToast()
                  }}
                  className="text-xs text-primary font-semibold">
                  {linkObj.linkText}
                </button>
              )
            }
            <button
              type="button"
              onClick={() => {
                closeToast()
              }}
              className="rounded-md bg-white text-xs font-semibold text-gray-700 hover:text-gray-500 focus:outline-none">
              Dismiss
            </button>
          </div>
        </div>
      </div>

    </>
  )
}

export const ErrorToast: React.FC<ToastProps> = ({ title, message, linkObj, closeToast }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <ExclamationTriangleIcon className="h-6 w-6 text-red-500" />
        </div>
        <div className="ml-3 w-0 flex-1 pt-0.5">
          <p className="text-sm font-bold text-gray-900">{title}</p>
          <p className="mt-1 text-xs text-gray-500">
            {message}
          </p>
          <div className="mt-3 flex space-x-7">
            {
              linkObj && (
                <button
                  type="button"
                  onClick={() => {
                    navigate(linkObj.to);
                    closeToast()
                  }}
                  className="text-xs text-primary font-semibold">
                  {linkObj.linkText}
                </button>
              )
            }
            <button
              type="button"
              onClick={() => {
                closeToast()
              }}
              className="rounded-md bg-white text-xs font-semibold text-gray-700 hover:text-gray-500 focus:outline-none">
              Dismiss
            </button>
          </div>
        </div>
      </div>

    </>
  )
}
