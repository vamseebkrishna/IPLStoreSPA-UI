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
  message = '';
  error = '';
  confirmPassword: string = '';


  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onRegister() {
    this.authService.register(this.email, this.password).subscribe({
      next: () => {
        this.message = 'Registration successful! Redirecting...';

        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1500);
      },
      error: (err) => {
        this.error = 'Registration failed';
      }
    });
  }
}
