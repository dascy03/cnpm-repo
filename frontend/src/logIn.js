import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
//import { useHistory } from "react-router-dom";

const LogIn = () => {
  const navigate = useNavigate();
  //const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      // Thực hiện gửi request đăng nhập tới server
      // Sử dụng fetch hoặc axios, tùy thuộc vào thư viện bạn đang sử dụng
      const response = await fetch("http://localhost:5000/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      console.log(data);

      if (data.success === true) {
        if (data.isSPSO === true) {
          navigate("/homeSPSO");
        } else navigate("/homeUser");
      } else {
        setError(data.message || "Đăng nhập không thành công.");
      }
    } catch (error) {
      console.error("Đã xảy ra lỗi:", error);
      setError("Đã xảy ra lỗi.");
    }
  };

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
        <div class="w-screen flex flex-col items-center">
          <h1 class="font-bold text-3xl mt-6 text-center">Đăng nhập</h1>
          <div class="mt-12 w-1/4">
            <p class="text-xs text-gray-500 font-bold">Tên đăng nhập</p>
            <div class="relative">
              <input
                class="border border-gray-500 bg-white h-12 w-full px-4 pr-4 rounded-3xl text-sm focus:outline-none mt-2"
                type="email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>
          <div class="mt-8 w-1/4">
            <p class="text-xs text-gray-500 font-bold">Mật khẩu</p>
            <div class="relative">
              <input
                class="border border-gray-500 bg-white h-12 w-full px-4 pr-4 rounded-3xl text-sm focus:outline-none mt-2"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div class="mt-8 w-1/4">
            <button
              class="relative bg-[#2991C2] border hover:bg-[#247ea8] active:bg-[#1b5f7e] hover:shadow-md border-gray-500 h-12 w-full px-4 pr-4 rounded-3xl text-sm focus:outline-none mt-2 font-bold text-white"
              onClick={handleLogin}
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
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
      </section>
    </>
  );
};

export default LogIn;
