import axios from 'axios';

export const httpClientPlugin = {
  get: async (url: string) => {
    const { data } = await axios.get(url);
    return data;
  },
  post: (url: string, body: any) => {},
  put: (url: string, body: any) => {},
  delete: (url: string) => {},
};
