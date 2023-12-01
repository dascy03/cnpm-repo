import React from "react";
import { useNavigate } from "react-router-dom";

const GenaralSetting = () => {
    const navigate = useNavigate();
    return (
        <>  
        {/* header */}
        <section className="App-header"> 
                <nav class="border-blue-200 text-lg bg-[#C4E4F3] dark:bg-blue-800 dark:border-blue-700">
                    <div class="flex flex-wrap justify-between p-2">
                        <div class="flex items-center space-x-0 rtl:space-x-reverse mx-5 px-4">
                                <img src="/hcmut-logo.png" class="h-24" alt="HCMUT logo" />
                                <span class="self-center text-[#014464] text-1xl font-semibold whitespace-nowrap dark:text-white">SMART PRINTING SERVICE</span>
                        </div>
                        <div class="flex items-center px-16" id="navbar-solid-bg">
                            <ul class="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
                                <li className="px-5">
                                    <button onClick={()=>navigate('/homeSPSO')}>
                                    <img className="rounded-full h-16 " src="/ava-test.jpg" alt="my-ava" />
                                    </button>
                                </li>
                                <li className="px-5 pt-3">
                                    <button onClick={()=>navigate('/profileSPSO')}>
                                    <img src="/gear-solid.svg" className="h-10" alt="gear-solid" />
                                    </button>
                                </li>
                                <li className="px-5 pt-3">
                                    <button onClick={()=>navigate('/logIn')}>
                                    <img src="/arrow-right-from-bracket-solid.svg" className="h-10" alt="arrow-right-from-bracket-solid" />
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </section>
        {/* Body */}
        <h1 class="font-bold text-4xl mt-6 text-center">
                Cài đặt chung
        </h1>
        <section className="grid justify-center mt-12 gap-4 h-screen bg-white">
            <div class="flex items-center">
                <p class="text-xl text-[#114A65] w-64 font-semibold">
                  Hạn ngạch trang
                </p>
              <div class="w-2/3  ">
              <input
                type="text"
                class="border border-gray-500 bg-white h-12 w-2/3 px-4 pr-4 rounded-xl text-sm focus:outline-none"
              />
              </div>
            </div>   
            <div class="flex items-center">
                <p class="text-xl text-[#114A65] w-64 font-semibold">
                  Ngày cấp trang
                </p>
                <div class="w-2/3  ">
              <input
                type="text"
                class="border border-gray-500 bg-white h-12 w-2/3 px-4 pr-4 rounded-xl text-sm focus:outline-none "                
              />
              </div>
            </div>   
            <div class="flex items-center">
                <p class="text-xl text-[#114A65] w-64 font-semibold">
                  Kích thước tệp tối đa
                </p>
              <div class="relative  ">
              <input
                type="text"
                class="border border-gray-500 bg-white h-12 w-64 px-4 pr-4 rounded-xl text-sm focus:outline-none"
              />
              </div>
              <p class="text-xl text-blackw-64 font-semibold ml-8">KB</p>
            </div>        
            <div class="flex items-start">
                <p class="text-xl text-[#114A65] w-64 font-semibold">
                  Loại tệp cho phép
                </p>
              <div class="grid grid-cols-3 grid-rows-2 ">
                <div class="flex col-span-1 row-span-1 row-start-1 items-center ">
                  <input type="checkbox" id="myCheckbox" class="form-checkbox h-5 w-5 text-black rounded"/> 
                  <label for="myCheckbox" class="ml-2 text-xl text-black font-semibold">PDF</label>
                </div>
                <div class="flex col-span-1 row-span-1 row-start-1 items-center ">
                  <input type="checkbox" id="myCheckbox" class="form-checkbox h-5 w-5 text-black rounded"/> 
                  <label for="myCheckbox" class="ml-2 text-xl text-black font-semibold">Image</label>
                </div>  
                <div class="flex col-span-1 row-span-1 row-start-1 items-center ">
                  <input type="checkbox" id="myCheckbox" class="form-checkbox h-5 w-5 text-black rounded"/> 
                  <label for="myCheckbox" class="ml-2 text-xl text-black font-semibold">Excel</label>
                </div> 
                <div class="flex col-span-1 row-span-1 items-center row-start-2 mt-4 ">
                  <input type="checkbox" id="myCheckbox" class="form-checkbox h-5 w-5 text-black rounded"/> 
                  <label for="myCheckbox" class="ml-2 text-xl text-black font-semibold">Word</label>
                </div> 
                <div class="flex col-span-1 row-span-1 items-center row-start-2 mt-4">
                  <input type="checkbox" id="myCheckbox" class="form-checkbox h-5 w-5 text-black rounded"/> 
                  <label for="myCheckbox" class="ml-2 text-xl text-black font-semibold">HTML</label>
                </div> 
                <div class="flex col-span-1 row-span-1 items-center row-start-2 mt-4  w-40">
                  <input type="checkbox" id="myCheckbox" class="form-checkbox h-5 w-5 text-black rounded"/> 
                  <label for="myCheckbox" class="ml-2 text-xl text-black font-semibold">Powerpoint</label>
                </div> 
              </div>
            </div>  
            <div class="flex items-center">
                <p class="text-xl text-[#114A65] w-64 font-semibold">
                  Số trang in tối đa
                </p>
              <div class="w-2/3  ">
              <input
                type="text"
                class="border border-gray-500 bg-white h-12 w-2/3 px-4 pr-4 rounded-xl text-sm focus:outline-none"
              />
              </div>
            </div>           
            <div class="flex items-center">
                <p class="text-xl text-[#114A65] w-64 font-semibold">
                  Khổ giấy cho phép
                </p>
              <div class="grid grid-cols-4 ">
                <div class="flex col-span-1  items-center ">
                  <input type="checkbox" id="myCheckbox" class="form-checkbox h-5 w-5 text-black rounded"/> 
                  <label for="myCheckbox" class="ml-2 text-xl text-black font-semibold">A5</label>
                </div>
                <div class="flex col-span-1 items-center ">
                  <input type="checkbox" id="myCheckbox" class="form-checkbox h-5 w-5 text-black rounded"/> 
                  <label for="myCheckbox" class="ml-2 text-xl text-black font-semibold">A4</label>
                </div>  
                <div class="flex col-span-1  items-center ">
                  <input type="checkbox" id="myCheckbox" class="form-checkbox h-5 w-5 text-black rounded"/> 
                  <label for="myCheckbox" class="ml-2 text-xl text-black font-semibold">A3</label>
                </div> 
                <div class="flex col-span-1  items-center w-40">
                  <input type="checkbox" id="myCheckbox" class="form-checkbox h-5 w-5 text-black rounded"/> 
                  <label for="myCheckbox" class="ml-2 text-xl text-black font-semibold">A2</label>
                </div> 
              </div>
            </div>  
            <div class="flex items-center">
                <p class="text-xl text-[#114A65] w-64 font-semibold">
                  Mực in
                </p>
              <div class="grid grid-cols-4 ">
                <div class="flex col-span-1  items-center w-40">
                  <input type="checkbox" id="myCheckbox" class="form-checkbox h-5 w-5 text-black rounded"/> 
                  <label for="myCheckbox" class="ml-2 text-xl text-black font-semibold ">Đen</label>
                </div>
                <div class="flex col-span-1 items-center ">
                  <input type="checkbox" id="myCheckbox" class="form-checkbox h-5 w-5 text-black rounded"/> 
                  <label for="myCheckbox" class="ml-2 text-xl text-black font-semibold">Màu</label>
                </div>  
              </div>
            </div>  
            <div class="flex items-center">
                <p class="text-xl text-[#114A65] w-64 font-semibold">
                  Mặt in
                </p>
              <div class="grid grid-cols-4 ">
                <div class="flex col-span-1  items-center w-40  ">
                  <input type="checkbox" id="myCheckbox" class="form-checkbox h-5 w-5 text-black rounded"/> 
                  <label for="myCheckbox" class="ml-2 text-xl text-black font-semibold ">Một mặt</label>
                </div>
                <div class="flex col-span-1 items-center ">
                  <input type="checkbox" id="myCheckbox" class="form-checkbox h-5 w-5 text-black rounded"/> 
                  <label for="myCheckbox" class="ml-2 text-xl text-black font-semibold">Hai mặt</label>
                </div>  
              </div>
            </div>  
            <div class="flex items-center">
                <p class="text-xl text-[#114A65] w-64 font-semibold">
                  Thanh toán cho phép
                </p>
              <div class="grid grid-cols-4 ">
                <div class="flex col-span-1  items-center w-40">
                  <input type="checkbox" id="myCheckbox" class="form-checkbox h-5 w-5 text-black rounded"/> 
                  <label for="myCheckbox" class="ml-2 text-xl text-black font-semibold ">BKPay</label>
                </div>
                <div class="flex col-span-1 items-center ">
                  <input type="checkbox" id="myCheckbox" class="form-checkbox h-5 w-5 text-black rounded"/> 
                  <label for="myCheckbox" class="ml-2 text-xl text-black font-semibold">Tiền mặt</label>
                </div>  
                <div class="flex col-span-1  items-center">
                  <input type="checkbox" id="myCheckbox" class="form-checkbox h-5 w-5 text-black rounded"/> 
                  <label for="myCheckbox" class="ml-2 text-xl text-black font-semibold ">Thẻ tín dụng</label>
                </div>
                <div class="flex col-span-1 items-center">
                  <input type="checkbox" id="myCheckbox" class="form-checkbox h-5 w-5 text-black rounded"/> 
                  <label for="myCheckbox" class="ml-2 text-xl text-black font-semibold">Momo</label>
                </div>  
              </div>
            </div>
            <div class="flex items-center">
                <p class="text-xl text-[#114A65] w-64 font-semibold">
                  Số trang mua tối đa
                </p>
              <div class="w-2/3  ">
              <input
                type="text"
                class="border border-gray-500 bg-white h-12 w-2/3 px-4 pr-4 rounded-xl text-sm focus:outline-none"
              />
              </div>
            </div>   
        </section>
  
  
  
        </>
    );
  }
  
  export default GenaralSetting;