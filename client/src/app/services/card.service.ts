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
    return this.http.post(`${environment.backendURL}/api/boards/${boardId}/lists/${listId}/cards`, body);
  }

  renameCard(boardId: string, listId: string, cardName: string, card: Card): Observable<any> {
    card.name = cardName;
    return this.http.put(`${environment.backendURL}/api/boards/${boardId}/lists/${listId}/cards/${card.id}`, card);
  }

  updateCardDate(boardID: string, listID: string, cardID: string, date: Date): Observable<any>{
    const body = {date: date.toISOString()};
    return this.http.put(`${environment.backendURL}/api/boards/${boardID}/lists/${listID}/cards/${cardID}`, body);
  }

  addMemberToCard(boardID: string, listID: string, cardID: string, member: string): Observable<any>{
    const body = {members: [member]};
    return this.http.put(`${environment.backendURL}/api/boards/${boardID}/lists/${listID}/cards/${cardID}`, body);
  }

  updateCard(boardID: string, listID: string, cardID: string, card: Card): Observable<any>{
    return this.http.put(`${environment.backendURL}/api/boards/${boardID}/lists/${listID}/cards/${cardID}`, card);
  }

  deleteCard(boardID: string, listID: string, cardID: string): Observable<any>{
    return this.http.delete(`${environment.backendURL}/api/boards/${boardID}/lists/${listID}/cards/${cardID}`,
      { responseType: 'text' });
  }

  addLabelToCard(boardID: string, listID: string, cardID: string, labelID): Observable<any>{
    const body = {labelId: labelID};
    return this.http.put(`${environment.backendURL}/api/boards/${boardID}/lists/${listID}/cards/${cardID}`, body);
  }

  removeLabelFromCard(boardID: string, listID: string, cardID: string, labelID): Observable<any>{
    const body = {labelId: labelID};
    return this.http.request('delete', `${environment.backendURL}/api/boards/${boardID}/lists/${listID}/cards/${cardID}`,
      { body });
  }

}
