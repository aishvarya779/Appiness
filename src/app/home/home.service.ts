import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  constructor(private _http: HttpClient) {}

  getAllUser() {
    return this._http.get(`/users`);
  }
}
