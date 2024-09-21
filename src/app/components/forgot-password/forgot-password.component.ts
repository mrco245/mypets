import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, RouterLink, MatButtonModule, MatCardModule, MatInputModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css',
})
export class ResetPasswordComponent implements OnInit {
  resetForm: FormGroup;
  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    this.resetForm = new FormGroup({
      email: new FormControl('', Validators.required),
    });
  }
  sendResetLink() {
    if (this.resetForm.valid) {
      this.authService.ForgotPassword(this.resetForm.value.email);
    }
  }
}
