import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  email: string = '';
  newPassword: string = '';
  token: string = '';
  message: string = '';
  error: string = '';
  isLoading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router) {}

  ngOnInit() {
    // Read the token from query string: /auth/reset-password?token=abc123
    this.token = this.route.snapshot.queryParamMap.get('token') || '';

    if (!this.token) {
      this.error = "Invalid or expired password reset link.";
    }
  }

  onSubmit() {
    if (!this.email || !this.newPassword) {
      this.error = "All fields are required.";
      return;
    }

    this.error = '';
    this.message = '';
    this.isLoading = true;

    this.authService.resetPassword(this.email, this.token, this.newPassword)
      .subscribe({
        next: () => {
          this.message = "Password reset successful! Redirecting to login...";
          this.isLoading = false;

          setTimeout(() => {
            this.router.navigate(['/auth/login']);
          }, 1500);
        },
        error: () => {
          this.error = "Reset failed. The token may be invalid or expired.";
          this.isLoading = false;
        }
      });
  }
}
