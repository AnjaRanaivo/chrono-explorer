import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { AdminService, Comment } from '../services/admin.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-comment',
  imports: [CommonModule,HeaderComponent, FooterComponent, FormsModule, RouterLink],
  templateUrl: './admin-comment.component.html',
  styleUrl: './admin-comment.component.css'
})
export class AdminCommentComponent {
  comments: Comment[] = [];
  error: string = '';
  
  constructor(private adminService : AdminService){};

  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    this.adminService.getPendingComments().subscribe((data) => {
      this.comments = data;
    });
  }

  valider(commentId: number) {
    this.adminService.validateComment(commentId).subscribe({
      next: () => {
        this.loadData();
      },
      error: () => this.error = 'Erreur lors de la validation.'
    });
  }

  supprimer(commentId: number) {
    this.adminService.deleteComment(commentId).subscribe({
      next: () => {
        this.loadData();
      },
      error: () => this.error = 'Erreur lors de la suppression.'
    });
  }
}
