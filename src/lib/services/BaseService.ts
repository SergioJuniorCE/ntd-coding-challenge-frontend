import { client } from "../client";
import { config } from "../config";
import Cookies from 'js-cookie';
export class BaseService {
  protected baseUrl: string;
  protected axios;

  constructor(url: string) {
    this.baseUrl = config.baseUrl + url;
    this.axios = client;
    const auth = Cookies.get('_auth') ?? '';
    this.axios.defaults.headers.common.Authorization = `Bearer ${auth}`;
  }
}