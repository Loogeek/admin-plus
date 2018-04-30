import { message } from 'antd'
import axios from 'axios'
const defaultRequestConf = {
    timeout: 5000
}

export default (params = {}, fn = () => {}) => {
    return axios({...defaultRequestConf, ...params}).then(res => {
        const { success, code, data, mes } = res.data

        if (code === -1) {
            message.error(msg || '网络请求出错')
            console.error(err)
        }

        if (success) {
            fn(true)
            return data
        }

        throw errMsg
    })
    .catch(err => {
        fn(false)
        message.error(msg || '网络请求出错')
        console.error(err)
        throw err
    })
}

