import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  headers: {
    "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
  },//
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  // config => {
  //   // do something before request is sent
  //   if (store.getters.token) {
  //     // let each request carry token
  //     // ['X-Token'] is a custom headers key
  //     // please modify it according to the actual situation
  //     // config.headers['X-Token'] = getToken()
  //   }
  //   return config
  // },
  // error => {
  //   // do something with request error
  //   console.log(error) // for debug
  //   return Promise.reject(error)
  // }
  config => {
    // 请求前
    // console.log(config.data)
    const params = new URLSearchParams()
    for (const key in config.data) {
      if (config.data.hasOwnProperty(key)) {
        params.append(key, config.data[key])
      }
    }
    config.data = params
    return config
  },
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */

  response => {
    const res = response.data

    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 0) {
      // Message({
      //   message: res.msg || 'Error',
      //   type: 'error',
      //   duration: 5 * 1000
      // })

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // to re-login
        MessageBox.confirm('您已经登出，您可以取消停留在此页面，或再次登录', '确认退出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '返回',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      // return Promise.reject(new Error(res.msg || 'Error'))
    } else {
      // console.log(res);

    }
    return res
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
