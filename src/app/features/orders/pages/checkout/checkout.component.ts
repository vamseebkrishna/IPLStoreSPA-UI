import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CartService } from 'src/app/core/services/cart.service';
import { OrderService } from 'src/app/core/services/order.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { Cart, CartItem } from 'src/app/core/models/cart.model';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  checkoutForm = this.fb.group({
    fullName: ['', Validators.required],
    address: ['', Validators.required],
    city: ['', Validators.required],
    postalCode: ['', Validators.required],
    phone: ['', Validators.required],
  });

  cart?: Cart;
  isLoading = true;
  orderPlaced = false;

  constructor(
    private fb: FormBuilder,
    private cartService: CartService,
    private orderService: OrderService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const userId = this.authService.getUserId();

    if (!userId) {
    console.error("User not logged in. Cannot clear cart.");
    return;
    }

    this.cartService.getCart(userId).subscribe({
      next: (data) => {
        this.cart = data;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  getTotal(item: CartItem) {
    return item.unitPrice * item.quantity;
  }

  getCartTotal(): number {
    if (!this.cart) return 0;
    return this.cart.items.reduce((s, i) => s + i.unitPrice * i.quantity, 0);
  }

  placeOrder() {
    if (this.checkoutForm.invalid || !this.cart) return;

    const payload = {
      userId: this.authService.getUserId(),
      items: this.cart.items.map(i => ({
        productId: i.productId,
        quantity: i.quantity
      }))
    };

    this.orderService.placeOrder(payload).subscribe({
      next: () => {
        this.orderPlaced = true;
        if (!payload.userId) {
        console.error("User not logged in");
        return;
      }
        this.cartService.clearCart(payload.userId).subscribe();
        setTimeout(() => this.router.navigate(['/orders']), 1500);
      }
    });
  }
}
