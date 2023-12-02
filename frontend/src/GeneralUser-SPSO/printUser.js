import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../css/style.css';
import Cookie from "universal-cookie";
import axios from "axios";

const PrintUser = (props) => {
    const navigate = useNavigate();

    // const [file, setFile] = useState();
    // const [printdate, setPrintdate] = useState('10AM - 20/10/2023');
    // const [printer, setPrinter] = useState('P1-Lầu 6');
    // const [pageselect, setPageselect] = useState(33);
    // const [printsize, setPrintsize] = useState('A4');
    // const [pickupmethod, setPickupmethod] = useState('10PM - 20/10/2023');
    // const [papersize, setPapersize] = useState('Tất cả');
    // const [orientation, setOrientation] = useState('Hai mặt');
    // const [printcolor, setPrintcolor] = useState('Có');

    const [success, setSuccess] = useState(false);
    const [file, setFile] = useState(null);
    const [data, setData] = useState({
        userID:1,

        file:"asd",

        pickupTime: new Date(),  
        printTime: new Date(),
        printerID:1,
        printCopy:1,
        pageSize:'A4',
        pickupMethod: 'Hẹn',
        pageSide: 'Hai mặt',
        pageColor: 'Không',

    })
    
    function DownloadFile(e) {
        setFile(e.target.files[0]);
    }

    const handleUpdate = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    if(data.pickupMethod=="Tự đến lấy"){
        data.pickupTime=data.printTime;
    }
    // check if empty
    };

    const handleSubmit = (e) => {
    e.preventDefault();
    // const fd = new FormData();
    // fd.append('file',file);
    const userData = {
        userID:data.userID,
        file: file,
        pickupTime: data.pickupTime,   
        printTime: data.printTime,
        printerID: data.printerID,
        printCopy: data.printCopy,
        pageSize:data.pageSize,
        pickupMethod: data.pickupMethod,
        pageSide: data.pageSide,
        pageColor: data.pageColor,
    }
    
    axios.post("http://localhost:5000/print/orders", userData)
    .then((res) => {
        setSuccess(res.data["success"])
    })
    .catch((err) => {
        if (err.response.data["message"] == "User updated successfully")
          alert("Đã được cập nhật thành công");
        else if (err.response.data["message"] == "Internal Server Error")
          alert("Lỗi máy chủ");
    });

    }

    useEffect(() => {
        if (sessionStorage.getItem("isSPSO") === "true") {
            navigate('/homeSPSO')
        }
        else {
            navigate('/homeUser')
        }
    }
    );

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
                                        <img className="rounded-full h-16 " src="/ava-test.jpg" alt="my-ava" />
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
            <section className="printUser">
            <h1>In tài liệu</h1>
            <form onSubmit={handleSubmit}>
                <label>Tài liệu</label>
                <input type="file" name="file" required onChange={DownloadFile} />

                <label>Giờ in</label>
                <input
                    type="datetime-local"
                    required
                    value={data.printTime}
                    onChange={handleUpdate}
                />

                <label>Máy in</label>
                <input
                    type="number"
                    required
                    value={data.printerID}
                    onChange={handleUpdate}
                />

                <label>Số lượng in</label>
                <input
                    type="number"
                    required
                    value={data.printCopy}
                    onChange={handleUpdate}
                />

                <label>Khổ giấy</label>
                <select
                    value={data.pageSize}
                    onChange={handleUpdate}
                >
                    <option value="A5">A5</option>
                    <option value="A4">A4</option>
                    <option value="A3">A3</option>
                    <option value="A2">A2</option>
                    <option value="A1">A1</option>
                </select>

                <label>Phương thức nhận</label>
                <select
                    value={data.pickupMethod}
                    onChange={handleUpdate}
                >
                    <option value="Tự đến lấy">Tự đến lấy</option>
                    <option value="Hẹn">Hẹn</option>
                </select>

                <label>Dự kiến lấy</label>
                <input
                    type="datetime-local"
                    required
                    value={data.pickupMethod}
                    onChange={handleUpdate}
                />

                {/* <label>In trang</label>
                <input
                    type="text"
                    required
                    value={papersize}
                    onChange={(e) => setPapersize(e.target.value)}
                /> */}

                <label>In mặt</label>
                <select
                    value={data.pageSide}
                    onChange={handleUpdate}
                >
                    <option value="Hai mặt">Hai mặt</option>
                    <option value="Một mặt">Một mặt</option>
                </select>

                <label>In màu</label>
                <select
                    value={data.pageColor}
                    onChange={handleUpdate}
                >
                    <option value="Có">Có</option>
                    <option value="Không">Không</option>
                </select>

                <div className="IN">
                    <button>IN</button>
                </div>
            </form>
            <div className="HUY">
            <button onClick={
                () => {
                    if (sessionStorage.getItem("isSPSO") === "true") {
                        navigate('/homeSPSO')
                    }
                    else {
                        navigate('/homeUser')
                    }
                }
            }>HỦY</button>
            </div>
        </section>
        </>
    );
}

export default PrintUser;