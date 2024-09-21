import { Component, OnInit } from '@angular/core';
import { NaviagationComponent } from '../navigation/navagation.component';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { User } from '../../shared/services/user';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [NaviagationComponent, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  currentUser: User;

  constructor(private formBuilder: FormBuilder, private authService: AuthService) { }

  async ngOnInit() {

    let userData = localStorage.getItem('user');
    if(userData)
    {
      this.currentUser = JSON.parse(userData);
    }
    this.profileForm = this.formBuilder.group({
      profileImage: [this.currentUser.photoURL], // Placeholder for profile image
      name: [this.currentUser.displayName, Validators.required],
      email: [this.currentUser.email, [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    if (this.profileForm.valid) {
      // Process form data (e.g., send to backend)
      console.log(this.profileForm.value);
    } else {
      // Handle form validation errors
      console.log('Form is invalid');
    }
  }


}
