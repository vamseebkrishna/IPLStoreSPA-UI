import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderHistoryComponent } from './pages/order-history/order-history.component';
import { AuthGuard } from '../auth/guards/auth.guard';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { OrderDetailsComponent } from './pages/order-details/order-details.component';

const routes: Routes = [
  { path: '', component: OrderHistoryComponent, canActivate: [AuthGuard]},
  { path: 'checkout', component: CheckoutComponent , canActivate: [AuthGuard]},
  { path: ':id', component: OrderDetailsComponent, }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
