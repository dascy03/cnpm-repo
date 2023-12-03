import React, {useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import '../css/style.css';
import Cookie from "universal-cookie";
import axios from "axios";
import dateFormat from "dateformat";


const ProfileUser = (props) => {
    const navigate = useNavigate();

    const [refresh, setRefresh] = useState(false);
    const [old, setOldData] = useState({});
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        (async () => {
            const cookies = new Cookie();   
            await axios.post("http://localhost:5000/user/info",{token: cookies.get("token")})
            .then((res) => {
                console.log(res.data["data"]);
                setOldData(res.data["data"]);
                setLoading(true);
            })
            .catch((err) => {
                if (err.response.data["message"] === "User not found")
                    alert("Không tìm được User");
                else if (err.response.data["message"] === "Internal Server Error")
                    alert("Lỗi máy chủ");
            });
        })()
    }, [refresh]);

    const [data, setData] = useState({  
        name: "",
        DoB: "",
        phone: "",
        address: "",
    });

    const handleSubmit = (e) => {
        const cookies = new Cookie();
        console.log(data);
        e.preventDefault();
        const userData = {
            token: cookies.get("token"),
            name: data.name,
            DoB: data.DoB,
            phone: data.phone,
            address: data.address,
        };
        for (let key in userData) {
            if (userData[key] === "") {
                userData[key] = old[key];
            }
        }
        // check phone format 
        const phoneFormat = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
        if (!phoneFormat.test(userData.phone) && (userData.phone.length > 12 || userData.phone.length < 10)) {
            alert("Số điện thoại không hợp lệ");
            return;
        }
        console.log(userData);
        axios.post("http://localhost:5000/user/update", userData)
            .then((res) => {
                console.log(res.data);
                setRefresh(!refresh);
                alert("Cập nhật thông tin thành công");
            }
            )
            .catch((err) => {
                if (err.response.data["message"] === "User not found")
                    alert("Không tìm được User");
                else if (err.response.data["message"] === "Internal Server Error")
                    alert("Lỗi máy chủ");
            });

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
            <section className="grid grid-cols-2">
                <div className="flex justify-center">
                    <div className=" border border-gray-500 w-4/12 rounded-sm">
                        <div className="justify-center flex m-5 ">
                            <img src={old.avtLink} alt="my-ava" className="rounded-full h-52" />
                        </div>
                        <div className="justify-center flex text-2xl font-bold m-2 text-[#114A65]">
                            {loading ? old.name : "Loading..."}
                        </div>
                        <div className="justify-center flex text-2xl m-2 ">
                            {loading ? old.email : "Loading..."}
                        </div>
                        <span className="justify-center flex text-2xl font-bold m-2">ID:&nbsp;<div className="font-normal">{loading ? old.userID : "Loading..."}</div></span>
                    </div>
                </div>
                <div className="flex justify-start">
                    <form onSubmit={handleSubmit} className="w-full flex justify-start">
                        <div>
                            <div className="text-[#114A65] font-semibold mt-10 mr-5 text-2xl">Họ tên</div>
                            <div className="text-[#114A65] font-semibold mt-10 mr-5 text-2xl">Ngày sinh</div>
                            <div className="text-[#114A65] font-semibold mt-10 mr-5 text-2xl">Điện thoại</div>
                            <div className="text-[#114A65] font-semibold mt-10 mr-5 text-2xl">Địa chỉ</div>
                        </div>
                        <div>
                            <div className="justify-start flex mt-10 h-8">
                                <input
                                    type="text"
                                    onChange={(e) => setData({ ...data, name: e.target.value })}
                                    required
                                    value = {data.name}
                                    placeholder={old.name}
                                    className="border border-gray-700 rounded-md px-2 w-96"
                                />
                            </div>
                            <div className="justify-start flex mt-10 h-8">
                                <input
                                    onChange={(e) => setData({ ...data, DoB: e.target.value })}
                                    onFocus={(e) => e.target.type = 'date'}
                                    onBlur={(e) => e.target.type = 'text'}
                                    value={data.DoB}
                                    placeholder={dateFormat(old.DoB, "yyyy-mm-dd")}
                                    className="border border-gray-700 rounded-md px-2 w-52"
                                />
                            </div>
                            <div className="justify-start flex mt-10 h-8">
                                <input
                                    type="text"
                                    required
                                    onChange={(e) => setData({ ...data, phone: e.target.value })}
                                    value={data.phone}
                                    placeholder={old.phone}
                                    className="border border-gray-700 rounded-md px-2 w-96"
                                />
                            </div>
                    
                            <div className="justify-start flex my-10 h-8">
                                <input
                                    type="text"
                                    required
                                    onChange={(e)=> setData({ ...data, address: e.target.value })}
                                    value={data.address}
                                    placeholder={old.address}
                                    className="border border-gray-700 rounded-md px-2 w-96"
                                />
                            </div>
                            <div className="justify-start flex my-14">
                                 <button onClick={handleSubmit} className="bg-[#2991C2] text-white border-black mx-10 px-10 py-2 text-center rounded-2xl font-semibold">LƯU</button>
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
                        </div>
                    </form>
                </div>
            </section >
        </>
    );
}

export default ProfileUser;
