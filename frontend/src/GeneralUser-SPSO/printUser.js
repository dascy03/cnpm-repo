import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../css/style.css';
import Cookie from "universal-cookie";
import axios from "axios";
import '../css/radio-button.css';
import Pagination from "../utils-component/Pagination";

const PrintUser = (props) => {
    const navigate = useNavigate();
    const cookies = new Cookie();

    const [old, setOldData] = useState({});
    useEffect(() => {
        (async () => {
            const res = await axios.post("http://localhost:5000/user/info",{token: cookies.get("token")})
            .then((res) => {
                // console.log(res.data["data"]);
                setOldData(res.data["data"]);
            })
            .catch((err) => {
                if (err.response.data["message"] === "User not found")
                    alert("Không tìm được User");
                else if (err.response.data["message"] === "Internal Server Error")
                    alert("Lỗi máy chủ");
            });
        })()
    }, []);

    const [file, setFile] = useState();
    
    const [data, setData] = useState({
      pickupTime:"",
      printTime:"",
      printerID:"",
      printCopy:"",
      pageSize:"A4",
      pickupMethod:"Tự đến lấy",
      pageSide:"",
      pageColor:"",
    })
    


    const handleSubmit = (e) => {
        // console.log(data);
        for (const [key, value] of Object.entries(data)) {
            if (value === "") {
                alert("Vui lòng nhập đầy đủ thông tin");
                return;
            }
        }
        const userData = new FormData();
        userData.append("userID", old.userID);
        userData.append("file", file);
        userData.append("pickupTime", data.pickupTime);
        userData.append("printTime", data.printTime);
        userData.append("printerID", data.printerID);
        userData.append("printCopy", data.printCopy);
        userData.append("pageSize", data.pageSize);
        userData.append("pickupMethod", data.pickupMethod);
        userData.append("pageSide", data.pageSide);
        userData.append("pageColor", data.pageColor);

        // console.log(file)
        console.log([...userData])
        // console.log("halo")
        axios.post("http://localhost:5000/print/orders", userData
        ).then((res) => {  
            console.log(res.data);
            alert("Đặt in thành công");
        }).catch((err) => {
            if(err.response.data["message"] === "Ngưng hoạt động"){
                alert("Máy in không hoạt động! Vui lòng chọn máy in khác");
            }
            else if(err.response.data["message"] === "Please upload file to print!"){
                alert("Vui lòng chọn file để in");
            }
            else if(err.response.data["message"] === "Your chosen pickupTime is wrong!"){
                alert("Thời gian hẹn không hợp lệ! Vui lòng chọn thời gian khác");
            }
            else if(err.response.data["message"] === "The current printer is not active!"){
                alert("Máy in không hoạt động! Vui lòng chọn máy in khác");
            }
            else if(err.response.data["message"] === "The current printer do not have enough paper!"){
                alert("Máy in không đủ giấy! Vui lòng chọn máy in khác");
            }
            else if(err.response.data["message"] === "You do not have enough page!"){
                alert("Bạn không đủ trang để in! Vui lòng nạp thêm trang");
            }
            else if(err.response.data["message"] === "The current printer has another order at your chosen time!"){
                alert("Máy in đã có đơn hàng khác vào thời gian này! Vui lòng chọn thời gian khác");
            }
            else {
                alert("Lỗi máy chủ");
            }
            console.log(err.response.data["message"]); // not handle no ID exist yet

        })
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

    const URL_API = "http://localhost:5000/printers"
    const [printerData, setPrinterData] = useState([]);
    useEffect(() => {
        (async () => {
            const res = await axios.get(URL_API);
            setPrinterData(res.data);
            console.log(res.data);
        }
        )();
    }
    , []);

    const PageSize = 7;
    const [currentPage, setCurrentPage] = useState(1);
    const [currentTableData, setCurrentTableData] = useState([]);
    /* Filter Search Bar */
    const [searchQuery, setSearchQuery] = useState("")
    const [filterData, setFilterData] = useState(printerData)
    useEffect(() => {
        setCurrentPage(1);
        const keys=["printerID", "model", "location", "status", "pageBalance"]
        setFilterData(printerData.filter((item) =>
            keys.some((key) => item[key] && item[key].toString().toLowerCase().includes(searchQuery.toLowerCase())) === true
        ))
    }, [searchQuery, printerData]);

    useEffect(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        setCurrentTableData(filterData.slice(firstPageIndex, lastPageIndex));
    }, [currentPage, filterData]);

    const handleEnter = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    };
    const tablePrinter = () => {
        return (
            <>
            <section className="justify-center flex">
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
            </section>
            <section className="pt-10">
                <table className="relative overflow-x-auto mx-auto text-2xl w-9/12">
                    <tr className="bg-[#AADEF6]">
                        <th className="h-12">ID</th>
                        <th className="">Mẫu</th>
                        <th className="">Địa điểm</th>
                        <th className="">Số trang có sẵn</th>
                        <th className="">Trạng thái</th>
                        <th className=""></th>
                    </tr>
                    {currentTableData.map((val, key) => {
                        if (key % 2 === 0) {
                            return (
                                <tr className="text-center text-xl bg-[#E8F6FD]" key={key} >
                                    <th className="h-12">{val.printerID}</th>
                                    <th className="">{val.model}</th>
                                    <th className="">{val.location}</th>
                                    <th className="">{val.pageBalance}</th>
                                    <th className="">
                                    {(val.status === "Đang hoạt động") ? <span className="text-green-500">{val.status}</span> : <span className="text-red-500">{val.status}</span>}
                                    </th>
                                </tr>
                            )
                        }
                        else {
                            return (
                                <tr className="text-center text-xl" key={key} >
                                    <th className="h-12">{val.printerID}</th>
                                    <th className="">{val.model}</th>
                                    <th className="">{val.location}</th>
                                    <th className="">{val.pageBalance}</th>   
                                    <th className="">
                                    {(val.status === "Đang hoạt động") ? <span className="text-green-500">{val.status}</span> : <span className="text-red-500">{val.status}</span>}
                                    </th>
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
        </>
        )
    };
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
                                    <button onClick={
                                        () => navigate('/profileUser')
                                    }>
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
            <div className="justify-center flex text-4xl font-bold mx-12 mt-12 mb-5">In tài liệu</div>  
            <section className="grid grid-cols-2 justify-center">
            <form onSubmit={handleSubmit} className="justify-end flex">
                <div>
                    <div className="text-[#114A65] font-semibold m-8 text-xl">Tài liệu</div>
                    <div className="text-[#114A65] font-semibold m-8 text-xl">Giờ in</div>
                    <div className="text-[#114A65] font-semibold m-8 text-xl">Máy in</div>
                    <div className="text-[#114A65] font-semibold m-8 text-xl">Số lượng in</div>
                    <div className="text-[#114A65] font-semibold m-8 text-xl">Khổ giấy</div>
                    <div className="text-[#114A65] font-semibold m-8 text-xl">Phương thức nhận</div>
                    <div className="text-[#114A65] font-semibold m-8 text-xl">In trang</div>
                    <div className="text-[#114A65] font-semibold m-8 text-xl">In mặt</div>
                    <div className="text-[#114A65] font-semibold m-8 text-xl">In màu</div>
                </div>
                <div>
                    {/* Tài liệu */}
                    <div className="justify-start flex mt-8">
                        <input type="file" name="file" onChange={
                            async (e) => {
                                const file = e.target.files[0];
                                setFile(file);
                                // console.log(file);
                            }
                        
                        } 
                        value ={data.file}
                        required/>
                    </div>

                    {/* Giờ in */}
                    <div className="justify-start flex mt-7">
                        <input
                            type="datetime-local"
                            required
                            onFocus={(e) => e.target.type = 'datetime-local'}
                            onBlur={(e) => e.target.type = 'text'}
                            className="border border-gray-700 rounded-md px-2 w-56"
                            onChange={
                                (e) => setData({ ...data, printTime: e.target.value })
                            }
                        />
                    </div>

                    {/* Máy in */}
                    <div className="justify-start flex mt-9">
                        <input
                            type="number"
                            required
                            className="border border-gray-700 rounded-md px-2 w-56"
                            onChange={
                                (e) => {
                                    if (e.target.value < 0) {
                                        alert("ID máy in- không hợp lệ");
                                        setData({ ...data, printerID: "" })
                                        return;
                                    }
                                    setData({ ...data, printerID: e.target.value })
                                }
                            }
                            min = "0"
                        />
                    </div>

                    {/* Số lượng in */}
                    <div className="justify-start flex mt-9">
                        <input
                            type="number"
                            required
                            className="border border-gray-700 rounded-md px-2 w-56"
                            onChange={
                                
                                (e) => {
                                    if (e.target.value < 1) {
                                        alert("Số lượng in phải lớn hơn 0");
                                        setData({ ...data, printCopy: "" })
                                        return;
                                    }
                                    setData({ ...data, printCopy: e.target.value }
                                        )}
                            }
                            min = "1"
                        />
                    </div>

                    {/* Khổ giấy */}
                    <div className="justify-start flex mt-9">
                        <select
                            className="border border-gray-700 rounded-md px-2 w-56"
                            onChange={
                                (e) => setData({ ...data, pageSize: e.target.value })
                            }
                        >
                            <option value="A4">A4</option>
                            <option value="A1">A1</option>
                            <option value="A2">A2</option>
                            <option value="A3">A3</option>
                            <option value="B1">B1</option>
                        </select>
                    </div>
                                    
                    {/* Phương thức nhận */}
                    <div className="justify-start flex mt-8">
                        <div>
                            <label className="container">
                                <input type="radio" name="Method"
                                    onChange={
                                        (e) => {
                                            if (data.printTime === "") {
                                                alert("Vui lòng nhập thời gian in trước");
                                                setData({ ...data, pickupMethod: "" })
                                                return;
                                            }
                                            setData({ ...data, pickupMethod: e.target.value })
                                            setData({ ...data, pickupTime: data.printTime })
                                        }
                                    }
                                    disabled = {data.printTime === ""}
                                    value="Tự đến lấy"
                                /> Tự đến lấy
                            <span class="checkmark"></span>
                            </label>

                            <label className="container">
                                <input type="radio" name="Method"
                                    onChange={
                                        (e) => {
                                            if (data.printTime === "") {
                                                alert("Vui lòng nhập thời gian in trước");
                                                setData({ ...data, pickupMethod: "" })
                                                return;
                                            }
                                            setData({ ...data, pickupMethod: e.target.value })
                                        }
                                     }
                                     disabled = {data.printTime === ""}
                                     
                                    value = "Hẹn"
                                /> Hẹn
                            <span className="checkmark"></span>
                            </label>
                                     {/* disable this input when pickupMethod == "tự đến lấy" and setvalue after disable is printTime */}
                            <input
                                    type="datetime-local"
                                    required ì
                                    onChange={
                                       (e) =>{
                                        if (data.printTime === "") {
                                            alert("Vui lòng nhập thời gian in trước");
                                            setData({ ...data, pickupMethod: "" })
                                            return;
                                        }
                                        if (e.target.value < data.printTime) {
                                            alert("Thời gian hẹn phải lớn hơn thời gian in");
                                            setData({ ...data, pickupTime: "" })
                                        }
                                        else setData({ ...data, pickupTime: e.target.value })
                                       }
                                    }
                                    onFocus={(e) => e.target.type = 'datetime-local'}
                                    onBlur={(e) => e.target.type = 'text'}
                                    disabled = {data.pickupMethod === "Tự đến lấy"}
                                    value = {data.pickupMethod === "Tự đến lấy" ? data.printTime : data.pickupTime}
                                    className="border border-gray-700 rounded-md px-2"
                                />
                            
                            </div>
                    </div>

                    {/* In trang */}
                    <div className="justify-start flex mt-8">
                        <div>
                            <label className="container">
                                <input type="radio" checked="checked" /> Tất cả
                            <span class="checkmark"></span>
                            </label>
                        </div>  
                    </div>

                    {/* In mặt */}
                    <div className="justify-start flex mt-8">
                            <label className="container">
                                <input type="radio" name="page" 
                                onChange={
                                    (e) => setData({ ...data, pageSide: e.target.value })
                                }
                                value="Hai mặt"
                                /> Hai mặt
                            <span class="checkmark"></span>
                            </label>

                            <label className="container">
                                <input type="radio" name="page"
                                onChange={
                                    (e) => setData({ ...data, pageSide: e.target.value })
                                }
                                value="Một mặt"
                                 /> Một mặt
                            <span className="checkmark"></span>
                            </label>
                    </div>

                    {/* In màu */}
                    <div className="justify-start flex mt-9">
                            <label className="container">
                                <input type="radio" name="color" 
                                    onChange={
                                        (e) => setData({ ...data, pageColor: e.target.value })
                                    }
                                    value="Không"
                                /> Không
                            <span class="checkmark"></span>
                            </label>

                            <label className="container">
                                <input type="radio" name="color" 
                                    onChange={
                                        (e) => setData({ ...data, pageColor: e.target.value })
                                    }
                                    value="Có"
                                
                                /> Có
                            <span className="checkmark"></span>
                            </label>
                    </div>
                </div>
            </form>
            <div>
                {tablePrinter()}
            </div>
        </section>
        <div className="justify-center flex my-5">
                <button onClick={handleSubmit} className="bg-[#2991C2] text-white border-black mx-7 px-10 py-2 text-center rounded-2xl font-semibold">IN</button>
                <button onClick={
                () => {
                    if (sessionStorage.getItem("isSPSO") === "true") {
                        navigate('/homeSPSO')
                    }
                    else {
                        navigate('/homeUser')
                    }
                }
                } className="bg-[#676767] text-white border-black mx-7 px-8 py-2 text-center rounded-2xl font-semibold ">HỦY</button>
        </div>
        </>
    );
}

export default PrintUser;