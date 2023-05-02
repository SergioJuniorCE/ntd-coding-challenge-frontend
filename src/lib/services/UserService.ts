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
    const response = await this.axios.post(`${this.baseUrl}/logout`);
    return response.data;
  }

  public async resetBalance() {
    const { data } = await this.axios.post(`${this.baseUrl}/reset-balance`);
    return data.balance;
  }

  public async getBalance() {
    const { data } = await this.axios.get(`${this.baseUrl}/get-balance`);
    return data.balance;
  }

  public async getUser() {
    const { data } = await this.axios.get(`${this.baseUrl}/user`);
    return data;
  }
}