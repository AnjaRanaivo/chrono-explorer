import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isLogged = false;
  isAdmin = false;

  constructor(private router: Router,private authService: AuthService) {}

  ngOnInit() {
    this.isLogged = this.authService.isLoggedIn();
    this.isAdmin = this.authService.isAdmin();
  }

  logout() {
    localStorage.removeItem('token');
    this.isLogged = false;
    this.router.navigate(['/']); 
  }

}
