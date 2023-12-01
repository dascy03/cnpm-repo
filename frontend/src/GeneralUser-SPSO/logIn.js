import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LogIn = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: '',
    password: '',   
  })
  const [isloading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [token, setToken] = useState('')
  const [isSPSO, setIsSPSO] = useState(false)

  const handleLogin = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    // check if empty
  };
  

  
  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      username: data.username,
      password: data.password,
    }

    axios.post("http://localhost:5000/user/login", userData)
    .then((res) => {
      setIsLoading(true)
      setSuccess(res.data["success"])
      setToken(res.data["token"])
      setIsSPSO(res.data["isSPSO"])
      sessionStorage.setItem('token', res.data["token"])
      sessionStorage.setItem('isSPSO', res.data["isSPSO"])
    })
    .catch((err) => {
      if (err.response.data['message'] == "Invalid credentials")
        alert("Sai tên tài khoản hoặc mật khẩu")
      else if (err.response.data['message'] == "Username and password are required.")
        alert("Không được dể trống tên tài khoản/mật khẩu")
      else if (err.response.data['message'] == "Internal Server Error")
        alert("Lỗi máy chủ")
    })
  }
  useEffect(() => {
    if (isloading) {
      if (success) {
        if (isSPSO) {
          navigate("/homeSPSO");
        } else {
          navigate("/homeUser");
        }
      } else {
        alert("Đăng nhập thất bại");
      }
    }
    else {
      // make loading screen
      // still doooo
    }
  }, [isloading]);

  return (
    <>
      {/* header */}
      <section className="App-header">
        <nav class="border-blue-200 text-lg bg-[#C4E4F3] bg-c4e4f3">
          <div class="flex flex-wrap justify-between">
            <div class="flex items-center space-x-0 rtl:space-x-reverse px-4">
              <img src="/hcmut-logo.png" class="h-20" alt="HCMUT logo" />
              <span class="self-center text-014464 text-l font-bold whitespace-nowrap">
                SMART PRINTING SERVICE
              </span>
            </div>
          </div>
        </nav>
      </section>
      {/* Body */}
      <section className="flex place-content-evenly justify-center h-screen">
        <form class="w-screen flex flex-col items-center" onSubmit={handleSubmit}>
          <h1 class="font-bold text-3xl mt-6 text-center">Đăng nhập</h1>
          <div class="mt-12 w-1/4">
            <p class="text-base text-gray-500 font-semibold">Tên đăng nhập</p>
            <div class="relative">
              <input
                type="email"
                name = "username"
                class="border border-gray-500 bg-white h-12 w-full px-4 pr-4 rounded-3xl text-sm focus:outline-none mt-2"
                value={data.username}
                onChange={handleLogin}
                autoComplete="on"
              />
            </div>
          </div>
          <div class="mt-8 w-1/4">
            <p class="text-base text-gray-500 font-semibold">Mật khẩu</p>
            <div class="relative">
              <input
                type="password"
                name = "password"
                class="border border-gray-500 bg-white h-12 w-full px-4 pr-4 rounded-3xl text-sm focus:outline-none mt-2"
                value={data.password}
                onChange={handleLogin}
                autoComplete="on"
              />
            </div>
          </div>
          <div class="mt-8 w-1/4">
            <button
              class="relative bg-[#2991C2] border hover:bg-[#247ea8] active:bg-[#1b5f7e] hover:shadow-md border-gray-500 h-12 w-full px-4 pr-4 rounded-3xl text-base focus:outline-none mt-2 font-bold text-white"
              type="submit"
              onSubmit={handleSubmit}
            >
              Đăng nhập
            </button>
          </div>

          <div class="mt-6 w-1/4 flex justify-center">
            <a href="" class="font-bold" onClick={() => navigate("/register")}>
              Đăng ký
            </a>
            <span class="mx-4">|</span>
            <a
              href=""
              class="font-bold"
              onClick={() => navigate("/forgotPassword")}
            >
              Quên mật khẩu?
            </a>
          </div>
        </form>
      </section>
    </>
  );
};

export default LogIn;
