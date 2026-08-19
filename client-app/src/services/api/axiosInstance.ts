import axios from 'axios'
import { API_BASE_URL, API_TIMEOUT, AUTH_TOKEN_KEY, REFRESH_TOKEN_KEY } from '@/utils/constants'

// ============================================================
// Axios Instance — Pre-configured with interceptors
// ============================================================

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
})

// REQUEST INTERCEPTOR — Attach auth token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

// RESPONSE INTERCEPTOR — Handle token refresh / errors
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    // 401 Unauthorized — Try to refresh token
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY)

      if (refreshToken) {
        try {
          const { data } = await axios.post(`${API_BASE_URL}/auth/refresh`, {
            refreshToken,
          })
          const newToken = data.data.accessToken
          localStorage.setItem(AUTH_TOKEN_KEY, newToken)
          originalRequest.headers.Authorization = `Bearer ${newToken}`
          return axiosInstance(originalRequest)
        } catch {
          // Refresh failed — clear tokens and redirect to login
          localStorage.removeItem(AUTH_TOKEN_KEY)
          localStorage.removeItem(REFRESH_TOKEN_KEY)
          window.location.href = '/login'
        }
      }
    }

    return Promise.reject(error)
  },
)

export default axiosInstance
