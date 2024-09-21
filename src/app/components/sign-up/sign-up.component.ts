import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, RouterLink, MatButtonModule, MatCardModule, MatInputModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent implements OnInit {
  signupForm: FormGroup;
  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    this.createForm();
  }
  createForm() {
    this.signupForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
      displayName: new FormControl('', Validators.required),
    });
  }
  signup() {
    if (this.signupForm.valid) {
      this.authService.SignUp(
        this.signupForm.value.email,
        this.signupForm.value.password
      );
    }
  }
}
