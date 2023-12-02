import axios from "axios";
import { useState, useEffect } from "react";

const DataFetching = (props) => {
    const URL_API = props
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const fetchUsers = async () => {
            const res = await axios.get(URL_API);
            setData(res.data);
            setLoading(true);
        };
        fetchUsers();
    }, []);
    return { data, loading };
}

export default DataFetching;