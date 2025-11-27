import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/core/services/order.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { Order } from 'src/app/core/models/order.model';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss'],
})
export class OrderHistoryComponent implements OnInit {

  orders: Order[] = [];
  isLoading = true;

  constructor(
    private orderService: OrderService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const userId = this.authService.getUserId();
    if (!userId) {
    console.error("User not logged in");
    return;
    }
    this.orderService.getUserOrders(userId).subscribe({
      next: (data) => {
        this.orders = data;
        this.isLoading = false;
      },
      error: () => {
        this.orders = [];
        this.isLoading = false;
      },
    });
  }

  getOrderTotal(order: Order): number {
    return order.items.reduce(
      (sum, i) => sum + i.unitPrice * i.quantity,
      0
    );
  }
}
