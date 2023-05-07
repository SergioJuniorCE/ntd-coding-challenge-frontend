import { client } from "../client";
import { config } from "../config";
import Cookies from 'js-cookie';
export class BaseService {
  protected baseUrl: string;
  protected axios;

  constructor(url: string) {
    this.baseUrl = config.baseUrl + url;
    this.axios = client;
  }

  public getAuthHeader() {
    return {
      headers: {
        Authorization: `Bearer ${this.getToken()}`
      }
    }
  }

  public getToken() {
    return Cookies.get('_auth');
  }

  public doesTokenExist() {
    return !!this.getToken();
  }
}