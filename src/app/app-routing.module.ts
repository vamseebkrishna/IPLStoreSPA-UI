import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Layout components
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

// Guards
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [

  // ============================
  // PUBLIC + MAIN APP ROUTES
  // ============================
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./features/products/products.module')
            .then(m => m.ProductsModule),
      },
      {
        path: 'cart',
        loadChildren: () =>
          import('./features/cart/cart.module')
            .then(m => m.CartModule),
      },
      {
        path: 'orders',
        loadChildren: () =>
          import('./features/orders/orders.module')
            .then(m => m.OrdersModule),
        canActivate: [AuthGuard]   // <-- protected
      }
    ],
  },

  // ============================
  // AUTH ROUTES (LOGIN/REGISTER)
  // ============================
  {
    path: 'auth',
    component: AuthLayoutComponent,
    loadChildren: () =>
      import('./features/auth/auth.module')
        .then(m => m.AuthModule),
  },

  { path: 'auth', loadChildren: () => import('./features/auth/features/auth/auth.module').then(m => m.AuthModule) },

  // ============================
  // WILDCARD — 404 REDIRECT
  // ============================
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
