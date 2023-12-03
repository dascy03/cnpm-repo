import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../css/style.css';
import Cookie from "universal-cookie";
import axios from "axios";
import '../css/radio-button.css';
import { Cookies } from "react-cookie";

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
                if (err.response.data["message"] == "User not found")
                    alert("Không tìm được User");
                else if (err.response.data["message"] == "Internal Server Error")
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
        // const userData = {
        //     userID : old.userID,
        //     file: file,
        //     pickupTime: data.pickupTime,
        //     printTime: data.printTime,
        //     printerID: data.printerID,
        //     printCopy: data.printCopy,
        //     pageSize: data.pageSize,
        //     pickupMethod: data.pickupMethod,
        //     pageSide: data.pageSide,
        //     pageColor: data.pageColor,
        // }
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
            if(err.response.data["message"] == "Ngưng hoạt động"){
                alert("Máy in không hoạt động! Vui lòng chọn máy in khác");
            }
            else if(err.response.data["message"] == "The current printer do not have enough paper!"){
                alert("Máy in không đủ giấy! Vui lòng chọn máy in khác");
            }
            else if(err.response.data["message"] == "You do not have enough page!"){
                alert("Bạn không đủ trang để in! Vui lòng nạp thêm trang");
            }
            else if(err.response.data["message"] == "The current printer has another order at your chosen time!"){
                alert("Máy in đã có đơn hàng khác vào thời gian này! Vui lòng chọn thời gian khác");
            }
            else if(err.response.data["message"] == "Internal Server Error"){
                alert("Lỗi máy chủ");
            }
            console.log(err.response.data["message"]);
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
                            <span class="self-center text-[#014464] text-1xl font-semibold whitespace-nowrap dark:text-white">SMART PRINTING SERVICE</span>
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
                                    <button onClick={() => navigate('/')}>
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
            <section className="flex justify-center">
            <form onSubmit={handleSubmit} className="justify-center flex">
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
                                            if (data.printTime == "") {
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
                                            if (data.printTime == "") {
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
                                        if (data.printTime == "") {
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