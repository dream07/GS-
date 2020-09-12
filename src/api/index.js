// import Vue from 'vue'
import axios from 'axios'
import router from "../router/index"
import Cookies from 'js-cookie'
import Qs from 'qs'
import Vue from 'vue';
//2.新创建一个vue实例
let v = new Vue();
//3.在新的实例上使用组件


let http = axios.create({
  baseURL: 'https://total.gsjyvip.com',
  withCredentials: false,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
  },
  transformRequest: [function (data) {
    data = Qs.stringify(data)  //序列化参数
    return data
  }]
});
var oneLoginout = false
http.interceptors.response.use(response => {

  // console.log(response)

  if (response.data.code !== -2) {
    return response.data
    // 拦截octet-stream 或 vnd.ms-excel 或 vnd.openxmlformats-officedocument.spreadsheetml.sheet 文件流并处理

  } else {
    console.log('登录过期');
    if (!oneLoginout) {
      oneLoginout = true
      v.$alert('登录已过期，请重新登录', '提示', {
        // confirmButtonText: '确定',
        callback: action => {
          Cookies.remove('Admin-Token')
          router.push({ path: '/login' })

        }
      });
    }





  }

})





function apiAxios(method, url, params, response) {
  http({
    method: method,
    url: url,
    data: method === 'POST' || method === 'PUT' ? params : null,
    params: method === 'GET' || method === 'DELETE' ? params : null,
  }).then(function (res) {
    response(res);
  }).catch(function (err) {
    response(err);
  })
}

export default {
  get: function (url, params, response) {
    return apiAxios('GET', url, params, response)
  },
  post: function (url, params, response) {
    return apiAxios('POST', url, params, response)
  },
  put: function (url, params, response) {
    return apiAxios('PUT', url, params, response)
  },
  delete: function (url, params, response) {
    return apiAxios('DELETE', url, params, response)
  }
}