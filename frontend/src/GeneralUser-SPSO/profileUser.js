import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../css/style.css';
import Cookie from "universal-cookie";
import axios from "axios";

const ProfileUser = (props) => {
    const navigate = useNavigate();

    // const [name, setName] = useState('Nguyễn Văn T');
    // const [DOB, setDOB] = useState('20/04/2003');
    // const [phone, setPhone] = useState('0123456789');
    // const [email, setEmail] = useState('nguyen.vanT@hcmut.edu.vn');
    // const [address, setAddress] = useState('BKCS2, Dĩ An, Bình Dương');

    // const URL_API = "http://localhost:5000/user/info"
    // const {data , loading} = DataFetching(URL_API);
    // const keys=["userID", "name", "DoB", "phone", "address","email","password","status","pageBalance","avtLink"]
    
    const [success, setSuccess] = useState(false);
    const cookie = new Cookie();
    const Token123 = {
        token:cookie.get("token"),
    }
    const [data, setData] = useState({
        token:cookie.get("token")
        userID:1,
        name:'',
        DoB:new Date(),
        phone:'',   
        address:'',
        email:'',
        //avtLink:res.avtLink,
    })

    axios.post("http://localhost:5000/user/info", Token123)
    .then((res) => {
        setSuccess(res.data["success"])

        data.userID=res.data.userID
        data.name=res.data.name
        data.DoB=res.data.DoB
        data.phone=res.data.phone 
        data.address=res.data.address
        data.email=res.data.email
        //data.avtLink=res.avtLink,
    })
    .catch((err) => {
        if (err.response.data["message"] == "User not found")
          alert("Không tìm được User");
        else if (err.response.data["message"] == "Internal Server Error")
          alert("Lỗi máy chủ");
    });

    const handleUpdate = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
        // check if empty
    };

    const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
        token: data.token,
        name: data.name,
        DoB: data.DoB,
        phone: data.phone,
        address: data.address,
    }
    axios.post("http://localhost:5000/user/update", userData)
    .then((res) => {
        setSuccess(res.data["success"])
    })
    .catch((err) => {
        if (err.response.data["message"] == "User updated successfully")
          alert("Đã được cập nhật thành công");
        else if (
          err.response.data["message"] == "User not found"
        )
          alert("Không tìm được User");
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
                                    <button onClick={() => navigate('/homeUser')}>
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
            <section className="profileUser">
          <h1>Thông tin cá nhân</h1>
              <div class="image12">
                  <img src="./ava-test.jpg" alt=""/>
                  <h2>{data.name}</h2>
                  <p>{data.DoB}</p>
                  <p>ID: {data.userID}</p>
              </div>
          <form onSubmit={handleSubmit}>

              <label>Họ tên</label>
              <input
                  type="text" 
                  required
                  value={data.name}
                  onChange={handleUpdate}
              />

              <label>Ngày sinh</label>
              <input
                  type="date"
                  required
                  value={data.DoB}
                  onChange={handleUpdate}
              />

              <label>Điện thoại</label>
              <input
                  type="text"
                  required
                  value={data.phone}
                  onChange={handleUpdate}
              />

              <label>Email</label>
              <input
                  type="text"
                  required
                  value={data.email}
                  readOnly={true}
              />

              <label>Địa chỉ</label>
              <input
                  type="text"
                  required
                  value={data.address}
                  onChange={handleUpdate}
              />

              <div className="LUU">
                  <button>LƯU</button>
              </div>

          </form>
      </section >
        </>
    );
}

export default ProfileUser;
