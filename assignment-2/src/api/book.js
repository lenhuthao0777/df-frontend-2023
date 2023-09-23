const { AxiosClient } = require('./axios');

class BookService {
  static endpoint = 'book';
  static async index() {
    return await AxiosClient.get(this.endpoint).then((res) => res.data);
  }

  static async destroy(id) {
    return await AxiosClient.delete(`${this.endpoint}/${id}`);
  }

  static async store(body) {
    return await AxiosClient.post(this.endpoint, body);
  }
}

export default BookService;
