import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {

  email = '';
  password = '';
  confirmPassword = '';

  constructor(private auth: AuthService, private router: Router) {}

  onRegister() {
    this.auth.register({
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword
    }).subscribe(() => {
      this.router.navigate(['/auth/login']);
    });
  }
}
