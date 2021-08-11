import axios from "axios";

export default function apiGetAnnotations(endPoint, getParams, token){

    axios.defaults.baseURL = 'https://hypothes.is/api'
    axios.defaults.headers = {
        'Content-Type':'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
    }

    return axios.get(endPoint, {    
        params: getParams,
    })
}
