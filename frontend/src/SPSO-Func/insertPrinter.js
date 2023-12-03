import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import axios from "axios";

const InsertPrinter = () => {
    const cookies = new Cookies();
    const [oldData, setOldData] = useState({});
    useEffect(() => {
      (async () => {
          const res = await axios.post("http://localhost:5000/user/info",{token: cookies.get("token")})
          setOldData(res["data"]["data"])
        })()
    }, [])
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
          </>
      );
    }
    const [data,setData] = useState({
        model: "",
        location: "CS2 - Lầu 1",
    })
    
    const handleSelect = (e) => {
        setData({...data, location: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const userData = {
            model: data.model,
            location: data.location,
        }
        axios.post("http://localhost:5000/printers/", userData)
        .then(res => {
            console.log(res.data);
            alert("Thêm máy in thành công!")
            // navigate("/printerManagement")
        })
        .catch(err => {
            if (err.response.data.message === "Please send Printer model!") 
                alert("Vui lòng nhập thông tin máy in!")
            else 
                alert("Đã có lỗi xảy ra! Vui lòng thử lại sau!")
            console.log(err.response.data.message);
        })
    }
    const showBody = () => {
        return (
            <section>
                <div class="font-bold text-4xl my-10 text-center">
                            Thêm máy in
                </div>


                <form class="flex justify-center">
                    <div className="text-xl m-2 text-[#114A65] font-medium">
                        <div className="m-7">Tên máy in</div>
                        <div className="m-7">Vị trí đặt máy in</div>
                    </div>
                    <div className="text-xl m-2">
                        <div className="m-7"><input onChange={
                            (e) => {
                                setData({...data, model: e.target.value})
                            }
                        } value={data.model} type="text" className="px-2 border w-72 border-gray-400 rounded-md" placeholder="Tên máy in - địa điểm"></input></div>
                        <div className="m-7">
                            <select onChange={handleSelect} className="px-1 border w-72 border-gray-400 rounded-md">
                                <option value="CS2 - Lầu 1">Cơ sở 2 - Lầu 1</option>
                                <option value="CS2 - Lầu 2">Cơ sở 2 - Lầu 2</option>
                                <option value="CS2 - Lầu 3">Cơ sở 2 - Lầu 3</option>
                                <option value="CS2 - Lầu 4">Cơ sở 2 - Lầu 4</option>
                                <option value="CS2 - Lầu 5">Cơ sở 2 - Lầu 5</option>
                                <option value="CS2 - Lầu 6">Cơ sở 2 - Lầu 6</option>
                            </select>
                        </div>
                    </div>
                </form>

            </section>
        );
      }
    const showEnd = () => {
        return (
            <div className="flex justify-center my-10">
                <button onClick={handleSubmit} className="bg-[#2991C2] text-white border-black mx-10 px-10 py-2 text-center rounded-2xl">OK</button>
                <button onClick={()=>navigate("/printerManagement")} className="bg-[#676767] text-white border-black mx-10 px-10 py-2 text-center rounded-2xl">Hủy</button>
            </div>
        );
    }
    return (
        <div>
            {showHeader()}
            {showBody()}
            {showEnd()}
        </div>
    );
};

export default InsertPrinter;