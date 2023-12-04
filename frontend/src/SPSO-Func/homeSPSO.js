import React ,{useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { StatusColor } from "../utils-component/StatusColor";


const HomeSPSO = () => {
    const [oldData, setOldData] = useState({});

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [pageBalance, setPageBalance] = useState(0);
    useEffect(() => {
        (async () => {
            const cookies = new Cookies();  
            const res = await axios.post("http://localhost:5000/user/info",{token: cookies.get("token")})
            setOldData(res["data"]["data"])
            const tempData = await axios.get("http://localhost:5000/print/orders/"+res["data"]["data"]["userID"])
            setData(tempData["data"])
            setPageBalance(res["data"]["data"]["pageBalance"])
            setIsLoading(true)
        })()
    }, [])

    const dataPrinter = [
        {
            ID: "5",
            time: "01/12/2023",
            name: "report_T12_2023"
        }
        ,
        {
            ID: "4",
            time: "01/11/2023",
            name:  "report_T11_2023"
        }
        ,
        {
            ID: "3",
            time: "01/10/2023",
            name:   "report_T10_2023"
        }
        ,
        {
            ID: "2",
            time: "01/09/2023",
            name:   "report_T9_2023"
        }
        ,
        {
            ID: "1",
            time: "01/08/2023",
            name:   "report_T8_2023"
        }
    ]
    const navigate = useNavigate();
    const pageShow = 8

    const handleLogout = () => {
        console.log("logout");
        if (window.confirm("Bạn có chắc chắn muốn đăng xuất?")) {
            const cookies = new Cookies();
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
                <nav class="border-blue-200 text-lg bg-[#C4E4F3]  ">
                    <div class="flex flex-wrap justify-between p-2 lg:max-xl:p-1 md:max-lg:p-">
                        <div class="flex items-center space-x-0 rtl:space-x-reverse mx-5 px-4 lg:max-xl:mx-3 md:max-lg:mx-3 lg:max-xl:px-2 md:max-lg:px-2">
                                <button onClick={
                                    () => {
                                        if (sessionStorage.getItem("isSPSO") === "true") {
                                            navigate('/homeSPSO')
                                        }
                                        else {
                                            navigate('/homeUser')
                                        }
                                    }
                                }>
                                    <img src="/hcmut-logo.png" class="h-24" alt="HCMUT logo" /></button>
                                <span class="self-center text-[#014464] text-1xl lg:max-xl:text-lg md:max-lg:text-lg font-semibold whitespace-nowrap">SMART PRINTING SERVICE</span>
                        </div>
                        <div class="flex items-center px-16" id="navbar-solid-bg">
                            <ul class="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
                                <li className="px-5">
                                    <button onClick={()=>navigate('/profileUser')}>
                                    <img className="rounded-full h-16 lg:max-xl:h-14 md:max-lg:h-14" src={oldData.avtLink} alt="my-ava" />
                                    </button>
                                </li>
                                <li className="px-5 pt-3">
                                    <button onClick={()=>navigate('/SettingUser')}>
                                    <img src="/gear-solid.svg" className="h-10 lg:max-xl:h-8 md:max-lg:h-8" alt="gear-solid" />
                                    </button>
                                </li>
                                <li className="px-5 pt-3">
                                    <button onClick={handleLogout}>
                                    <img src="/arrow-right-from-bracket-solid.svg " className="h-10 lg:max-xl:h-8 md:max-lg:h-8" alt="arrow-right-from-bracket-solid" />
                                    
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
                    <div className="font-sans text-5xl lg:max-xl:text-4xl md:max-lg:text-4xl font-bold text-[#2991C2] ">Chào SPSO-0, <br/> chúc một ngày tốt lành!</div>
                    <div className="bg-[#DBF3FF] text-[#051319] font-sans text-2xl lg:max-xl:text-xl md:max-lg:text-xl font-semibold rounded-3xl pt-6 px-10 my-14 ">
                        Số trang còn lại: 
                        <div className="font-sans text-[#014464] text-8xl lg:max-xl:text-7xl md:max-lg:text-6xl font-bold text-center pt-1 pb-7 "> {pageBalance} </div>   
                        <div className="flex justify-end pb-3 text-base text-[#014464] font-bold">
                            <button onClick={()=>navigate('/PageBuyHistory')}>Xem lịch sử mua trang in</button>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-2 place-content-around w-full text-center justify-center">
                        <div className="rounded-3xl bg-[#2991C2]  py-10 my-5 place-self-center w-[240px] lg:max-xl:w-[165px] md:max-lg:w-[155px] ">
                            <button onClick={()=>navigate('/printUser')}>
                                <img src="/print-solid.svg" className="h-20 mx-auto lg:max-xl:h-16 md:max-lg:h-12" alt="print" />
                                <span className ="text-white text-2xl ">In tài liệu</span>
                            </button>
                        </div>
                        <div className="rounded-3xl bg-[#2991C2]  py-10 my-5  place-self-center w-[240px] lg:max-xl:w-[165px] md:max-lg:w-[155px]">
                            <button onClick={()=>navigate('/BuyPage')}>    
                                <img src="/cart-shopping-solid.svg" className="h-20 mx-auto lg:max-xl:h-16 md:max-lg:h-12" alt="shopping" />
                                <span className="text-white text-2xl lg:max-xl:text-xl md:max-lg:text-lg">Mua thêm trang</span> 
                            </button>
                        </div>
                        <div className="rounded-3xl bg-[#2991C2]  py-10 my-5 place-self-center w-[240px] lg:max-xl:w-[165px] md:max-lg:w-[155px] ">
                            <button onClick={()=>navigate('/printerManagement')}>
                                <img src="/bars-progress.svg" className="h-20 mx-auto lg:max-xl:h-16 md:max-lg:h-12" alt="print" />
                                <span className ="text-white text-2xl lg:max-xl:text-xl md:max-lg:text-lg">Quản lý máy in</span>
                            </button>
                        </div>
                        <div className="rounded-3xl bg-[#2991C2]  py-10 my-5  place-self-center w-[240px] lg:max-xl:w-[165px] md:max-lg:w-[155px]">
                            <button onClick={()=>navigate('/userManagement')}>    
                                <img src="/user-solid.svg" className="h-20 mx-auto lg:max-xl:h-16 md:max-lg:h-12" alt="shopping" />
                                <span className="text-white text-2xl lg:max-xl:text-lg md:max-lg:text-base">Quản lý người dùng</span> 
                            </button>
                        </div>
                        <div className="rounded-3xl bg-[#2991C2]  py-10 my-5  place-self-center w-[240px] lg:max-xl:w-[165px] md:max-lg:w-[155px] ">
                            <button onClick={()=>navigate('/queueManagement')}>
                                <img src="/table-column.svg" className="h-20 mx-auto lg:max-xl:h-16 md:max-lg:h-12" alt="print" />
                                <span className ="text-white text-2xl lg:max-xl:text-lg md:max-lg:text-base">Quản lý hàng đợi in</span>
                            </button>
                        </div>
                        <div className="rounded-3xl bg-[#2991C2]  py-10 my-5  place-self-center w-[240px] lg:max-xl:w-[165px] md:max-lg:w-[155px]">
                            <button onClick={()=>navigate('/genaralSetting')}>    
                                <img src="/gears-solid.svg" className="h-20 mx-auto lg:max-xl:h-16 md:max-lg:h-12" alt="shopping" />
                                <span className="text-white text-2xl lg:max-xl:text-xl md:max-lg:text-lg">Cài đặt chung</span> 
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex-initial w-full m-14">
                    {/* first table */}
                    <div className="w-full text-3xl lg:max-xl:text-2xl  md:max-lg:text-xl font-semibold mb-5 mx-5"> Tài liệu đã in gần đây </div>
                    <table className="relative overflow-x-auto mx-auto text lg:max-xl:text-sm md:max-lg:text-xs w-full">
                        <tbody>
                            <tr className="bg-[#AADEF6] ">
                                <th className="h-11 lg:max-xl:h-9 md:max-lg:h-7 w-1/6">Dự kiến lấy</th>
                                <th className="w-3/12">Phương thức tới lấy</th>
                                <th className="w-3/12">Tài liệu</th>
                                <th className="w-1/12">Máy in</th>
                                <th className="w-1/12">Số trang sử dụng</th>
                                <th className="w-2/12 px-1">Trạng thái</th>
                            </tr>
                        </tbody>
                    {data && data.map((val, key) => {
                        if (key >= pageShow) return [];
                        if (key % 2 === 0) {
                            return (
                                <tbody>
                                    <tr className="text-center text lg:max-xl:text-sm md:max-lg:text-sm bg-[#E8F6FD]" key={key} >
                                        <td className="h-11  lg:max-xl:h-9 md:max-lg:h-7">{val.pickupTime}</td>
                                        <td className="">{val.pickupMethod}</td>
                                        <td className="max-w-0  overflow-auto">{val.fileName}</td>
                                        <td className="">{val.model}</td>
                                        <td className="">{val.totalPageUsed}</td>
                                        <td className="font-semibold">{StatusColor(val.status)}</td>
                                    </tr>
                                </tbody>
                            )
                        }
                        else {
                            return (
                                <tbody>
                                    <tr className="text-center text lg:max-xl:text-sm md:max-lg:text-sm" key={key} >
                                        <td className="h-11 lg:max-xl:h-9 md:max-lg:h-7">{val.pickupTime}</td>
                                        <td className="">{val.pickupMethod}</td>
                                        <td className="max-w-0  overflow-auto">{val.fileName}</td>
                                        <td className="">{val.model}</td>
                                        <td className="">{val.totalPageUsed}</td>
                                        <td className="font-semibold">{StatusColor(val.status)}</td>
                                    </tr>
                                </tbody>
                            )
                        }
                    })}
                </table>
                    <div className="text-right text-[#114A65] font-semibold my-5 mx-5 text-xl lg:max-xl:text-base md:max-lg:text-sm"> 
                        <button onClick={()=>navigate('/History')}> Xem tất cả </button>
                    </div>
                    {/* second table */}
                    <div className="w-full text-3xl lg:max-xl:text-2xl  md:max-lg:text-xl font-semibold mb-5 mx-5"> Báo cáo in ấn </div>
                    <table className="relative overflow-x-auto mx-auto text lg:max-xl:text-sm md:max-lg:text-xs w-full">
                        <tbody>
                            <tr className="bg-[#AADEF6] ">
                                <th className="h-11 lg:max-xl:h-9 md:max-lg:h-7">ID</th>
                                <th className="">Thời gian báo cáo</th>
                                <th className="">Tên báo cáo</th>
                                <th ></th>
                            </tr>
                        </tbody>
                    {dataPrinter.map((val, key) => {
                        if (key >= pageShow) return [];
                        if (key % 2 === 0) {
                            return (
                                <tbody>
                                    <tr className="text-center text lg:max-xl:text-sm md:max-lg:text-xs bg-[#E8F6FD]" key={key} >
                                        <td className="">{val.ID}</td>
                                        <td className="">{val.time}</td>
                                        <td className="">{val.name}</td>
                                        <th><button onClick={
                                            () => {
                                                if (key === 0){
                                                   navigate('/dashboard')
                                                }                                            }
                                        } className="text-[#114A65] font-semibold">xem</button></th>
                                    </tr>
                                </tbody>
                            )
                        }
                        else {
                            return (
                                <tbody>
                                    <tr className="text-center text lg:max-xl:text-sm md:max-lg:text-xs" key={key} >
                                        <td className="">{val.ID}</td>
                                        <td className="">{val.time}</td>
                                        <td className="">{val.name}</td>
                                        <th><button className="text-[#114A65] font-semibold">xem</button></th>
                                    </tr>
                                </tbody>
                            )
                        }
                    })}
                </table>
                    <div className="text-right text-[#114A65] font-semibold my-5 mx-5 text-xl lg:max-xl:text-base md:max-lg:text-sm"> 
                        <button> Xem tất cả </button>
                    </div>
                </div>


            </section>
        </>
    );
                }
    return (
        <div>
            {isLoading === false ? <div>Loading...</div> : <WholePage />}
        </div>
    );
}

export default HomeSPSO;