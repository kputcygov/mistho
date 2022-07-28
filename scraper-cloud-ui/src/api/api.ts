import { ScrapersEntity } from "../App.types";

export class ScrapersService {
  prefix: string = "scrapers";

  constructor(private apiUrl: string = "http://localhost:8080") {
  }

  public getAll(data?: Record<any, any>): Promise<ScrapersEntity[]> {
    return this.makeRequest("", "get", data);
  }

  public create(data?: Record<any, any>): Promise<ScrapersEntity> {
    return this.makeRequest("", "post", data);
  }

  public update(url: string, data?: Record<any, any>): Promise<ScrapersEntity> {
    return this.makeRequest(url, "put", data);
  }

  public delete(url: string): Promise<ScrapersEntity> {
    return this.makeRequest(url, "delete");
  }

  private makeRequest<T>(url: string, type: string = "get", data?: Record<string, any>): Promise<T> {
    const fullURL = `${this.apiUrl}/${this.prefix}/${url}`;
    return fetch(fullURL, {
      mode: "cors",
      method: type,
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    }).then((response) => response.json());
  }
}
