import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FoundboxService {
  baseUrl = 'http://127.0.0.1:8000/v1/api';

  constructor(
    private httpClient: HttpClient
  ) {
  }

  postLogin(data: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/token/`, data);
  }

  getFinanceData(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/financial_data/`);
  }

  postFinancialData(data: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/financial_data/`, data);
  }

  deleteFinanceData(id: number): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}/financial_data/${id}/`);
  }

  putFinancialData(id: number, data: any): Observable<any> {
    return this.httpClient.put(`${this.baseUrl}/financial_data/${id}/`, data);
  }

  postRegister(data: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/register/`, data);
  }
}
