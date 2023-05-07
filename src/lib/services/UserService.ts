import { BaseService } from "./BaseService";

export class UserService extends BaseService {

  constructor() {
    super('/users');
  }

  public async login(username: string, password: string) {
    const response = await this.axios.post(`${this.baseUrl}/login`, { username, password });
    return response.data;
  }

  public async register(username: string, password: string) {
    const response = await this.axios.post(`${this.baseUrl}/register`, { username, password });
    return response.data;
  }

  public async logout() {
    console.log(this.getToken());
    const response = await this.axios.post(`${this.baseUrl}/logout`, {
      headers: {
        Authorization: `Bearer ${this.getToken()}`
      }
    });
    return response.data;
  }

  public async resetBalance() {
    const { data } = await this.axios.post(`${this.baseUrl}/reset-balance`, {}, {
      headers: {
        Authorization: `Bearer ${this.getToken()}`
      }
    });
    return data.balance;
  }

  public async getBalance() {
    const { data } = await this.axios.get(`${this.baseUrl}/get-balance`, {
      headers: {
        Authorization: `Bearer ${this.getToken()}`
      }
    });
    return data.balance;
  }

  public async getUser() {
    const { data } = await this.axios.get(`${this.baseUrl}/user`, {
      headers: {
        Authorization: `Bearer ${this.getToken()}`
      }
    });
    return data;
  }
}