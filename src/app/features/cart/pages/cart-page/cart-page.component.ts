import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/core/services/cart.service';
import { Cart, CartItem } from 'src/app/core/models/cart.model';
import { AuthService } from 'src/app/core/services/auth.service'; // optional, depending on your auth setup

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss'],
})
export class CartPageComponent implements OnInit {

  cart?: Cart;
  isLoading = true;

  constructor(
    private cartService: CartService,
    private authService: AuthService    // You can replace with your own userId logic
  ) {}

  ngOnInit(): void {
    const userId = this.authService.getUserId();  

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

  getTotal(item: CartItem): number {
    return item.unitPrice * item.quantity;
  }

  getCartTotal(): number {
    if (!this.cart) return 0;
    return this.cart.items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  }

  clearCart() {
    const userId = this.authService.getUserId();
    this.cartService.clearCart(userId).subscribe(() => {
      if (this.cart) this.cart.items = [];
    });
  }
}
