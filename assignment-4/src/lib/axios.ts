import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import Cookies from 'js-cookie'
// import { showLoader } from '../features/Loading'

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SOMETHING_API_URL,
  headers: { 'X-Custom-Header': 'foobar' },
})

axiosClient.interceptors.request.use(
  (request) => {
    const userInfo = Cookies.get('userInfo') || null

    const parseUserInfo = userInfo ? JSON.parse(userInfo) : {}

    if (parseUserInfo)
      request.headers.Authorization = `Bearer ${parseUserInfo?.token}`

    return request
  },
  (err) => {
    return { status: err.request.status, request: err.request.data.errors }
  },
)

axiosClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response
  },
  async (error) => {
    if (error.response.status === 401) {
      // handle logout: clear cookies, move to login page
      await Cookies.remove('userInfo')

      const url: string = window.location.origin

      const backToLogin = () => {
        window.location.href = `${url}/login`
      }

      await backToLogin()
    }
    if (error.response.status === 500) {
      // handle notification for user server error
    }
    return Promise.reject(error)
  },
)

const ApiService = {
  get: <T>(url: string, obj?: object) => axiosClient.get<T>(url, obj),
  post: <T>(url: string, obj: object, config?: AxiosRequestConfig) =>
    axiosClient.post<T>(url, obj, config),
  patch: <T>(url: string, obj: object) => axiosClient.patch<T>(url, obj),
  put: <T>(url: string, obj: object) => axiosClient.put<T>(url, obj),
  delete: <T>(url: string, obj?: object) => axiosClient.delete<T>(url, obj),
}

export { ApiService, axiosClient }
