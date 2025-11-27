import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface AuthResponse {
  token: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokenKey = 'auth_token';
  private userEmailKey = 'auth_user_email';

  private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient) {}

  // -----------------------------
  // Login
  // -----------------------------
  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${environment.apiUrl}/auth/login`, {
      email,
      password
    }).pipe(
      map((res: AuthResponse) => {
        this.storeToken(res.token);
        this.storeUserEmail(res.email);
        this.isLoggedInSubject.next(true);
        return res;
      })
    );
  }

  // -----------------------------
  // Register
  // -----------------------------
  register(email: string, password: string) {
    return this.http.post(`${environment.apiUrl}/auth/register`, {
      email,
      password
    });
  }

  // -----------------------------
  // Get Current User (Protected)
  // -----------------------------
  getCurrentUser() {
    return this.http.get(`${environment.apiUrl}/auth/me`);
  }

  // -----------------------------
  // Token Storage
  // -----------------------------
  private storeToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  private storeUserEmail(email: string) {
    localStorage.setItem(this.userEmailKey, email);
  }

  getToken() {
    return localStorage.getItem(this.tokenKey);
  }

  getUserEmail() {
    return localStorage.getItem(this.userEmailKey);
  }

  // -----------------------------
  // Logout
  // -----------------------------
  logout() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userEmailKey);
    
    this.isLoggedInSubject.next(false);
  }

  resetPassword(email: string, token: string, newPassword: string) {
  return this.http.post(`${environment.apiUrl}/auth/reset-password`, {
    email,
    token,
    newPassword
  });
}

  // -----------------------------
  // Check if token exists
  // -----------------------------
  private hasToken(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
  return !!localStorage.getItem(this.tokenKey);
  }

  getUserId(): string | null {
  return localStorage.getItem(this.userEmailKey);
  }

}
