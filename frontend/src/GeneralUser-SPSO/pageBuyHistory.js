import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "../utils-component/Pagination";
import axios from "axios";
import Cookies from "universal-cookie";

const PageBuyHistory = (props) => {
  // Fetching
  const cookies = new Cookies();
  const [oldData, setOldData] = useState({});
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await axios.post("http://localhost:5000/user/info",{token: cookies.get("token")})
            setOldData(res["data"]["data"])
      await axios
        .get("http://localhost:5000/page/history", {
          headers: {
            Authorization: `Bearer ${cookies.get("token")}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          setData(res.data);
          setLoading(true);
        })
        .catch((err) => console.log(err));
    })();
  }, []);

  // Start
  const PageSize = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [currentTableData, setCurrentTableData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterData, setFilterData] = useState([]);
  useEffect(() => {
    setCurrentPage(1);
    const keys = ["purchaseID", "pageAmount", "paymentMethod", "unitPrice"];
    setFilterData(
      data.filter(
        (item) =>
          keys.some(
            (key) =>
              item[key] &&
              item[key]
                .toString()
                .toLowerCase()
                .includes(searchQuery.toLowerCase())
          ) === true
      )
    );
  }, [searchQuery, data]);
  useEffect(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    setCurrentTableData(filterData.slice(firstPageIndex, lastPageIndex));
  }, [currentPage, filterData]);

  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm("Bạn có chắc chắn muốn đăng xuất?")) {
      sessionStorage.clear();
      localStorage.clear();
      cookies.remove("token");
      cookies.remove("isLogged");
      navigate("/");
    }
  };

  const showHeader = () => {
    return (
      <section className="App-header">
        <nav class="border-blue-200 text-lg bg-[#C4E4F3] ">
          <div class="flex flex-wrap justify-between p-2">
            <div class="flex items-center space-x-0 rtl:space-x-reverse mx-5 px-4">
              <button
                onClick={() => {
                  if (sessionStorage.getItem("isSPSO") === "true") {
                    navigate("/homeSPSO");
                  } else {
                    navigate("/homeUser");
                  }
                }}
              >
                <img src="/hcmut-logo.png" class="h-24" alt="HCMUT logo" />
              </button>
              <span class="self-center text-[#014464] text-1xl font-semibold whitespace-nowrap ">
                SMART PRINTING SERVICE
              </span>
            </div>
            <div class="flex items-center px-16" id="navbar-solid-bg">
              <ul class="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
                <li className="px-5">
                  <button onClick={() => navigate("/homeUser")}>
                    <img
                      className="rounded-full h-16 "
                      src={oldData.avtLink}
                      alt="my-ava"
                    />
                  </button>
                </li>
                <li className="px-5 pt-3">
                  <button onClick={() => navigate("/SettingUser")}>
                    <img
                      src="/gear-solid.svg"
                      className="h-10"
                      alt="gear-solid"
                    />
                  </button>
                </li>
                <li className="px-5 pt-3">
                  <button onClick={handleLogout}>
                    <img
                      src="/arrow-right-from-bracket-solid.svg"
                      className="h-10"
                      alt="arrow-right-from-bracket-solid"
                    />
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </section>
    );
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  const searchBar = () => {
    return (
      <section>
        <div className="flex justify-between m-10 ">
          <div className="text-center flex w-full"></div>
          <div className="justify-self-center text-4xl font-bold text-center flex w-full justify-center">
            Lịch sử mua trang in
          </div>
          <div className="flex w-full justify-center">
            <form>
              <div class="relative">
                <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    class="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="3"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="search"
                  id="default-search"
                  class="italic block p-2 ps-10  text-smt text-black border border-black rounded-full"
                  placeholder="Tìm kiếm..."
                  onKeyDown={handleEnter}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </form>
          </div>
        </div>
      </section>
    );
  };

  const table = () => {
    return (
      <section>
        <table className="relative overflow-x-auto mx-auto text-2xl w-5/12">
          <tr className="bg-[#AADEF6]">
            <th className="">ID</th>
            <th className="">Số lượng trang</th>
            <th className="">Phương thức thanh toán</th>
            <th className="">Đơn giá</th>
            <th className="">Tổng tiền</th>
          </tr>
          {currentTableData.map((val, key) => {
            if (key % 2 === 0) {
              return (
                <tr className="text-center text-xl bg-[#E8F6FD]" key={key}>
                  <td className="h-12">{val.purchaseID}</td>
                  <td className="">{val.pageAmount}</td>
                  <td className="">{val.paymentMethod}</td>
                  <td className="">{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(val.unitPrice)}</td>
                  <td className="">{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(val.unitPrice*val.pageAmount)}</td>
                </tr>
              );
            } else {
              return (
                <tr className="text-center text-xl" key={key}>
                  <td className="h-12">{val.purchaseID}</td>
                  <td className="">{val.pageAmount}</td>
                  <td className="">{val.paymentMethod}</td>
                  <td className="">{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(val.unitPrice)}</td>
                  <td className="">{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(val.unitPrice*val.pageAmount)}</td>
                </tr>
              );
            }
          })}
        </table>
        <section>
          <Pagination
            className="pagination-bar"
            currentPage={currentPage}
            totalCount={filterData.length}
            pageSize={PageSize}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </section>
      </section>
    );
  };
  return (
    <div>
      {loading === false ? (
        <div>Loading...</div>
      ) : (
        <>
          {showHeader()}
          {searchBar()}
          {table()}
          <div className="w-full  my-10 flex justify-center">
            <button
              className=" text-center w-28 rounded-2xl h-10 text-xl bg-[#676767] text-white"
              onClick={() => {
                if (sessionStorage.getItem("isSPSO") === "true") {
                  navigate("/homeSPSO");
                } else {
                  navigate("/homeUser");
                }
              }}
            >
              TRỞ VỀ
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default PageBuyHistory;
