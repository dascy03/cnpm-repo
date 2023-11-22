import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "./component/Pagination";
import PrinterDataFetching from "./component/printerDataFetching";

const PrinterMana = (props) => {
    /* Fetching and Pagination */
    const URL_API = "http://localhost:5000/printers"
    const {data , loading} = PrinterDataFetching(URL_API);
    /* Filter Search Bar */
    const [searchQuery, setSearchQuery] = useState("")
    const keys=["printerID", "model", "imgLink", "type", "location", "status"]
    const filter1stData = data.filter((item) =>
        // check if value is null, if null then pass, if not then filter
        keys.some((key) => item[key] && item[key].toString().toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1
        )
    );
    /* PAGE SIZE */
    const PageSize = 8;

    const [currentPage, setCurrentPage] = useState(1);
    // const currentTableData = useMemo(() => {
    //   const firstPageIndex = (currentPage - 1) * PageSize;
    //   const lastPageIndex = firstPageIndex + PageSize;
    //   return data.slice(firstPageIndex, lastPageIndex);
    // }, [currentPage]);
    // the code below just show the data after clicking on the pagination bar, because the useMemo only works when the data is changed
    // then we need to use useEffect to make it work
    const [currentTableData, setCurrentTableData] = useState([]);
    useEffect(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        setCurrentTableData(filter1stData.slice(firstPageIndex, lastPageIndex));
    }, [currentPage, filter1stData]);
    
    /* Search Bar */
    const filterData = currentTableData.filter((item) =>
        // check if value is null, if null then pass, if not then filter
        keys.some((key) => item[key] && item[key].toString().toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1
        )
    );

    const navigate = useNavigate();

    const showHeader = () => {
        return(
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
                    <div className="w-full">
                        <button className=" text-center w-28 rounded-2xl h-10 text-xl bg-[#676767] text-white" onClick={()=>navigate('/homeSPSO')}>
                            TRỞ VỀ
                        </button>
                    </div>
                    <div className="w-full justify-self-center text-4xl font-bold">Lịch sử in</div>
                    <div className="" >
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
                <table className="relative overflow-x-auto mx-auto text-2xl">
                    <tr className="bg-[#AADEF6]">
                        <th className="px-2 py-2">Mã máy in</th>
                        <th className="px-10 py-2">Mẫu</th>
                        <th className="px-10 py-2">Link ảnh</th>
                        <th className="px-6 py-3">Phân loại</th>
                        <th className="px-6 py-2">Địa điểm</th>
                        <th className="px-6 py-2">Trạng thái</th>
                    </tr>
                    {filterData.map((val, key) => {
                        if (key % 2 == 0) {
                            return (
                                <tr className="text-center text-xl bg-[#E8F6FD]" key={key} >
                                    <th className="px-2 py-2">{val.printerID}</th>
                                    <th className="px-10 py-2">{val.model}</th>
                                    <th className="px-10 py-2">{val.imgLink}</th>
                                    <th className="px-6 py-3">{val.type}</th>
                                    <th className="px-6 py-2">{val.location}</th>
                                    <th className="px-6 py-2">{val.status}</th>
                                </tr>
                            )
                        }
                        else {
                            return (
                                <tr className="text-center text-xl" key={key} >
                                    <th className="px-2 py-2">{val.printerID}</th>
                                    <th className="px-10 py-2">{val.model}</th>
                                    <th className="px-10 py-2">{val.imgLink}</th>
                                    <th className="px-6 py-3">{val.type}</th>
                                    <th className="px-6 py-2">{val.location}</th>
                                    <th className="px-6 py-2">{val.status}</th>
                                </tr>
                            )
                        }
                    })}
                </table>
                <section>
                    <Pagination
                        className="pagination-bar"
                        currentPage={currentPage}
                        totalCount={filter1stData.length}
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
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div>
                    {showHeader()}
                    {searchBar()}
                    {table()}    
                </div>)}
        </div>
    );
}

export default PrinterMana
