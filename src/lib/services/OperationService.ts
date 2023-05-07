import { BaseService } from "./BaseService";


export class OperationService extends BaseService {
  constructor() {
    super('/operations');
  }

  public async calculate(operation: string) {
    const response = await this.axios.post(`${this.baseUrl}/calculate`, {
      equation: operation
    }, {
      headers: {
        Authorization: `Bearer ${this.getToken()}`
      }
    });
    return response.data;
  }

  public async getRandomString() {
    const response = await this.axios.get(`${this.baseUrl}/get_random_string`, {
      headers: {
        Authorization: `Bearer ${this.getToken()}`
      }
    });
    return await response.data
  }
}