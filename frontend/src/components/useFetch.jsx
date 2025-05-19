import React, {useState, useEffect} from "react";
import axios from 'axios'

const useFetch = () => {
    const [loading, setLoading] = useState(false)

    const apiRequest = async (type, url, body, params) => {
        const respone = await axios(type, url, )
    }
}

export {apiRequest, loading}

