import React from "react";
import { useNavigate } from "react-router-dom";
import Cookie from "universal-cookie";

const BuyPage = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
      if (window.confirm("Bạn có chắc chắn muốn đăng xuất?")) {
          const cookies = new Cookie();
          // clear token
          localStorage.clear();
          // remove session storage
          sessionStorage.removeItem('token');
          navigate('/');
          cookies.remove("token");
          cookies.remove("isLogged");
      }
    }
    const showHeader = () => {
      return (
          <>  
          {/* header */}
          <section className="App-header"> 
                  <nav class="border-blue-200 text-lg bg-[#C4E4F3] dark:bg-blue-800 dark:border-blue-700">
                      <div class="flex flex-wrap justify-between p-2">
                          <div class="flex items-center space-x-0 rtl:space-x-reverse mx-5 px-4">
                              <button onClick={
                                    () => {
                                        if (sessionStorage.getItem("isSPSO") === "true") {
                                            navigate('/homeSPSO')
                                        }
                                        else {
                                            navigate('/homeUser')
                                        }
                                    }
                                }><img src="/hcmut-logo.png" class="h-24" alt="HCMUT logo" /></button>
                                  <span class="self-center text-[#014464] text-1xl font-semibold whitespace-nowrap dark:text-white">SMART PRINTING SERVICE</span>
                          </div>
                          <div class="flex items-center px-16" id="navbar-solid-bg">
                              <ul class="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
                                  <li className="px-5">
                                      <button onClick={()=>{
                                        if (sessionStorage.getItem("isSPSO") === "true") {
                                          navigate('/homeSPSO');
                                      } else {
                                          navigate('/homeUser');
                                      }
                                      }}>
                                      <img className="rounded-full h-16 " src="/ava-test.jpg" alt="my-ava" />
                                      </button>
                                  </li>
                                  <li className="px-5 pt-3">
                                      <button onClick={() => navigate("/")}>
                                      <img src="/gear-solid.svg" className="h-10" alt="gear-solid" />
                                      </button>
                                  </li>
                                  <li className="px-5 pt-3">
                                      <button onClick={handleLogout}>
                                      <img src="/arrow-right-from-bracket-solid.svg" className="h-10" alt="arrow-right-from-bracket-solid" />
                                      </button>
                                  </li>
                              </ul>
                          </div>
                      </div>
                  </nav>
              </section>
          </>
      );
    }
    const showBody = () => {
        return (
            <section>
              <div class="font-bold text-4xl my-10 text-center">
                        Mua trang in
              </div>

              <div className="grid grid-cols-5 mt-24 gap-4 h-auto bg-white">
                <div className="col-start-2 col-span-2 bg-white p-4">
                    <div class="w-full flex items-center ">
                      <p class="text-xl text-[#114A65] w-64 font-semibold">
                        Số lượng trang
                      </p>
                      <div class="relative">
                        <input
                          type="text"
                          class="border border-gray-500 bg-white h-12 w-64 px-4 pr-4 rounded-xl text-lg focus:outline-none mt-2"
                        />
                      </div>
                    </div>

                    <div class="mt-8 w-full flex items-center ">
                      <p class="text-xl text-[#114A65] w-64 font-semibold">
                        Phương thức thanh toán
                      </p>
                      <div class="relative" >
                        <select class="border border-gray-500 bg-white h-12 w-64 px-4 pr-4 rounded-xl text-lg focus:outline-none mt-2">
                          <option>BKPay</option>
                          <option>Momo</option>
                          <option>Thẻ tín dụng</option>
                        </select>
                      </div>
                    </div>
                </div>
              <div>
                <div className="col-span-1 mt-5 bg-[#C4E4F3] h-44 rounded-md">
                  <h1 class="font-bold text-2xl pt-4 text-center">
                    HÓA ĐƠN
                  </h1>
                  <div class="grid grid-cols-3 mt-8">
                    <p class="col-span-1 text-base  ml-6">
                      Đơn giá
                    </p>
                    <p class="text-sm col-span-2 text-right mr-6">
                      1.000 đồng / trang  
                    </p>
                  </div>
                  <div class="grid grid-cols-3 mt-3">
                    <p class="col-span-1 text-xl  font-bold ml-6">
                      Tổng
                    </p>
                    <p class=" col-span-2 text-lg text-right font-bold mr-6">
                      400.000 đồng
                    </p>
                  </div>
                  <div className="grid grid-cols-2 mt-16">
                    <button class="mr-3 justify-self-end col-span-1 relative bg-[#2991C2] border hover:bg-[#247ea8] active:bg-[#1b5f7e] hover:shadow-md border-gray-500 h-8 w-24 rounded-xl text-sm focus:outline-none font-semibold text-white"
                    
                    >
                      OK
                    </button>
                    <button class="ml-3 justify-self-start col-span-1 relative bg-[#676767] border hover:bg-[#595959] active:bg-[#4d4d4d] hover:shadow-md border-gray-500 h-8 w-24 rounded-xl text-sm focus:outline-none font-semibold text-white"
                    onClick={()=>{
                      if (sessionStorage.getItem("isSPSO") === "true") {
                        navigate('/homeSPSO');
                    } else {
                        navigate('/homeUser');
                    }
                    }}>
                      HỦY 
                    </button>
                  </div> 
                </div>
              </div>
            </div>
            </section>
        );
      }
    return (
        <div>
            {showHeader()}
            {showBody()}
        </div>
    );
};

export default BuyPage;