import { Component } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {

  email: string = '';
  message: string = '';
  error: string = '';
  isLoading: boolean = false;

  constructor(private authService: AuthService) {}

  onSubmit() {
    this.message = '';
    this.error = '';
    this.isLoading = true;

    // If you will implement API endpoint later, call here:
    /*
    this.authService.forgotPassword(this.email).subscribe({
      next: (res) => {
        this.message = 'Password reset instructions have been sent to your email.';
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Could not send reset instructions';
        this.isLoading = false;
      }
    });
    */

    // Temporary front-end only message (until API exists)
    setTimeout(() => {
      this.message = 'If an account exists, reset instructions were sent.';
      this.isLoading = false;
    }, 1000);
  }
}
