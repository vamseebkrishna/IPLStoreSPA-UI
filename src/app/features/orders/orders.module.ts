import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrderHistoryComponent } from './pages/order-history/order-history.component';
import { OrderDetailsComponent } from './pages/order-details/order-details.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    OrderHistoryComponent,
    OrderDetailsComponent,
    CheckoutComponent
  ],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    FormsModule,            // ✅ Needed for ngModel (if used)
    ReactiveFormsModule     // ✅ Needed for formGroup + FormBuilder
  ]
})
export class OrdersModule { }
