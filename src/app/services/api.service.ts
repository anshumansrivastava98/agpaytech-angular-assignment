import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  apiBase = 'https://630369f20de3cd918b34e39e.mockapi.io/';
  stats = 'transactionstats';
  users = 'users';

  constructor(private http: HttpClient) {}

  getStatsData() {
    return this.http.get(`${this.apiBase}${this.stats}`);
  }

  getUsersData() {
    return this.http.get(`${this.apiBase}${this.users}`);
  }
}
