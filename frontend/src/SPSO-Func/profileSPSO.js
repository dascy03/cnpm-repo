import React from "react";
import { useNavigate } from "react-router-dom";
//import "./styles.css";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const ProfileSPSO = (props) => {
    const data = [
        { ID: 7737,name: "Nguyễn Văn T", DOB: "20/04/2023", phone: "0123456789", email: "nguyen.vanT@hcmut.edu.vn", address: "BKCS2, Dĩ An, Bình Dương" },
    ]
    const [name, setName] = useState('Nguyễn Văn T');
    const [DOB, setDOB] = useState('20/04/2003');
    const [phone, setPhone] = useState('0123456789');
    const [email, setEmail] = useState('nguyen.vanT@hcmut.edu.vn');
    const [address, setAddress] = useState('BKCS2, Dĩ An, Bình Dương');

    const notify = () => toast.success("Success!", {position: toast.POSITION.TOP_CENTER});

    const handleSubmit = (e) => {
      e.preventDefault();
      const blog = { name, DOB, phone, email, address };
      console.log(blog);
    }
    const navigate = useNavigate();
    return (
        <>
            {/* header */}
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
                                    <button onClick={() => navigate('/homeSPSO')}>
                                        <img className="rounded-full h-16 " src="/ava-test.jpg" alt="my-ava" />
                                    </button>
                                </li>
                                <li className="px-5 pt-3">
                                    <button onClick={() => navigate('/profileSPSO')}>
                                        <img src="/gear-solid.svg" className="h-10" alt="gear-solid" />
                                    </button>
                                </li>
                                <li className="px-5 pt-3">
                                    <button onClick={() => navigate('/logIn')}>
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
                  <h2>ID:2021</h2>
              </div>
          <form onSubmit={handleSubmit}>

              <label>Họ tên</label>
              <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
              />

              <label>Ngày sinh</label>
              <input
                  type="date"
                  required
                  value={DOB}
                  onChange={(e) => setDOB(e.target.value)}
              />

              <label>Điện thoại</label>
              <input
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
              />

              <label>Email</label>
              <input
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
              />

              <label>Địa chỉ</label>
              <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
              />

              <div className="LUU">
                  <button onClick={notify}>LƯU</button>
                    <ToastContainer />
              </div>

          </form>
      </section >
        </>
    );
}

export default ProfileSPSO;