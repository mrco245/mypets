import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { AuthService } from '../../shared/services/auth.service';


@Component({
  selector: 'app-naviagation',
  standalone: true,
  imports: [RouterLink, MatToolbarModule, MatIconModule, MatButtonModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NaviagationComponent {

  constructor(private authService: AuthService) {}
  
  signout() {
    this.authService.SignOut();
  }
}
