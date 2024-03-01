import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signinRequest, signoutRequest } from "../../redux/product/action";
import { isAuthenticated } from "../../redux/product/selector";
import { useNavigate } from "react-router-dom";
import Modal from "components/Modal";
import ComingSoonImage from "assets/ComingSoon.png";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const auth = useSelector(isAuthenticated);

  const handleSignin = () => {
    dispatch(signinRequest({
      email: email,
      password: password
    }))
  }

  useEffect(() => {
    if (auth){
      navigate('/menu')
    } else {
      dispatch(signoutRequest({ path: '/' }))
    }
  },[auth])

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="main-container" >
      <Modal
        title="Unavailable Right Now"
        message="This feature will be available soon."
        image={ComingSoonImage}
        buttonlabel="Close"
        open={open}
        onClose={handleClose}
        callback={handleClose}
      />
      <section className="bg-gray-50 min-h-screen flex items-center justify-center "style={{ backgroundImage: `url('https://firebasestorage.googleapis.com/v0/b/admin-crud-menu.appspot.com/o/assets%2FBackground.jpg?alt=media&token=59ca41c8-dedc-4260-b628-8ac008acde6e` }}>
        <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
          <div className="md:w-1/2 px-8 md:px-16">
            <h2 className="font-bold text-2xl text-emerald-900">Login</h2>
            <p className="text-xs mt-4 text-emerald-950">
              If you are already a member, easily log in
            </p>

            <div className="flex flex-col gap-4">
              <input
                className="p-2 mt-8 rounded-xl border"
                id="email"
                name="email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
                placeholder="Email"
              />
              <div className="relative">
                <input
                  className="p-2 rounded-xl border w-full"
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                  placeholder="Password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 focus:outline-none"
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-6 w-6" />
                  ) : (
                    <EyeIcon className="h-6 w-6" />
                  )}
                </button>
              </div>
              <button onClick={handleSignin} className="bg-emerald-900 rounded-xl text-white py-2 hover:scale-105 duration-300">
                Login
              </button>
            </div>

            <div className="mt-6 grid grid-cols-3 items-center text-gray-400">
              <hr className="border-gray-400" />
              <p className="text-center text-sm">OR</p>
              <hr className="border-gray-400" />
            </div>

            <button onClick={() => {setOpen(true)}} className="bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300 text-emerald-950">
              <svg
                className="mr-3"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                width="25px"
              >
                <path
                  fill="#FFC107"
                  d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                />
                <path
                  fill="#FF3D00"
                  d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                />
                <path
                  fill="#4CAF50"
                  d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                />
                <path
                  fill="#1976D2"
                  d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                />
              </svg>
              Login with Google
            </button>

            <div className="mt-5 text-xs flex justify-between items-center text-emerald-900">
              <p>Don't have an account?</p>
              <button onClick={() => {navigate('/signup')}} className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300">
                Register
              </button>
            </div>
          </div>

          <div className="md:block hidden w-1/2">
            <img
              alt=""
              className="rounded-2xl"
              src="https://firebasestorage.googleapis.com/v0/b/admin-crud-menu.appspot.com/o/assets%2FFruits.jpg?alt=media&token=cc6948af-f81e-4bd8-ad3e-2f04244cc296"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Signin;
