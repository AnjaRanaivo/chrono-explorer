import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Comment, Evenement, EventService } from '../services/event.service';
import { AuthService } from '../services/auth.service';
import { jwtDecode } from 'jwt-decode';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-details',
  imports: [CommonModule, FormsModule, HeaderComponent, FooterComponent, RouterModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {
  event:Evenement | undefined;
  comments: Comment[] = [];
  isLogged = false;
  commentContent: string = '';
  error: string = '';
  success: string = '';
  userId: number = 0;
  
  constructor(private route: ActivatedRoute,private eventService: EventService,private router: Router,private authService: AuthService) {
    }

  ngOnInit(): void {
    this.isLogged = this.authService.isLoggedIn();
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.eventService.getEventById(id).subscribe((data) => {
      this.event = data;

      this.eventService.getEventImage(id).subscribe((image) => {
        if (this.event) {
          this.event.image = image.url;
        }
      });
    });

    this.eventService.getEventComments(id).subscribe((data) => {
      this.comments = data;
    });

    const token = localStorage.getItem('token');
    if (token) {
      const decoded: any = jwtDecode(token);
      this.userId = decoded.id;
    }
  }

  submitComment() {
    if (!this.commentContent.trim()) {
      this.error = "Le commentaire ne peut pas être vide.";
      return;
    }

    const comment = {
      content: this.commentContent,
      user_id: this.userId,
      event_id: this.event!.id
    };

    
      console.log(comment)

    this.eventService.postComment(comment).subscribe({
      next: () => {
        this.success = "Commentaire envoyé pour validation de l'administrateur.";
        this.commentContent = '';
        this.error = '';
      },
      error: () => {
        this.error = "Erreur lors de l'envoi du commentaire.";
        this.success = '';
      }
    });
  }


  /*@Input() event: {
    id: number;
    titre: string;
    date: number;
    lieu: string;
    civilisation: string;
    theme: string;
    epoque: string;
    description: string;
    image: string;
  } | null = null;*/
}
