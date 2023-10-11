import { ApiService } from '@/lib/axios'

interface SignUp {
  avatar?: string
  email?: string
  fullName?: string
  password?: string
}

class Auth {
  static url = 'auth'

  static login(body: { email?: string; password?: string }) {
    return ApiService.post(`/${this.url}/log-in`, body).then((res) => res.data)
  }

  static signUp(body: SignUp) {
    return ApiService.post(`/${this.url}/sign-up`, body).then((res) => res.data)
  }
}

export default Auth
