import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "../utils-component/Pagination";
import axios from "axios";
import Cookies from "universal-cookie";
import { StatusColor } from "../utils-component/StatusColor";


const History = (props) => {
    // Fetching
    const [oldData, setOldData] = useState({}); 
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        (async () => {
            const cookies = new Cookies();
            const res = await axios.post("http://localhost:5000/user/info",{token: cookies.get("token")})
            setOldData(res["data"]["data"])
            const tempData = await axios.get("http://localhost:5000/print/orders/"+res["data"]["data"]["userID"])
            setData(tempData["data"])
            setLoading(true)
        })()
    }, [refresh])


    // Start
    const PageSize = 8;
    const [currentPage, setCurrentPage] = useState(1);
    const [currentTableData, setCurrentTableData] = useState([]);
    // const currentTableData = useMemo(() => {
    //     console.log(data)
    //     console.log("hello")
    //     const firstPageIndex = (currentPage - 1) * PageSize;
    //     const lastPageIndex = firstPageIndex + PageSize;
    //     return data.slice(firstPageIndex, lastPageIndex);
    // }, [currentPage]);
    // const [searchQuery, setSearchQuery] = useState("")
    // const keys=["printorderID", "printTime", "pickupTime", "fileName", "model", "pickupMethod", "totalPageUsed", "status"]
    // const filterData = currentTableData.filter((item) =>
    //     keys.some((key) => item[key].toString().toLowerCase().includes(searchQuery.toLowerCase()))
    // );
    const [searchQuery, setSearchQuery] = useState("")
    const [filterData, setFilterData] = useState([]);
    const [action, setAction] = useState(false);
    useEffect(() => {
        if (action === true) {
            setAction(false);
        }
        else setCurrentPage(1);
        const keys=["printorderID", "printTime", "pickupTime", "fileName", "model", "pickupMethod", "totalPageUsed", "status"]
        setFilterData(data.filter((item) =>
            keys.some((key) => item[key] && item[key].toString().toLowerCase().includes(searchQuery.toLowerCase())) === true
        ))
    }, [searchQuery, data]);
    useEffect(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        setCurrentTableData(filterData.slice(firstPageIndex, lastPageIndex));
    }, [currentPage, filterData]);

    const navigate = useNavigate();

    const handleLogout = () => {
        if (window.confirm("Bạn có chắc chắn muốn đăng xuất?")) {
            const cookies = new Cookies();
            sessionStorage.clear();
            localStorage.clear();
            cookies.remove("token");
            cookies.remove("isLogged");
            navigate('/');
        }
    };


    const showHeader = () => {
        return(
            <section className="App-header"> 
            <nav class="border-blue-200 text-lg bg-[#C4E4F3] ">
                <div class="flex flex-wrap justify-between p-2 lg:max-xl:p-0 md:max-lg:p-0">
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
                            <span class="self-center text-[#014464] text-1xl font-semibold whitespace-nowrap lg:max-xl:text-lg md:max-lg:text-lg">SMART PRINTING SERVICE</span>
                    </div>
                    <div class="flex items-center px-16" id="navbar-solid-bg">
                        <ul class="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
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
                                <img src="/arrow-right-from-bracket-solid.svg" className="h-10 lg:max-xl:h-8 md:max-lg:h-8" alt="arrow-right-from-bracket-solid" />
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </section>
        )
    };

    const handleEnter = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    };

    const searchBar = () => {
        return (
            <section>
                <div className="flex justify-between m-10 "> 
                    <div className="text-center flex w-full"></div>
                    <div className="justify-self-center text-4xl font-bold text-center flex w-full justify-center lg:max-xl:text-3xl md:max-lg:text-2xl">Lịch sử in</div>
                    <div className="flex w-full justify-center" >
                    <form>   
                        <div class="relative">
                            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                </svg>
                            </div>
                            <input type="search" id="default-search" class="italic block p-2 ps-10  text-smt text-black border border-black rounded-full lg:max-xl:text-xs md:max-lg:text-xs" placeholder="Tìm kiếm..." onKeyDown={handleEnter} value={searchQuery} onChange={(e)=> setSearchQuery(e.target.value)} />
                        </div> 
                    </form>
                    </div>
                </div>
            </section>
        )
    };

    const handleStatus = (val) => {
        axios.put("http://localhost:5000/print/orders/update/" + val.printorderID)
        .then((res) => {   
            console.log(res.data)
            setAction(true)
            setRefresh(!refresh)
        }
        )
        .catch((err) => console.log(err));
    }

    const StatusAction = (val) => {
        if (val.status === "Đã huỷ") {
            return (
                <button disabled="true"><img src="/trash-solid.svg" alt = "trash-solid" className="h-7 " /></button>
            )
        }
        else if (val.status === "Chờ in") {
            return (
                <button onClick={() => handleStatus(val)}><img src="/xmark.svg" alt = "xmark" className="h-7" /></button>
            )
        }
        else if (val.status === "Đang in") {
            return (
                <button disabled="true"><img src="/hour-glass.svg" alt = "spinner" className="h-7" /></button>
            )
        }
        else if (val.status === "Hoàn tất in") {
            return (
                <button onClick={() => handleStatus(val)}><img src="/check.svg" alt = "check-circle" className="h-7" /></button>
            )
        }
        else if (val.status === "Hoàn thành") {
            return (
                <button disabled="true"><img src="/circle-check.svg" alt = "check-circle" className="h-7" /></button>
            )
        }
    }

    const table = () => {
    return (
        <section>
            <table className="relative overflow-x-auto mx-auto text-2xl w-10/12 lg:max-xl:text-lg sm:max-lg:text-base">
                <tr className="bg-[#AADEF6]">
                    <th className="w-2/12 h-14">Ngày in</th>
                    <th className="w-2/12">Dự kiến lấy</th>
                    <th className="w-3/12">Tài liệu</th>
                    <th className="w-1/12">Máy in</th>
                    <th className="w-1/12">Phương thức nhận</th>
                    <th className="w-1/12">Số trang</th>
                    <th className="w-1/12">Trạng thái</th>
                    <th className="w-1/12"></th>
                </tr>
                {currentTableData.map((val, key) => {
                    if (key % 2 === 0) {
                        return (
                            <tr className="text-center text-xl bg-[#E8F6FD] lg:max-xl:text-lg md:max-lg:text-sm" key={key} >
                                <td className="h-14 lg:max-xl:h-10 md:max-lg:h-10">{val.printTime}</td>
                                <td className="">{val.pickupTime}</td>
                                <td className="max-w-0  overflow-auto">{val.fileName}</td>
                                <td className="">{val.model}</td>
                                <td className="">{val.pickupMethod}</td>
                                <td className="">{val.totalPageUsed}</td>
                                <td className="font-semibold">{StatusColor(val.status)}</td> {/* Đã hủy, Chờ in ( có nút hủy), đang in, Hoàn tất in, Hoàn thành */}
                                <td className="">{StatusAction(val)}</td>
                            </tr>
                        )
                    }
                    else {
                        return (
                            <tr className="text-center text-xl lg:max-xl:text-lg md:max-lg:text-sm" key={key} >
                                <td className="h-14 lg:max-xl:h-10 md:max-lg:h-10">{val.printTime}</td>
                                <td className="">{val.pickupTime}</td>
                                <td className="max-w-0  overflow-auto">{val.fileName}</td>
                                <td className="">{val.model}</td>
                                <td className="">{val.pickupMethod}</td>
                                <td className="">{val.totalPageUsed}</td>
                                <td className="font-semibold">{StatusColor(val.status)}</td> {/* Đã hủy, Chờ in ( có nút hủy), đang in, Hoàn tất in, Hoàn thành */}
                                <td className="">{StatusAction(val)}</td>
                            </tr>
                        )
                    }
                })}
            </table>
            <section >
                <Pagination
                    className="pagination-bar"
                    currentPage={currentPage}
                    totalCount={filterData.length}
                    pageSize={PageSize}
                    onPageChange={page => setCurrentPage(page)}
                />


            </section>
        </section>
        )
    };
    return (
        <div>
        { loading === false  ? (
            <div>Loading...</div>
        ) : (
        <>
            {showHeader()}
            {searchBar()}
            {table()}
            <div className="w-full  my-10 flex justify-center">
                            <button className=" text-center w-28 rounded-2xl h-10 text-xl bg-[#676767] text-white" onClick={
                                () => {
                                    if (sessionStorage.getItem("isSPSO") === "true") {
                                        navigate('/homeSPSO')
                                    }
                                    else {
                                        navigate('/homeUser')
                                    }
                                }
                            }>
                                TRỞ VỀ
                            </button>
            </div>
        </>)}
        </div>
    );
}

export default History