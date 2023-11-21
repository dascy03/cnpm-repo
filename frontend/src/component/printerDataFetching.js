import axios from "axios";
import React, { useState, useEffect, useMemo } from "react";

const PrinterDataFetching = (props) => {
    const URL_API = props
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            const res = await axios.get(URL_API);
            setData(res.data);
            setLoading(false);
        };
        fetchUsers();
    }, []);
    return { data, loading };
}

export default PrinterDataFetching;