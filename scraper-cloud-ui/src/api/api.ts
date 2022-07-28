// export const Api = (
//   url: string,
//   type: string,
//   data: Record<string, any>,
//   success: Function
// ) => {
//   fetch(url, {
//     method: type,
//     body: JSON.stringify(data),
//     headers: {
//       "Content-Type": "application/json",
//     },
//   })
//     .then((response) => success(response))
//     .catch((e) => console.error(e));
// };

import {ScrapersEntity} from "../App.types";

export class ScrapersService {
    prefix: string = 'scrapers';

    constructor(private apiUrl: string = 'localhost:8080') {
    }

    public getAll(url: string, data?: Record<any, any>): Promise<ScrapersEntity[]> {
        return this.makeRequest(url, 'get', data);
    }

    public create(url: string, data?: Record<any, any>): Promise<ScrapersEntity> {
        return this.makeRequest(url, 'post', data);
    }

    public update(url: string, data?: Record<any, any>): Promise<ScrapersEntity> {
        return this.makeRequest(url, 'put', data);
    }

    public delete(url: string, data?: Record<any, any>): Promise<ScrapersEntity> {
        return this.makeRequest(url, 'delete', data);
    }

    private makeRequest<T>(url: string, type: string = 'get', data?: Record<string, any>): Promise<T> {
        const fullURL = `${this.apiUrl}/${this.prefix}/${url}`;
        return fetch(fullURL, {
            method: type,
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        }).then((response) => response.json());
    }
}