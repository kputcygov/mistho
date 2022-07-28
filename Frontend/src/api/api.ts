import { ScrapersEntity } from "../App.types";
import axios from "axios";

export class GenericApiService {
  private caller;

  constructor(private prefix: string) {
    this.caller = axios.create({
      baseURL: `http://localhost:3001/${prefix}`,
    });
  }

  public async getAll(data?: Record<any, any>) {
    return (await this.caller.get("")).data;
  }

  public async create(data?: Record<any, any>): Promise<ScrapersEntity> {
    return (await this.caller.post("", data)).data;
  }

  public async update(url: string, data?: Record<any, any>) {
    return (await this.caller.patch(url, data)).data;
  }

  public async delete(url: string): Promise<ScrapersEntity> {
    return (await this.caller.delete(url)).data;
  }
}
