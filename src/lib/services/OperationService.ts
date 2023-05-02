import { BaseService } from "./BaseService";


export class OperationService extends BaseService {
  constructor() {
    super('/operations');
  }

  public async calculate(operation: string) {
    const response = await this.axios.post(`${this.baseUrl}/calculate`, {
      equation: operation
    });
    return response.data;
  }

  public async getRandomString() {
    const response = await this.axios.get(`${this.baseUrl}/get_random_string`);
    return await response.data
  }
}