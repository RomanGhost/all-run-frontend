import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserRegistrationInfo } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private apiUrl = 'https://api.avrun.sport/register'; // Replace with actual backend URL

  constructor(private http: HttpClient) {}

  registerUser(userData: UserRegistrationInfo): Observable<any> {
    return this.http.post<any>(this.apiUrl, userData);
  }
}
