import { TokenResponse } from "../types";
import { BaseService } from "./BaseService";

export class TokenService extends BaseService {
  constructor() {
    super('/token');
  }


  public async getTokens({
    username,
    password,
  }: {
    username: string;
    password: string;
  }): Promise<TokenResponse> {
    const { data } = await this.axios.post(`${this.baseUrl}/`, { username, password });
    return data;
  }
}