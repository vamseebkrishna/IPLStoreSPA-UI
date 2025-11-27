import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class TokenService {
  getToken() { return localStorage.getItem('token'); }
  setToken(token: string) { localStorage.setItem('token', token); }
  clear() { localStorage.removeItem('token'); }
}
