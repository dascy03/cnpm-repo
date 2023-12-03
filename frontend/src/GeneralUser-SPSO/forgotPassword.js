import React from "react";
import { useNavigate } from "react-router-dom";


const ForgotPassword = () => {
  const navigate = useNavigate();
  return (
      <>  
      {/* header */}
                    <section className="App-header"> 
              <nav class="border-blue-200 text-lg bg-[#C4E4F3] ">
                  <div class="flex flex-wrap justify-between p-2">
                      <div class="flex items-center space-x-0 rtl:space-x-reverse mx-5 px-4">
                              <img src="/hcmut-logo.png" class="h-24" alt="HCMUT logo" />
                              <span class="self-center text-[#014464] text-1xl font-semibold whitespace-nowrap ">SMART PRINTING SERVICE</span>
                      </div>
                  </div>
              </nav>
          </section>
      {/* Body */}
      <section className="flex place-content-evenly justify-center h-screen">
        <div class="w-screen flex flex-col items-center">
          <h1 class="font-bold text-4xl mt-6 text-center">
            Đặt lại mật khẩu
          </h1>
          <div class="mt-12 w-1/4">
            <p class="text-base text-gray-500 font-semibold">
              Tên đăng nhập
            </p>
            <div class="relative">
              <input
                type="text"
                class="border border-gray-500 bg-white h-12 w-full px-4 pr-4 rounded-2xl text-sm focus:outline-none mt-2"
              />
            </div>
          </div>
          <div class="mt-8 w-1/4">
            <p class="text-base text-gray-500 font-semibold">
              Mật khẩu mới
            </p>
            <div class="relative">
              <input
                type="text"
                class="border border-gray-500 bg-white h-12 w-full px-4 pr-4 rounded-2xl text-sm focus:outline-none mt-2"
              />
            </div>
          </div>
          <div class="mt-8 w-1/4">
            <p class="text-base text-gray-500 font-semibold">
              Nhập lại mật khẩu
            </p>
            <div class="relative">
              <input
                type="text"
                class="border border-gray-500 bg-white h-12 w-full px-4 pr-4 rounded-2xl text-sm focus:outline-none mt-2"
              />
            </div>
          </div>
          <div class="mt-8 w-1/4">
            <p class="text-base text-gray-500 font-semibold">
              Mail xác thực tài khoản
            </p>
            <div class="relative">
              <input
                type="text"
                class="border border-gray-500 bg-white h-12 w-full px-4 pr-4 rounded-2xl text-sm focus:outline-none mt-2"
              />
            </div>
          </div>
          <div class="mt-8 w-1/4">
            <button class="relative bg-[#2991C2] border hover:bg-[#247ea8] active:bg-[#1b5f7e] hover:shadow-md border-gray-500 h-12 w-full px-4 pr-4 rounded-3xl text-base focus:outline-none mt-2 font-bold text-white"
            onClick={()=>navigate('/')}>
              Đặt lại mật khẩu
            </button>
          </div>
        </div>
      </section>



      </>
  );
}

export default ForgotPassword;
