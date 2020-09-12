import request from '@/utils/request'

export function loginHandel(data) {
  return request({
    url: '/admin/login/getLoginData',
    method: 'post',
    baseURL: 'https://total.gsjyvip.com',
    data
  })
}