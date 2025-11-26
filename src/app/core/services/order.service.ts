import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../models/order.model';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class OrderService {

  private baseUrl = environment.apiUrl + '/orders';

  constructor(private http: HttpClient) {}

  getUserOrders(userId: string): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.baseUrl}/user/${userId}`);
  }

  getOrderById(orderId: number): Observable<Order> {
  return this.http.get<Order>(`${this.baseUrl}/${orderId}`);
 }

 placeOrder(payload: any) {
  return this.http.post(`${this.baseUrl}/create`, payload);
 }


}
