import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import { useState } from "react";
const PrintUser = () => {
    const data = [
        { printdate: "10AM - 20/10/2023", printer: "P1-Lầu 6", pageselect: 33, printsize: "A4", pickupmethod: "10PM - 20/10/2023", papersize: "1-6, 8"},
    ]
    const [file, setFile] = useState();
    const [printdate, setPrintdate] = useState('10AM - 20/10/2023');
    const [printer, setPrinter] = useState('P1-Lầu 6');
    const [pageselect, setPageselect] = useState(33);
    const [printsize, setPrintsize] = useState('A4');
    const [pickupmethod, setPickupmethod] = useState('10PM - 20/10/2023');
    const [papersize, setPapersize] = useState('Tất cả');
    const [orientation, setOrientation] = useState('Hai mặt');
    const [printcolor, setPrintcolor] = useState('Có');

    function DownloadFile(e) {
        setFile(e.target.files[0]);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const blog = { printdate, printer, pageselect, printsize, pickupmethod, papersize, orientation, printcolor };
        console.log(blog);

        const formData = new FormData();
        formData.append('file', file);
        fetch(

        )
    }

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
                                    <button onClick={() => navigate('/home')}>
                                        <img className="rounded-full h-16 " src="/ava-test.jpg" alt="my-ava" />
                                    </button>
                                </li>
                                <li className="px-5 pt-3">
                                    <button onClick={() => navigate('/home')}>
                                        <img src="/gear-solid.svg" className="h-10" alt="gear-solid" />
                                    </button>
                                </li>
                                <li className="px-5 pt-3">
                                    <button onClick={() => navigate('/home')}>
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
                <input type="file" name="file" onChange={DownloadFile} />

                <label>Giờ in</label>
                <input
                    type="text"
                    required
                    value={printdate}
                    onChange={(e) => setPrintdate(e.target.value)}
                />

                <label>Máy in</label>
                <select
                    value={printer}
                    onChange={(e) => setPrinter(e.target.value)}
                >
                    <option value="P1-Lầu 6">P1-Lầu 6</option>
                </select>

                <label>Số lượng in</label>
                <input
                    type="number"
                    required
                    value={pageselect}
                    onChange={(e) => setPageselect(e.target.value)}
                />

                <label>Khổ giấy</label>
                <select
                    value={printsize}
                    onChange={(e) => setPrintsize(e.target.value)}
                >
                    <option value="A4">A4</option>
                    <option value="A3">A3</option>
                </select>

                <label>Hẹn</label>
                <input
                    type="text"
                    required
                    value={pickupmethod}
                    onChange={(e) => setPickupmethod(e.target.value)}
                />

                <label>In trang</label>
                <input
                    type="text"
                    required
                    value={papersize}
                    onChange={(e) => setPapersize(e.target.value)}
                />
                <label>In mặt</label>
                <select
                    value={orientation}
                    onChange={(e) => setOrientation(e.target.value)}
                >
                    <option value="Hai mặt">Hai mặt</option>
                    <option value="Một mặt">Một mặt</option>
                </select>

                <label>In màu</label>
                <select
                    value={printcolor}
                    onChange={(e) => setPrintcolor(e.target.value)}
                >
                    <option value="Có">Có</option>
                    <option value="Không">Không</option>
                </select>

                <div className="IN">
                    <button>IN</button>
                </div>
            </form>
            <div className="HUY">
                <button onClick={() => navigate('/home')}>HỦY</button>
            </div>
        </section>
        </>
    );
}

export default PrintUser;