"use client";

import Link from "next/link";
import Image from "next/image";
import logo2 from "../../../public/ic_logo_2.svg";
import { useState } from "react";
import { register } from "@/services/authServices";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import iconEye from "@/public/ic_eye.svg";
import iconHidden from "@/public/ic_hidden.svg";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [visibleIcon1, setVisibleIcon1] = useState(iconEye);
  const [visibleIcon2, setVisibleIcon2] = useState(iconEye);

  const handleRegisterButtonClick = async (event) => {
    event.preventDefault();
    if (repassword != password) {
      toast.error("Mật khẩu không trùng khớp");
    } else {
      const res = await register(username, name, email, password);
      console.log(res);
      if (res == "User register successfully!")
        toast.success("Đăng ký tài khoản thành công");
      else {
        if (res.email) toast.error(res.email);
        if (res.name) toast.error(res.name);
        if (res.username) toast.error(res.username);
        if (res.password) toast.error(res.password);
        if (res.message) toast.error(res.message);
      }
    }
  };

  return (
    <>
      <div className="bg-blue-100 flex flex-row items-center justify-evenly w-full">
        {/* Logo */}
        <Image
          src={logo2}
          alt="Laven Logo"
          priority={true}
          className="h-auto w-[600px]"
        ></Image>

        {/* Form */}
        <div className="bg-white p-[32px] rounded-lg w-[480px]">
          <div className="text-xl">Đăng ký</div>

          <form onSubmit={handleRegisterButtonClick}>
            <input
              placeholder="Họ và tên (*)"
              className="w-full text-[14px] focus:outline-none focus:border-primary focus:border-2 py-[10px] px-[20px] rounded border-2 border-gray-300 mt-[24px]"
              onChange={(e) => {
                setName(e.target.value);
              }}
            ></input>

            <input
              placeholder="Email (*)"
              className="w-full text-[14px] focus:outline-none focus:border-primary focus:border-2 py-[10px] px-[20px] rounded border-2 border-gray-300 mt-[20px]"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            ></input>

            <input
              placeholder="Tên đăng nhập (*)"
              className="w-full text-[14px] focus:outline-none focus:border-primary focus:border-2 py-[10px] px-[20px] rounded border-2 border-gray-300 mt-[20px]"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            ></input>

            <div className="relative flex flex-row items-center mt-[20px]">
              <input
                id="pass"
                placeholder="Mật khẩu (*)"
                type={visibleIcon1 == iconEye ? "password" : "text"}
                className="w-full text-[14px] focus:outline-none focus:border-primary focus:border-2 py-[10px] px-[20px] rounded border-2 border-gray-300"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              ></input>
              <Image
                alt="Show/Hidden pass button"
                className="hover:cursor-pointer absolute right-[16px]"
                src={visibleIcon1}
                width={20}
                onClick={() => {
                  if (visibleIcon1 == iconEye) setVisibleIcon1(iconHidden);
                  else setVisibleIcon1(iconEye);
                }}
              />
            </div>

            <div className="relative flex flex-row items-center mt-[20px]">
              <input
                id="repass"
                placeholder="Nhập lại mật khẩu (*)"
                type={visibleIcon2 == iconEye ? "password" : "text"}
                className="w-full text-[14px] focus:outline-none focus:border-primary focus:border-2 py-[10px] px-[20px] rounded border-2 border-gray-300"
                onChange={(e) => {
                  setRepassword(e.target.value);
                }}
              ></input>
              <Image
                alt="Show/Hidden pass button"
                className="hover:cursor-pointer absolute right-[16px]"
                src={visibleIcon2}
                width={20}
                onClick={() => {
                  if (visibleIcon2 == iconEye) setVisibleIcon2(iconHidden);
                  else setVisibleIcon2(iconEye);
                }}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-white mt-[32px] rounded py-[12px] hover:bg-blue-400"
              onClick={handleRegisterButtonClick}
            >
              ĐĂNG KÝ
            </button>
          </form>

          <div className="flex flex-row justify-center items-center mt-[32px] text-[14px] text-gray-500">
            <div>Bạn đã có tài khoản?</div>
            <Link href={"/login"}>
              <div className="ml-[6px] text-primary hover:decoration-solid hover:underline">
                Đăng nhập
              </div>
            </Link>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};
export default RegisterPage;