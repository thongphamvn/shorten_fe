import axios from 'axios'

const serverUrl = import.meta.env.VITE_API_SERVER_URL
const api = axios.create({
  baseURL: serverUrl,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

class AuthInterceptor {
  private getToken: () => Promise<string> = () => Promise.resolve('')

  setAuthGetter(getToken: () => Promise<string>) {
    this.getToken = getToken
  }

  intercept = async (config: any) => {
    if (!this.getToken) {
      return config
    }

    try {
      const token = await this.getToken()
      config.headers['Authorization'] = `Bearer ${token}`
    } catch (e) {
      console.log(e)
    }
    return config
  }
}

export const authInterceptor = new AuthInterceptor()
api.interceptors.request.use(authInterceptor.intercept)

export default api
