import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';

interface DecodedToken {
  exp: number;
  role : string;
  [key: string]: any;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authUrl = 'http://localhost:4002/auth';

  constructor(private http: HttpClient) {}

  register(user: { username: string; email: string; password: string }): Observable<any> {
    return this.http.post(`${this.authUrl}/register`, user);
  }

  login(credentials: { email: string; password: string }): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.authUrl}/login`, credentials);
  }

  updateUser(id: number, user: { username: string; email: string; password: string }): Observable<any> {
    return this.http.put(`${this.authUrl}/${id}`, user);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.authUrl}/${id}`);
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    if (!token) return false;

    try {
      const decoded: DecodedToken = jwtDecode(token);
      console.log(decoded)
      const currentTime = Math.floor(Date.now() / 1000); 
      return decoded.exp > currentTime;
    } catch (e) {
      console.error('Token invalide');
      return false;
    }
  }

  isAdmin(): boolean {
    const token = localStorage.getItem('token');
    if (!token) return false;
    console.log(token);

    try {
      const decoded: DecodedToken = jwtDecode(token);
      console.log(decoded);
      console.log(decoded.role == 'moderator');
      return decoded.role == 'moderator';
    } catch (e) {
      console.error('Token invalide');
      return false;
    }
  }
}
