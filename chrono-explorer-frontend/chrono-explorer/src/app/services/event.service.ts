import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

export interface Evenement {
  id: number;
  titre: string;
  description: string;
  date: string;
  lieu: string;
  theme: string;
  civilisation: string;
  periode: number;
  image?: string;
}

export interface Comment {
  id: number;
  content: string;
  created_at: string;
  username: string;
}

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private eventUrl = 'http://localhost:4000/events';
  private mediaUrl = 'http://localhost:4001/media';

  constructor(private http: HttpClient) {}

  getEvents(): Observable<Evenement[]> {
    return this.http.get<Evenement[]>(this.eventUrl);
  }

  getFavEvents(): Observable<Evenement[]> {
    const token = localStorage.getItem('token');
    let id = 0;
    if (token) {
      const decoded: any = jwtDecode(token);
      id = decoded.id;
    }
    return this.http.get<Evenement[]>(`${this.eventUrl}/fav/${id}`);
  }

  getEventImage(eventId: number): Observable<{ url: string }> {
    return this.http.get<{ url: string }>(`${this.mediaUrl}/image/${eventId}`);
  }

  getEventById(id: number): Observable<Evenement> {
    return this.http.get<Evenement>(`${this.eventUrl}/${id}`);
  }

  getEventComments(eventId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.eventUrl}/comments/${eventId}`);
  }

  postComment(comment: { content: string; user_id: number; event_id: number }) {
    return this.http.post(`${this.eventUrl}/comments`, comment);
  }

  
}
