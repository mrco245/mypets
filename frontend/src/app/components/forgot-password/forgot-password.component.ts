import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { StorageService } from '../../services/storage.service';
import bcrypt from 'bcryptjs'

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    RouterLink,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
  ],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css',
})
export class ResetPasswordComponent implements OnInit {
  resetForm: FormGroup;
  isPasswordReset = false;
  isResetFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router, private storageService: StorageService) {}
  ngOnInit(): void {
    this.resetForm = new FormGroup({
      email: new FormControl('', Validators.email),
      newPassword: new FormControl('', Validators.required),
    });
  }
  signout() {
    this.storageService.clean();
    this.router.navigate(['sign-in']);
  }
  async resetPassword() {
    if (this.resetForm.valid) {
      const hashedPassword = await bcrypt.hash(this.resetForm.value.newPassword, 10);

      this.authService
        .resetPassword(
          this.resetForm.value.email,
          hashedPassword
        )
        .subscribe({
          next: (data) => {
            console.log(data);
            this.isPasswordReset = true;
            this.isResetFailed = false;
          },
          error: (err) => {
            console.log(err);
            this.isPasswordReset = false;
            this.errorMessage = err.error.message;
            this.isResetFailed = true;
          },
        });
    }
  }
}
