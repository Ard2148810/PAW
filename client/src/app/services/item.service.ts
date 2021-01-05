import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Checklist} from '../entities/checklist';
import {Item} from '../entities/item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private http: HttpClient) { }

  addItem(boardID: string, listID: string, cardID: string, description: string): Observable<any>{
    const body = {description};
    console.log(body);
    return this.http.post(`${environment.backendURL}/api/boards/${boardID}/lists/${listID}/cards/${cardID}/checklists`, body);
  }

  getChecklistItems(boardID: string, listID: string, cardID: string, checklistID): Observable<any>{
    return this.http.get(`${environment.backendURL}/api/boards/${boardID}/lists/${listID}/cards/${cardID}/checklists/${checklistID}`);
  }

  updateItem(boardID: string, listID: string, cardID: string, checklistID: string, itemID: string, item: Item): Observable<any>{
    return this.http.post(`${environment.backendURL}/api/boards/${boardID}/lists/${listID}/cards/${cardID}/checklists/${checklistID}/item/${itemID}`,
      item);
  }

  deleteItem(boardID: string, listID: string, cardID: string, checklistID: string, itemID: string): Observable<any>{
    return this.http.delete(`${environment.backendURL}/api/boards/${boardID}/lists/${listID}/cards/${cardID}/checklists/${checklistID}/item/${itemID}`);
  }
}
