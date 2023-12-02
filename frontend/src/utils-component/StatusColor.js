import React from "react";

export const StatusColor = (status) => {
    if (status === "Đã huỷ") {
        return (
            <div className="text-[#FE1E00]">{status}</div>
        )
    }
    else if (status === "Chờ in") {
        return (
            <div className="text-neutral-600">{status}</div>
        )
    }
    else if (status === "Đang in") {
        return (
            <div className="text-[#ED9005]">{status}</div>
        )
    }
    else if (status === "Hoàn tất in") {
        return (
            <div className="text-[#06abfe]">{status}</div>
        )
    }
    else if (status === "Hoàn thành") {
        return (
            <div className="text-[#12E500]">{status}</div>
        )
    }
}