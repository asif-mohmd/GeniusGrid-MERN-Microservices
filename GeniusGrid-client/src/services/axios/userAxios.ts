import axios from 'axios'
import { apiURL } from '../../utils/constants'


const instance = axios.create({
    baseURL:apiURL,
    withCredentials:true
})

export default instance