import React ,{useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { StatusColor } from "../utils-component/StatusColor";

const HomeSPSO = () => {
    const cookies = new Cookies();
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [pageBalance, setPageBalance] = useState(0);
    useEffect(() => {
        (async () => {
            const res = await axios.post("http://localhost:5000/user/info",{token: cookies.get("token")})
            setIsLoading(true)
            const tempData = await axios.get("http://localhost:5000/print/orders/"+res["data"]["data"]["userID"])
            setData(tempData["data"])
            setPageBalance(res["data"]["data"]["pageBalance"])
            setIsLoading(true)
        })()
    }, [])

    const dataPrinter = [
        // {
        //     "printerID": 1,
        //     "model": "MAXIFY GX5070",
        //     "imgLink": null,
        //     "type": "High Volume Document Printing",
        //     "location": "H1 lobby",
        //     "status": "active"
        // },
        // {
        //     "printerID": 2,
        //     "model": "MAXIFY GX5071",
        //     "imgLink": null,
        //     "type": "High Volume Document Printing",
        //     "location": "H1 lobby",
        //     "status": "active"
        // },
        // {
        //     "printerID": 3,
        //     "model": "MAXIFY GX5073",
        //     "imgLink": null,
        //     "type": "High Volume Document Printing",
        //     "location": "H1 lobby",
        //     "status": "active"
        // },
        // {
        //     "printerID": 4,
        //     "model": "MAXIFY GX5074",
        //     "imgLink": null,
        //     "type": "High Volume Document Printing",
        //     "location": "H1 lobby",
        //     "status": "active"
        // },
        // {
        //     "printerID": 5,
        //     "model": "MAXIFY GX5075",
        //     "imgLink": null,
        //     "type": "High Volume Document Printing",
        //     "location": "H1 lobby",
        //     "status": "active"
        // },
        // {
        //     "printerID": 6,
        //     "model": "MAXIFY GX5076",
        //     "imgLink": null,
        //     "type": "High Volume Document Printing",
        //     "location": "H1 lobby",
        //     "status": "active"
        // },
        // {
        //     "printerID": 7,
        //     "model": "MAXIFY GX5077",
        //     "imgLink": null,
        //     "type": "High Volume Document Printing",
        //     "location": "H1 lobby",
        //     "status": "active"
        // },
        // {
        //     "printerID": 8,
        //     "model": "MAXIFY GX5077",
        //     "imgLink": null,
        //     "type": "High Volume Document Printing",
        //     "location": "H1 lobby",
        //     "status": "active"
        // },
        // {
        //     "printerID": 9,
        //     "model": "MAXIFY GX5079",
        //     "imgLink": null,
        //     "type": "High Volume Document Printing",
        //     "location": "H1 lobby",
        //     "status": "active"
        // },
        // {
        //     "printerID": 11,
        //     "model": "Only model",
        //     "imgLink": null,
        //     "type": "null",
        //     "location": "null",
        //     "status": "null"
        // },
        // {
        //     "printerID": 12,
        //     "model": "Only model",
        //     "imgLink": null,
        //     "type": "",
        //     "location": "",
        //     "status": ""
        // },
        // {
        //     "printerID": 13,
        //     "model": "MAXIFY GX5079",
        //     "imgLink": null,
        //     "type": "",
        //     "location": "H1 lobby",
        //     "status": "active"
        // },
        // {
        //     "printerID": 14,
        //     "model": "MAXIFY GX5079",
        //     "imgLink": null,
        //     "type": "",
        //     "location": "H1 lobby",
        //     "status": "active"
        // },
        // {
        //     "printerID": 15,
        //     "model": "MAXIFY GX5079",
        //     "imgLink": null,
        //     "type": "",
        //     "location": "",
        //     "status": "active"
        // },
        // {
        //     "printerID": 16,
        //     "model": "Only model",
        //     "imgLink": null,
        //     "type": "Normal",
        //     "location": "H1 lobby",
        //     "status": "active"
        // }
    ]
    const navigate = useNavigate();
    const pageShow = 8

    const handleLogout = () => {
        if (window.confirm("Bạn có chắc chắn muốn đăng xuất?")) {
            // clear token
            localStorage.clear();
            // remove session storage
            sessionStorage.removeItem('token');
            cookies.remove("token");
            cookies.remove("isLogged");
            navigate('/');
        }
    }

    const WholePage = () => {
    return (
        <>  
        {/* header */}
            <section className="App-header"> 
                <nav class="border-blue-200 text-lg bg-[#C4E4F3]">
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
                                    <button onClick={()=>navigate('/profileUser')}>
                                    <img className="rounded-full h-16 " src="/ava-test.jpg" alt="my-ava" />
                                    </button>
                                </li>
                                <li className="px-5 pt-3">
                                    <button onClick={()=>navigate('/')}>
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
            <section className="flex place-content-evenly"> 
                <div className="flex-initial  ml-16 my-10  justify-center w-8/12 ">
                    <div className="font-sans text-5xl font-bold text-[#2991C2] ">Chào SPSO-0, <br/> chúc một ngày tốt lành!</div>
                    <div className="bg-[#DBF3FF] text-[#051319] font-sans text-2xl font-semibold rounded-3xl pt-6 px-10 my-14 ">
                        Số trang còn lại: 
                        <div className="font-sans text-[#014464] text-8xl font-bold text-center pt-1 pb-7 "> {pageBalance} </div>   
                        <div className="flex justify-end pb-3 text-base text-[#014464] font-bold">
                            <button onClick={()=>navigate('/PageBuyHistory')}>Xem lịch sử mua trang in</button>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-2 place-content-around w-full text-center justify-center">
                        <div className="rounded-3xl bg-[#2991C2]  py-10 my-5 place-self-center w-[250px] ">
                            <button onClick={()=>navigate('/printUser')}>
                                <img src="/print-solid.svg" className="h-20 mx-auto " alt="print" />
                                <span className ="text-white text-2xl ">In tài liệu</span>
                            </button>
                        </div>
                        <div className="rounded-3xl bg-[#2991C2]  py-10 my-5  place-self-center w-[250px]">
                            <button onClick={()=>navigate('/BuyPage')}>    
                                <img src="/cart-shopping-solid.svg" className="h-20 mx-auto" alt="shopping" />
                                <span className="text-white text-2xl">Mua thêm trang</span> 
                            </button>
                        </div>
                        <div className="rounded-3xl bg-[#2991C2]  py-10 my-5 place-self-center w-[250px] ">
                            <button onClick={()=>navigate('/printerManagement')}>
                                <img src="/bars-progress.svg" className="h-20 mx-auto" alt="print" />
                                <span className ="text-white text-2xl ">Quản lý máy in</span>
                            </button>
                        </div>
                        <div className="rounded-3xl bg-[#2991C2]  py-10 my-5  place-self-center w-[250px]">
                            <button onClick={()=>navigate('/userManagement')}>    
                                <img src="/user-solid.svg" className="h-20 mx-auto" alt="shopping" />
                                <span className="text-white text-2xl">Quản lý người dùng</span> 
                            </button>
                        </div>
                        <div className="rounded-3xl bg-[#2991C2]  py-10 my-5  place-self-center w-[250px] ">
                            <button onClick={()=>navigate('/queueManagement')}>
                                <img src="/table-column.svg" className="h-20 mx-auto" alt="print" />
                                <span className ="text-white text-2xl ">Quản lý hàng đợi in</span>
                            </button>
                        </div>
                        <div className="rounded-3xl bg-[#2991C2]  py-10 my-5  place-self-center w-[250px]">
                            <button onClick={()=>navigate('/genaralSetting')}>    
                                <img src="/gears-solid.svg" className="h-20 mx-auto" alt="shopping" />
                                <span className="text-white text-2xl">Cài đặt chung</span> 
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex-initial w-full m-14">
                    {/* first table */}
                    <div className="w-full text-3xl font-semibold mb-5 mx-5"> Tài liệu đã in gần đây </div>
                    <table className="relative overflow-x-auto mx-auto text w-full">
                    <tr className="bg-[#AADEF6] ">
                        <th className="h-11">Dự kiến lấy</th>
                        <th className="">Phương thức tới lấy</th>
                        <th className="">Tài liệu</th>
                        <th className="">Máy in</th>
                        <th className="">Số trang sử dụng</th>
                        <th className="">Trạng thái</th>
                    </tr>
                    {data && data.map((val, key) => {
                        if (key > pageShow) return;
                        if (key % 2 == 0) {
                            return (
                                <tr className="text-center text bg-[#E8F6FD]" key={key} >
                                    <td className="h-11">{val.pickupTime}</td>
                                    <td className="">{val.pickupMethod}</td>
                                    <td className="">{val.fileName}</td>
                                    <td className="">{val.model}</td>
                                    <td className="">{val.totalPageUsed}</td>
                                    <td className="font-semibold">{StatusColor(val.status)}</td>
                                </tr>
                            )
                        }
                        else {
                            return (
                                <tr className="text-center text" key={key} >
                                    <td className="h-11">{val.pickupTime}</td>
                                    <td className="">{val.pickupMethod}</td>
                                    <td className="">{val.fileName}</td>
                                    <td className="">{val.model}</td>
                                    <td className="">{val.totalPageUsed}</td>
                                    <td className="font-semibold">{StatusColor(val.status)}</td>
                                </tr>
                            )
                        }
                    })}
                </table>
                    <div className="text-right text-[#114A65] font-semibold my-5 mx-5 text-xl"> 
                        <button onClick={()=>navigate('/History')}> Xem tất cả </button>
                    </div>
                    {/* second table */}
                    <div className="w-full text-3xl font-semibold mb-5 mx-5"> Báo cáo in ấn (Not this data, just test) </div>
                    <table className="relative overflow-x-auto mx-auto text w-full">
                    <tr className="bg-[#AADEF6] ">
                        <th className="h-11">ID</th>
                        <th className="">Mẫu</th>
                        <th className="">Phân loại</th>
                        <th className="">Địa điểm</th>
                        <th className="">Trạng thái</th>
                    </tr>
                    {dataPrinter.map((val, key) => {
                        if (key > pageShow) return;
                        if (key % 2 == 0) {
                            return (
                                <tr className="text-center text bg-[#E8F6FD]" key={key} >
                                    <td className="h-11">{val.printerID}</td>
                                    <td className="">{val.model}</td>
                                    <td className="">{val.type}</td>
                                    <td className="">{val.location}</td>
                                    <td className="">{val.status}</td>
                                </tr>
                            )
                        }
                        else {
                            return (
                                <tr className="text-center text" key={key} >
                                    <td className="h-11">{val.printerID}</td>
                                    <td className="">{val.model}</td>
                                    <td className="">{val.type}</td>
                                    <td className="">{val.location}</td>
                                    <td className="">{val.status}</td>
                                </tr>
                            )
                        }
                    })}
                </table>
                    <div className="text-right text-[#114A65] font-semibold my-5 mx-5 text-xl"> 
                        <button onClick={()=>navigate('/History')}> Xem tất cả </button>
                    </div>
                </div>


            </section>
        </>
    );
                }
    return (
        <div>
            {isLoading == false ? <div>Loading...</div> : <WholePage />}
        </div>
    );
}

export default HomeSPSO;