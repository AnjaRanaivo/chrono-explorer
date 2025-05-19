import { Component } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { HeaderComponent } from "../header/header.component";
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signin',
  imports: [CommonModule, FormsModule, FooterComponent, HeaderComponent,RouterModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {
  user = {
    username: '',
    email: '',
    password: ''
  };
  error = '';
  success = '';

  constructor(private http: HttpClient, private router: Router) {}

  register() {
    this.http.post('http://localhost:4002/auth/register', this.user).subscribe({
      next: () => {
        this.success = 'Inscription réussie';
        setTimeout(() => this.router.navigate(['/login']), 2000);
      },
      error: err => {
        this.error = 'Erreur lors de l’inscription';
        console.error(err);
      }
    });
  }
}
