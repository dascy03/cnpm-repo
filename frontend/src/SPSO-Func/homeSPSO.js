import React from "react";
import { useNavigate } from "react-router-dom";

const HomeSPSO = () => {
  const data = [
    {
      ID: 0,
      date_print: "10AM - 15/10/2023",
      date_take: "10PM - 15/10/2023",
      doc: "micro-economics.pdf",
      printer: "P1 - Lầu 6",
      method: "Tự tới lấy",
      pages: "56 trang",
      status: "Đang in",
    },
    {
      ID: 0,
      date_print: "10AM - 15/10/2023",
      date_take: "10PM - 15/10/2023",
      doc: "micro-economics.pdf",
      printer: "P1 - Lầu 6",
      method: "Tự tới lấy",
      pages: "56 trang",
      status: "Đang in",
    },
    {
      ID: 0,
      date_print: "10AM - 15/10/2023",
      date_take: "10PM - 15/10/2023",
      doc: "micro-economics.pdf",
      printer: "P1 - Lầu 6",
      method: "Tự tới lấy",
      pages: "56 trang",
      status: "Đang in",
    },
    {
      ID: 0,
      date_print: "10AM - 15/10/2023",
      date_take: "10PM - 15/10/2023",
      doc: "micro-economics.pdf",
      printer: "P1 - Lầu 6",
      method: "Tự tới lấy",
      pages: "56 trang",
      status: "Đang in",
    },
    {
      ID: 0,
      date_print: "10AM - 15/10/2023",
      date_take: "10PM - 15/10/2023",
      doc: "micro-economics.pdf",
      printer: "P1 - Lầu 6",
      method: "Tự tới lấy",
      pages: "56 trang",
      status: "Đang in",
    },
    {
      ID: 0,
      date_print: "10AM - 15/10/2023",
      date_take: "10PM - 15/10/2023",
      doc: "micro-economics.pdf",
      printer: "P1 - Lầu 6",
      method: "Tự tới lấy",
      pages: "56 trang",
      status: "Đang in",
    },
    {
      ID: 0,
      date_print: "10AM - 15/10/2023",
      date_take: "10PM - 15/10/2023",
      doc: "micro-economics.pdf",
      printer: "P1 - Lầu 6",
      method: "Tự tới lấy",
      pages: "56 trang",
      status: "Đang in",
    },
    {
      ID: 0,
      date_print: "10AM - 15/10/2023",
      date_take: "10PM - 15/10/2023",
      doc: "micro-economics.pdf",
      printer: "P1 - Lầu 6",
      method: "Tự tới lấy",
      pages: "56 trang",
      status: "Đang in",
    },
    {
      ID: 0,
      date_print: "10AM - 15/10/2023",
      date_take: "10PM - 15/10/2023",
      doc: "micro-economics.pdf",
      printer: "P1 - Lầu 6",
      method: "Tự tới lấy",
      pages: "56 trang",
      status: "Đang in",
    },
    {
      ID: 0,
      date_print: "10AM - 15/10/2023",
      date_take: "10PM - 15/10/2023",
      doc: "micro-economics.pdf",
      printer: "P1 - Lầu 6",
      method: "Tự tới lấy",
      pages: "56 trang",
      status: "Đang in",
    },
    {
      ID: 0,
      date_print: "10AM - 15/10/2023",
      date_take: "10PM - 15/10/2023",
      doc: "micro-economics.pdf",
      printer: "P1 - Lầu 6",
      method: "Tự tới lấy",
      pages: "56 trang",
      status: "Đang in",
    },
    {
      ID: 0,
      date_print: "10AM - 15/10/2023",
      date_take: "10PM - 15/10/2023",
      doc: "micro-economics.pdf",
      printer: "P1 - Lầu 6",
      method: "Tự tới lấy",
      pages: "56 trang",
      status: "Đang in",
    },
    {
      ID: 0,
      date_print: "10AM - 15/10/2023",
      date_take: "10PM - 15/10/2023",
      doc: "micro-economics.pdf",
      printer: "P1 - Lầu 6",
      method: "Tự tới lấy",
      pages: "56 trang",
      status: "Đang in",
    },
    {
      ID: 0,
      date_print: "10AM - 15/10/2023",
      date_take: "10PM - 15/10/2023",
      doc: "micro-economics.pdf",
      printer: "P1 - Lầu 6",
      method: "Tự tới lấy",
      pages: "56 trang",
      status: "Đang in",
    },
    {
      ID: 0,
      date_print: "10AM - 15/10/2023",
      date_take: "10PM - 15/10/2023",
      doc: "micro-economics.pdf",
      printer: "P1 - Lầu 6",
      method: "Tự tới lấy",
      pages: "56 trang",
      status: "Đang in",
    },
    {
      ID: 0,
      date_print: "10AM - 15/10/2023",
      date_take: "10PM - 15/10/2023",
      doc: "micro-economics.pdf",
      printer: "P1 - Lầu 6",
      method: "Tự tới lấy",
      pages: "56 trang",
      status: "Đang in",
    },
  ];
  const dataPrinter = [
    {
      printerID: 1,
      model: "MAXIFY GX5070",
      imgLink: null,
      type: "High Volume Document Printing",
      location: "H1 lobby",
      status: "active",
    },
    {
      printerID: 2,
      model: "MAXIFY GX5071",
      imgLink: null,
      type: "High Volume Document Printing",
      location: "H1 lobby",
      status: "active",
    },
    {
      printerID: 3,
      model: "MAXIFY GX5073",
      imgLink: null,
      type: "High Volume Document Printing",
      location: "H1 lobby",
      status: "active",
    },
    {
      printerID: 4,
      model: "MAXIFY GX5074",
      imgLink: null,
      type: "High Volume Document Printing",
      location: "H1 lobby",
      status: "active",
    },
    {
      printerID: 5,
      model: "MAXIFY GX5075",
      imgLink: null,
      type: "High Volume Document Printing",
      location: "H1 lobby",
      status: "active",
    },
    {
      printerID: 6,
      model: "MAXIFY GX5076",
      imgLink: null,
      type: "High Volume Document Printing",
      location: "H1 lobby",
      status: "active",
    },
    {
      printerID: 7,
      model: "MAXIFY GX5077",
      imgLink: null,
      type: "High Volume Document Printing",
      location: "H1 lobby",
      status: "active",
    },
    {
      printerID: 8,
      model: "MAXIFY GX5077",
      imgLink: null,
      type: "High Volume Document Printing",
      location: "H1 lobby",
      status: "active",
    },
    {
      printerID: 9,
      model: "MAXIFY GX5079",
      imgLink: null,
      type: "High Volume Document Printing",
      location: "H1 lobby",
      status: "active",
    },
    {
      printerID: 11,
      model: "Only model",
      imgLink: null,
      type: "null",
      location: "null",
      status: "null",
    },
    {
      printerID: 12,
      model: "Only model",
      imgLink: null,
      type: "",
      location: "",
      status: "",
    },
    {
      printerID: 13,
      model: "MAXIFY GX5079",
      imgLink: null,
      type: "",
      location: "H1 lobby",
      status: "active",
    },
    {
      printerID: 14,
      model: "MAXIFY GX5079",
      imgLink: null,
      type: "",
      location: "H1 lobby",
      status: "active",
    },
    {
      printerID: 15,
      model: "MAXIFY GX5079",
      imgLink: null,
      type: "",
      location: "",
      status: "active",
    },
    {
      printerID: 16,
      model: "Only model",
      imgLink: null,
      type: "Normal",
      location: "H1 lobby",
      status: "active",
    },
  ];
  const navigate = useNavigate();
  const pageShow = 8;
  return (
    <>
      {/* header */}
      <section className="App-header">
        <nav class="border-blue-200 text-lg bg-[#C4E4F3] dark:bg-blue-800 dark:border-blue-700">
          <div class="flex flex-wrap justify-between p-2">
            <div class="flex items-center space-x-0 rtl:space-x-reverse mx-5 px-4">
              <img src="/hcmut-logo.png" class="h-24" alt="HCMUT logo" />
              <span class="self-center text-[#014464] text-1xl font-semibold whitespace-nowrap dark:text-white">
                SMART PRINTING SERVICE
              </span>
            </div>
            <div class="flex items-center px-16" id="navbar-solid-bg">
              <ul class="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
                <li className="px-5">
                  <button onClick={() => navigate("/profileUser")}>
                    <img
                      className="rounded-full h-16 "
                      src="/ava-test.jpg"
                      alt="my-ava"
                    />
                  </button>
                </li>
                <li className="px-5 pt-3">
                  <button onClick={() => navigate("/")}>
                    <img
                      src="/gear-solid.svg"
                      className="h-10"
                      alt="gear-solid"
                    />
                  </button>
                </li>
                <li className="px-5 pt-3">
                  <button onClick={() => navigate("/logIn")}>
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
      {/* Body */}
      <section className="flex place-content-evenly">
        <div className="flex-initial w-4/5 ml-16 my-10 px-28  ">
          <div className="font-sans text-5xl font-bold text-[#2991C2] ">
            Chào SPSO-0, <br /> chúc một ngày tốt lành!
          </div>
          <div className="bg-[#DBF3FF] text-[#051319] font-sans text-2xl font-semibold rounded-3xl pt-6 px-10 my-14 w-full">
            Số trang còn lại:
            <div className="font-sans text-[#014464] text-8xl font-bold text-center pt-1 pb-12 ">
              {" "}
              375{" "}
            </div>
          </div>

          <div className="grid grid-cols-2 place-content-around w-full text-center justify-center">
            <div className="rounded-3xl bg-[#2991C2] mr-5 py-10 my-5 w-[275px] ">
              <button onClick={() => navigate("/printSPSO")}>
                <img
                  src="/print-solid.svg"
                  className="h-20 mx-auto"
                  alt="print"
                />
                <span className="text-white text-2xl ">In tài liệu</span>
              </button>
            </div>
            <div className="rounded-3xl bg-[#2991C2] ml-5 py-10 my-5 w-[275px]">
              <button onClick={() => navigate("/BuyPage")}>
                <img
                  src="/cart-shopping-solid.svg"
                  className="h-20 mx-auto"
                  alt="shopping"
                />
                <span className="text-white text-2xl">Mua thêm trang</span>
              </button>
            </div>
            <div className="rounded-3xl bg-[#2991C2] mr-5 py-10 my-5 w-[275px] ">
              <button onClick={() => navigate("/printerManagement")}>
                <img
                  src="/bars-progress.svg"
                  className="h-20 mx-auto"
                  alt="print"
                />
                <span className="text-white text-2xl ">Quản lý máy in</span>
              </button>
            </div>
            <div className="rounded-3xl bg-[#2991C2] ml-5 py-10 my-5 w-[275px]">
              <button onClick={() => navigate("/userManagement")}>
                <img
                  src="/user-solid.svg"
                  className="h-20 mx-auto"
                  alt="shopping"
                />
                <span className="text-white text-2xl">Quản lý người dùng</span>
              </button>
            </div>
            <div className="rounded-3xl bg-[#2991C2] mr-5 py-10 my-5 w-[275px] ">
              <button onClick={() => navigate("/queueManagement")}>
                <img
                  src="/table-column.svg"
                  className="h-20 mx-auto"
                  alt="print"
                />
                <span className="text-white text-2xl ">
                  Quản lý hàng đợi in
                </span>
              </button>
            </div>
            <div className="rounded-3xl bg-[#2991C2] ml-5 py-10 my-5 w-[275px]">
              <a href="?">
                <img
                  src="/gears-solid.svg"
                  className="h-20 mx-auto"
                  alt="shopping"
                />
                <span className="text-white text-2xl">Cài đặt chung</span>
              </a>
            </div>
          </div>
        </div>

        <div className="flex-initial w-full m-14">
          {/* first table */}
          <div className="w-full text-3xl font-semibold mb-5 mx-5">
            {" "}
            Tài liệu đã in gần đây{" "}
          </div>
          <table className="relative overflow-x-auto mx-auto text">
            <tr className="bg-[#AADEF6] ">
              <th className="px-10 py-2">Dự kiến lấy</th>
              <th className="px-10 py-2">Tài liệu</th>
              <th className="px-10 py-2">Máy in</th>
              <th className="px-6 py-2">Số trang</th>
              <th className="px-6 py-2">Trạng thái</th>
            </tr>
            {data.map((val, key) => {
              if (key > pageShow) return;
              if (key % 2 == 0) {
                return (
                  <tr className="text-center text bg-[#E8F6FD]" key={key}>
                    <td className="px-10 py-3">{val.date_take}</td>
                    <td className="px-10 py-3">{val.doc}</td>
                    <td className="px-10 py-3">{val.printer}</td>
                    <td className="px-6 py-3">{val.pages}</td>
                    <td className="px-6 py-3">{val.status}</td>
                  </tr>
                );
              } else {
                return (
                  <tr className="text-center text" key={key}>
                    <td className="px-10 py-3">{val.date_take}</td>
                    <td className="px-10 py-3">{val.doc}</td>
                    <td className="px-10 py-3">{val.printer}</td>
                    <td className="px-6 py-3">{val.pages}</td>
                    <td className="px-6 py-3">{val.status}</td>
                  </tr>
                );
              }
            })}
          </table>
          <div className="text-right text-[#114A65] font-semibold my-5 mx-5 text-xl">
            <button onClick={() => navigate("/History")}> Xem tất cả </button>
          </div>
          {/* second table */}
          <div className="w-full text-3xl font-semibold mb-5 mx-5">
            {" "}
            Báo cáo in ấn (Not this data, just test){" "}
          </div>
          <table className="relative overflow-x-auto mx-auto text">
            <tr className="bg-[#AADEF6] ">
              <th className="px-2 py-2">Mã máy in</th>
              <th className="px-10 py-2">Mẫu</th>
              <th className="px-6 py-3">Phân loại</th>
              <th className="px-6 py-2">Địa điểm</th>
              <th className="px-6 py-2">Trạng thái</th>
            </tr>
            {dataPrinter.map((val, key) => {
              if (key > pageShow) return;
              if (key % 2 == 0) {
                return (
                  <tr className="text-center text bg-[#E8F6FD]" key={key}>
                    <td className="px-2 py-3">{val.printerID}</td>
                    <td className="px-10 py-3">{val.model}</td>
                    <td className="px-6 py-3">{val.type}</td>
                    <td className="px-6 py-3">{val.location}</td>
                    <td className="px-6 py-3">{val.status}</td>
                  </tr>
                );
              } else {
                return (
                  <tr className="text-center text" key={key}>
                    <td className="px-2 py-3">{val.printerID}</td>
                    <td className="px-10 py-3">{val.model}</td>
                    <td className="px-6 py-3">{val.type}</td>
                    <td className="px-6 py-3">{val.location}</td>
                    <td className="px-6 py-3">{val.status}</td>
                  </tr>
                );
              }
            })}
          </table>
          <div className="text-right text-[#114A65] font-semibold my-5 mx-5 text-xl">
            <button onClick={() => navigate("/History")}> Xem tất cả </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomeSPSO;
