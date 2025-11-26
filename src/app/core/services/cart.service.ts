import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cart } from '../models/cart.model';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class CartService {

  private baseUrl = environment.apiUrl + '/cart';

  constructor(private http: HttpClient) { }

  getCart(userId: string): Observable<Cart> {
    return this.http.get<Cart>(`${this.baseUrl}?userId=${userId}`);
  }

  addItem(payload: { userId: string; productId: number; quantity: number }) {
    return this.http.post(`${this.baseUrl}/add`, payload);
  }

  clearCart(userId: string) {
    return this.http.post(`${this.baseUrl}/clear`, { userId });
  }
}
