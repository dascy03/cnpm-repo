import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import '../css/style.css';
import Cookie from "universal-cookie";
import axios from "axios";


const SettingUser = (props) => {
    const cookies = new Cookie();   
    const navigate = useNavigate();

    const [refresh, setRefresh] = useState(false);
    const [old, setOldData] = useState({
        DoB: new Date(),
    });
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        (async () => {
            const res = await axios.post("http://localhost:5000/user/info",{token: cookies.get("token")})
            .then((res) => {
                console.log(res.data["data"]);
                setOldData(res.data["data"]);
                setLoading(true);
            })
            .catch((err) => {
                if (err.response.data["message"] == "User not found")
                    alert("Không tìm được User");
                else if (err.response.data["message"] == "Internal Server Error")
                    alert("Lỗi máy chủ");
            });
        })()
    }, [refresh]);

    const handleSubmit = (e) => {
    
    }
    

    const handleLogout = () => {
        if (window.confirm("Bạn có chắc chắn muốn đăng xuất?")) {
            const cookies = new Cookie();
            sessionStorage.clear();
            localStorage.clear();
            cookies.remove("token");
            cookies.remove("isLogged");
            navigate('/');
        }
    }

    return (
        <>
            {/* header */}
            <section className="App-header">
                <nav class="border-blue-200 text-lg bg-[#C4E4F3] ">
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
                            <span class="self-center text-[#014464] text-1xl font-semibold whitespace-nowrap ">SMART PRINTING SERVICE</span>
                        </div>
                        <div class="flex items-center px-16" id="navbar-solid-bg">
                            <ul class="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
                                <li className="px-5">
                                    <button onClick={() => navigate('/homeUser')}>
                                        <img className="rounded-full h-16 " src={old.avtLink} alt="my-ava" />
                                    </button>
                                </li>
                                <li className="px-5 pt-3">
                                    <button onClick={() => navigate('/SettingUser')}>
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
            {/* Body */}
            <div className="justify-center flex text-3xl font-bold m-12">Thông tin cá nhân</div>
            <section className="">
                <div className="flex justify-center">
                    <form  className="flex justify-center">
                        <div className="grid grid-cols-2">
                            <div className="mx-5 my-2 text-xl text-[#114A65] font-semibold py-2">Phương thức thanh toán</div>
                            <div className="mx-5 my-2 text-xl flex">
                                <div className="w-full py-2">BK Pay</div>
                                <button className="w-2/3 bg-[#706E6E] text-center rounded-3xl text-white py-2 text-lg font-medium">Thiết lập</button>
                            </div>
                            <div></div>
                            <div className="mx-5 my-2 text-xl flex">
                                <div className="w-full py-2">Momo</div>    
                                <button className="w-2/3 bg-[#706E6E] text-center rounded-3xl text-white py-2 text-lg font-medium">Thiết lập</button>
                            </div>
                            <div></div>
                            <div className="mx-5 my-2 text-xl flex">
                                <div className="w-full py-2">Thẻ tín dụng</div>
                                <button className="w-2/3 bg-[#706E6E] text-center rounded-3xl text-white py-2 text-lg font-medium">Thiết lập</button>
                            </div>
                            <div className="mx-5 my-3 text-xl text-[#114A65] font-semibold">Mail xác thực tài khoản</div>
                            <div className="mx-5 my-2 text-xl"><input type="text" className="px-2 py-1 border border-gray-700 rounded-md w-64" value={old.email}/></div>
                        </div>
                    </form>
                </div>
            </section >
            <div className="justify-center flex my-14">
                    <button  className="bg-[#2991C2] text-white border-black mx-10 px-10 py-2 text-center rounded-2xl font-semibold">LƯU</button>
                    <button onClick={
                    () => {
                        if (sessionStorage.getItem("isSPSO") === "true") {
                            navigate('/homeSPSO')
                        }
                        else {
                            navigate('/homeUser')
                        }
                    }
                    } className="bg-[#676767] text-white border-black mx-10 px-8 py-2 text-center rounded-2xl font-semibold ">TRỞ VỀ</button>
            </div>
        </>
    );
}

export default SettingUser;
