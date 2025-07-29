import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConfig } from '../config/config';

export interface UserRegistrationInfo {
  first_name: string;
  last_name: string;
}

export interface UserID {
  id: number;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userURL = ApiConfig.apiUrl + ApiConfig.version + ApiConfig.endpoints.user;

  constructor(private http: HttpClient) {}

  registerUser(userInfo: UserRegistrationInfo): Observable<UserID> {
    return this.http.post<UserID>(`${this.userURL}/register`, userInfo);
  }
}
