import { ApiService } from '@/lib/axios'

class Book {
  static url = 'book'

  static book(params: { limit?: number; page?: number }) {
    return ApiService.get(`${this.url}`, { params: { ...params } }).then(
      (res) => res.data,
    )
  }

  // static signUp(body: SignUp) {
  //   return ApiService.post(`/${this.url}/sign-up`, body).then((res) => res.data)
  // }
}

export default Book
