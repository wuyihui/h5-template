import service from './service'
import config from './config'
const { default_headers } = config

function request({ url, method, params, data, headersType, responseType, headers = {} }) {
  return service({
    url: url,
    method,
    params,
    data,
    responseType: responseType,
    headers: {
      ...headers,
      'Content-Type': headersType || default_headers
    }
  })
}

export default {
  get: options => request({ method: 'get', ...options }),
  post: options => request({ method: 'post', ...options }),
  put: options => request({ method: 'put', ...options }),
  delete: options => request({ method: 'delete', ...options })
}
