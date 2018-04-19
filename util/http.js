const axios = require('axios')
//设置默认请求头
axios.defaults.headers = {
  "Content-Type": "application/x-www-form-urlencoded"
}
// 发送请求前处理request的数据
// axios.defaults.transformRequest = [function(data) {
//   let newData = ''
//   for (let k in data) {
//     newData += encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) + '&'
//   }
//   return newData
// }]
// 带cookie请求
axios.defaults.withCredentials = true
axios.defaults.timeout = 5000

//get请求
function get(url, params) {
  return axios.get(url, { params: params })
}
//post请求
function post(url, params) {
  return axios.post(url, params)
}

module.exports = { get, post }