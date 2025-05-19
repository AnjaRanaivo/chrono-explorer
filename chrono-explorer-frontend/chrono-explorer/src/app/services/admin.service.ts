import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Comment {
  id: number;
  content: string;
  title: string,
  created_at: string;
  username: string;
  event_id: string;
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private url = 'http://localhost:4000';

  constructor(private http: HttpClient) {}

   getPendingComments(): Observable<Comment[]> {
      return this.http.get<Comment[]>(`${this.url}/comments/pending`);
    }

    validateComment(id: number): Observable<any> {
      return this.http.put(`${this.url}/comment/${id}/validate`,{});
    }

    deleteComment(id: number): Observable<any> {
      return this.http.delete(`${this.url}/comments/${id}`);
    }
}
