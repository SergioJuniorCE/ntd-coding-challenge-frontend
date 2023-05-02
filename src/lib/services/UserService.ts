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
    function getCookie(name: string) {
      let cookieValue = null;
      if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i].trim();
          // Does this cookie string begin with the name we want?
          if (cookie.substring(0, name.length + 1) === (name + '=')) {
            cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
            break;
          }
        }
      }
      return cookieValue;
    }
    const response = await this.axios.post(`${this.baseUrl}/logout`, {
      headers: {
        "X-CSRFToken": getCookie('csrftoken')
      }
    });
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