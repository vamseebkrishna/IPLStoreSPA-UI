import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/app/core/services/order.service';
import { Order } from 'src/app/core/models/order.model';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {

  order?: Order;
  isLoading = true;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.orderService.getOrderById(id).subscribe({
      next: (data) => {
        this.order = data;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Order not found';
        this.isLoading = false;
      },
    });
  }

  getLineTotal(item: any): number {
    return item.unitPrice * item.quantity;
  }

  getOrderTotal(): number {
    if (!this.order) return 0;
    return this.order.items.reduce(
      (sum, item) => sum + item.unitPrice * item.quantity,
      0
    );
  }
}
