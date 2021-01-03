import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Card } from '../entities/card';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(private http: HttpClient) {}

  addCard(boardId: string, listId: string, cardName: string): Observable<any> {
    const body = { name: cardName, description: '', date: '' };
    return this.http
      .post(`${environment.backendURL}/api/boards/${boardId}/lists/${listId}/cards`, body);
  }

  renameCard(boardId: string, listId: string, cardName: string, card: Card): Observable<any> {
    card.name = cardName;
    return this.http
      .put(`${environment.backendURL}/api/boards/${boardId}/lists/${listId}/cards/${card.id}`, card);
  }

}
