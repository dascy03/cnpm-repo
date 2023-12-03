import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "../utils-component/Pagination";
import DataFetching from "../utils-component/dataFetching";
import Cookies from "universal-cookie";
import {StatusColor} from "../utils-component/StatusColor";
import axios from "axios";

const QueuePrinter = (props) => {
    /* Fetching and Pagination */
    const cookies = new Cookies();
    const [oldData, setOldData] = useState({});
    useEffect(() => {
      (async () => {
          const res = await axios.post("http://localhost:5000/user/info",{token: cookies.get("token")})
          setOldData(res["data"]["data"])
        })()
    }, [])
    const URL_API = "http://localhost:5000/print/" + sessionStorage.getItem("printerID") + "/queue";
    const {data , loading} = DataFetching(URL_API);

    //
    const PageSize = 8;
    const [currentPage, setCurrentPage] = useState(1);
    const [currentTableData, setCurrentTableData] = useState([]);
    /* Filter Search Bar */
    const [searchQuery, setSearchQuery] = useState("")
    const [filterData, setFilterData] = useState(data)
    useEffect(() => {
        setCurrentPage(1);
        const keys=["printerID", "model", "location", "status", "pageBalance"]
        setFilterData(data.filter((item) =>
            keys.some((key) => item[key] && item[key].toString().toLowerCase().includes(searchQuery.toLowerCase())) === true
        ))
    }, [searchQuery, data]);

    /* PAGE SIZE */
    
    useEffect(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        setCurrentTableData(filterData.slice(firstPageIndex, lastPageIndex));
    }, [currentPage, filterData]);
    
    /* Search Bar */

    const navigate = useNavigate();

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

    const showHeader = () => {
        return(
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
                                    <button onClick={()=>navigate('/homeSPSO')}>
                                    <img className="rounded-full h-16 " src={oldData.avtLink} alt="my-ava" />
                                    </button>
                                </li>
                                <li className="px-5 pt-3">
                                    <button onClick={()=>navigate('/SettingUser')}>
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
                <div className="flex justify-between m-10 px-28"> 
                    <div className=" text-center flex w-full justify-center"></div>
                    <div className=" justify-self-center text-4xl font-bold text-center flex w-full justify-center">Quản lý máy in</div>
                    <div className="flex w-full justify-center" >
                    <form>   
                        <div class="relative">
                            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                </svg>
                            </div>
                            <input type="search" id="default-search" class="italic block p-2 ps-10  text-smt text-black border border-black rounded-full" placeholder="Tìm kiếm..." onKeyDown={handleEnter} value={searchQuery} onChange={(e)=> setSearchQuery(e.target.value)} />
                        </div> 
                    </form>
                    </div>
                </div>
            </section>
        )
    };

    const table = () => {
        return (
            <section>
                <table className="relative overflow-x-auto mx-auto text-2xl w-6/12">
                    <tr className="bg-[#AADEF6]">
                        <th className="h-12">ID</th>
                        <th className="">Máy in</th>
                        <th className="">Thời gian in</th>
                        <th className="">Email</th>
                        <th className="">Trạng thái</th>
                    </tr>
                    {currentTableData.map((val, key) => {
                        if (key % 2 == 0) {
                            return (
                                <tr className="text-center text-xl bg-[#E8F6FD]" key={key} >
                                    <th className="h-12">{val.printorderID}</th>
                                    <th className="">{val.model}</th>
                                    <th className="">{val.printTime}</th>
                                    <th className="">{val.email}</th>
                                    <th className="">{StatusColor(val.status)}</th>
                                </tr>
                            )
                        }
                        else {
                            return (
                                <tr className="text-center text-xl" key={key} >
                                    <th className="h-12">{val.printorderID}</th>
                                    <th className="">{val.model}</th>
                                    <th className="">{val.printTime}</th>
                                    <th className="">{val.email}</th>
                                    <th className="">{StatusColor(val.status)}</th>
                                </tr>
                            )
                        }
                    })}
                </table>
                <section>
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
        //  check if loading is true, if true then show loading, if not then show table
        //  also check the currentTableData, if it is empty then show loading, if not then show table
        <div>
            {loading == false ? (
                <div>Loading...</div>
            ) : (
                <div>
                    {showHeader()}
                    {searchBar()}
                    {table()}  
                    <div className="w-full my-10 justify-center flex">
                        <button className=" text-center w-28 rounded-2xl h-10 text-xl bg-[#676767] text-white" onClick={()=>
                            {   sessionStorage.removeItem("printerID")
                                navigate('/printerManagement')
                            }}>
                            TRỞ VỀ
                        </button>
                    </div>
                </div>)}
        </div>
    );
}

export default QueuePrinter;