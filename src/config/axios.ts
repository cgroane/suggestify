import { Axios } from "axios"
import { environments } from "./environments"

const axiosInstance = new Axios({
    baseURL: `${environments.serverUrl}`
})

export default axiosInstance;