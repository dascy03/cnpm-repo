import React from "react";
import { useNavigate } from "react-router-dom";

const Home = (props) => {
    const {loggedIn, email} = props;
    const navigate = useNavigate();


    return (
        <>  
        {/* header */}
            <section className="App-header"> 
                <nav class="border-blue-200 bg-blue-50 dark:bg-blue-800 dark:border-blue-700">
                    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                        <a href="#" class="flex items-center space-x-3 rtl:space-x-reverse">
                            <img src="/hcmut-logo.png" class="h-8" alt="HCMUT logo" />
                            <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">SMART PRINTING SERVICE</span>
                        </a>
                    <div class="hidden w-full md:block md:w-auto" id="navbar-solid-bg">
                        <ul class="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
                            <li>
                            <a href="#" class="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"> <img src="/hcmut-logo.png" class="h-8" alt="HCMUT logo" /></a>
                            </li>
                            <li>
                            <a href="#" class="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"> <img src="/hcmut-logo.png" class="h-8" alt="HCMUT logo" /></a>
                            </li>
                            <li>
                            <a href="#" class="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"> <img src="/hcmut-logo.png" class="h-8" alt="HCMUT logo" /></a>
                            </li>
                        </ul>
                    </div>
                    </div>
                </nav>
            </section>
        {/* Body */}
            <section className="flex place-content-evenly"> 
                <div className="flex-initial w-2/3 m-14">
                    <div className="font-sans text-5xl font-bold ">Chào Student-0, chúc bạn học tốt!</div>
                    <div className="bg-blue-200 font-sans text-2xl font-semibold rounded-3xl pt-5 pb-10 px-5 my-14 w-full">
                        Số trang còn lại: 
                        <div className="font-sans text-6xl font-bold text-center "> 100 </div>   
                    </div>
                    <div className="flex place-content-around w-auto text-center justify-center">
                        <div className="rounded-3xl flex-1 bg-blue-500 w-full mr-5 p-3">
                            <a href="?">
                                <img src="/hcmut-logo.png" className="h-28 mx-auto" alt="HCMUT logo" />
                                <span className ="text-white text-3xl">In tài liệu</span>
                            </a>
                        </div>
                        <div className="rounded-3xl flex-1 bg-blue-500 w-full ml-5 p-3">
                            <a href="?">    
                                <img src="/hcmut-logo.png" className="h-28 mx-auto" alt="HCMUT logo" />
                                <span className="text-white text-3xl">Mua thêm trang</span> 
                            </a>
                        </div>
                    </div>
                </div>

                <div className="flex-initial w-full m-14">
                    <div className="w-full text-2xl font-semibold mb-5"> Tài liệu đã in gần đây </div>
                    <div className="List-recent-update">
                        <ul>
                            <li className="bg-blue-100 p-3">0</li>
                            <li className="p-3">1</li>
                            <li className="bg-blue-100 p-3">2</li>
                            <li className="p-3">3</li>
                            <li className="bg-blue-100 p-3">4</li>
                            <li className="p-3">5</li>
                            <li className="bg-blue-100 p-3">6</li>
                            <li className="p-3">7</li>
                            <li className="bg-blue-100 p-3">8</li>
                        </ul>
                    </div>
                    <div className="History text-right font-semibold m-5"> 
                        <a href="#"> Show full history </a>
                    </div>
                </div>

            </section>
        </>
    );
}

export default Home;