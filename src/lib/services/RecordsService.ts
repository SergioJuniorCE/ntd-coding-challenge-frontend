import { BaseService } from "./BaseService";

export class RecordsService extends BaseService {
  constructor() {
    super('/records');
  }

  public async getRecords(page = 1, size = 10) {

    const response = await this.axios.get(`${this.baseUrl}/?page=${page}&size=${size}`, this.getAuthHeader());
    return response.data;
  }
}