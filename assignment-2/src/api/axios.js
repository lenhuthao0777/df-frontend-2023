import axios from 'axios';

const AxiosClient = axios.create({
  baseURL: 'https://650c088147af3fd22f66e4d6.mockapi.io/',
  headers: { 'X-Custom-Header': 'foobar' },
});

export { AxiosClient };
