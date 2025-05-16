/**
 * axios全局配置
 */
export default {
  /**
   * 接口成功返回状态码
   */
  result_code: 0,

  /*
    登录过期返回码
  */

  expire_code: 'B000001',

  /**
   * 接口请求超时时间
   */
  request_timeout: 50000,

  /**
   * 默认接口请求类型
   * 可选值：application/x-www-form-urlencoded multipart/form-data
   */
  default_headers: 'application/json'
}
