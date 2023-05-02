import { client } from "../client";
import { config } from "../config";

export class BaseService {
  protected baseUrl: string;
  protected axios;

  constructor(url: string) {
    this.baseUrl = config.baseUrl + url;
    this.axios = client;
  }
}