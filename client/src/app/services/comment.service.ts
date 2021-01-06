import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {AuthenticationService} from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService) { }

  addComment(boardID: string, listID: string, cardID: string, content: string): Observable<any>{
    const date = new Date();
    const body = {
      username: this.authenticationService.getCurrentUserValue().username,
      description: content,
      date: date.toISOString()
    };
    return this.http.post(`${environment.backendURL}/api/boards/${boardID}/lists/${listID}/cards/${cardID}/comments`, body);
  }

  deleteComment(boardID: string, listID: string, cardID: string, commentID: string): Observable<any>{
    return this.http.delete(`${environment.backendURL}/api/boards/${boardID}/lists/${listID}/cards/${cardID}/comments/${commentID}`,
      { responseType: 'text' });
  }
}
