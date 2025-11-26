import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrderHistoryComponent } from './pages/order-history/order-history.component';
import { OrderDetailsComponent } from './pages/order-details/order-details.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';


@NgModule({
  declarations: [
    OrderHistoryComponent,
    OrderDetailsComponent,
    CheckoutComponent
  ],
  imports: [
    CommonModule,
    OrdersRoutingModule
  ]
})
export class OrdersModule { }
