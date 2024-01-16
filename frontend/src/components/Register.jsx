import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

import showPasswordIcon from "../assets/password/showPasswordIcon.svg";
import hidePasswordIcon from "../assets/password/hidePasswordIcon.svg";
import { isValidEmail } from "../utils/isValidMail";
import { registerUser } from "../features/userSlice";

export const Register = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const registerBtnHandler = () => {
    if (fullName.trim().length === 0) {
      toast.error("Full Name cannot be empty");
    } else if (email.trim().length === 0) {
      toast.error("Email cannot be empty");
    } else if (!isValidEmail(email)) {
      toast.error("Invalid Email format");
    } else if (password.trim().length === 0) {
      toast.error("Password cannot be empty");
    } else {
      const userData = { fullName, email, password };
      dispatch(registerUser(userData));
    }
  };

  useEffect(() => {
    if (userData) {
      navigate("/dashboard");
    }
  }, [userData]);

  return (
    <>
      <h1 className="text-3xl text-center font-bold mt-10 mb-5">Register</h1>
      <div className="flex flex-col gap-4 bg-neutral-200/50 text-black w-[400px] m-auto p-8 rounded">
        <label>
          <p className="font-semibold">
            Full Name <sup className="text-red-500">*</sup>
          </p>
          <input
            type="text"
            className="border-neutral-200 pl-2 py-1 w-full rounded-md border-2 focus:outline-none focus:border-neutral-400"
            onChange={(e) => setFullName(e.target.value)}
          />
        </label>
        <label>
          <p className="font-semibold">
            Email <sup className="text-red-500">*</sup>
          </p>
          <input
            type="text"
            className="border-neutral-200 pl-2 py-1 w-full rounded-md border-2 focus:outline-none focus:border-neutral-400"
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label className="relative">
          <p className="font-semibold">
            Password <sup className="text-red-500">*</sup>
          </p>
          <input
            type={showPassword ? "text" : "password"}
            className="border-neutral-200 pl-2 py-1 pr-8 w-full rounded-md border-2 focus:outline-none focus:border-neutral-400"
            onChange={(e) => setPassword(e.target.value)}
          />
          <img
            src={showPassword ? hidePasswordIcon : showPasswordIcon}
            onClick={() => setShowPassword(!showPassword)}
            className="w-[18px] absolute top-[32px] right-[10px] opacity-50 hover:cursor-pointer"
            alt="password icon"
          />
        </label>
        <button
          className="bg-orange-400 rounded p-1 font-semibold hover:opacity-90"
          onClick={registerBtnHandler}
        >
          Register
        </button>
        <p className="-mt-2 font-semibold">
          Have an Account?{" "}
          <Link to="/login" className="underline text-blue-500">
            Login
          </Link>
        </p>
      </div>
    </>
  );
};
