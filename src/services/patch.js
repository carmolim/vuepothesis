import axios from "axios";

export default function apiPatchAnnotation(endPoint, params, token){

    axios.defaults.baseURL = 'https://hypothes.is/api'
    axios.defaults.headers = {
        'Content-Type':'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
    }

    return axios.patch(endPoint, params)
}
