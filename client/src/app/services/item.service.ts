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

  addItem(boardID: string, listID: string, cardID: string, checklistID: string, itemDescription: string): Observable<any>{
    const body = {description: itemDescription};
    return this.http.post(`${environment.backendURL}/api/boards/${boardID}/lists/${listID}/cards/${cardID}/checklists/${checklistID}/items`,
      body,
      { responseType: 'text' });
  }

  getChecklistItems(boardID: string, listID: string, cardID: string, checklistID): Observable<any>{
    return this.http.get(`${environment.backendURL}/api/boards/${boardID}/lists/${listID}/cards/${cardID}/checklists/${checklistID}/items`);
  }

  updateItem(boardID: string, listID: string, cardID: string, checklistID: string, itemID: string, item: Item): Observable<any>{
    return this.http.post(`${environment.backendURL}/api/boards/${boardID}/lists/${listID}/cards/${cardID}/checklists/${checklistID}/items/${itemID}`,
      item);
  }

  updateItemDescription(boardID: string,
                        listID: string, cardID: string, checklistID: string, itemID: string, itemDescription: string): Observable<any>{
    const body = {description: itemDescription};
    return this.http.post(`${environment.backendURL}/api/boards/${boardID}/lists/${listID}/cards/${cardID}/checklists/${checklistID}/items/${itemID}`,
      body);
  }

  updateItemStatus(boardID: string,
                   listID: string, cardID: string, checklistID: string, itemID: string, itemStatus: boolean): Observable<any>{
    const body = {status: itemStatus};
    return this.http.post(`${environment.backendURL}/api/boards/${boardID}/lists/${listID}/cards/${cardID}/checklists/${checklistID}/items/${itemID}`,
      body);
  }

  deleteItem(boardID: string, listID: string, cardID: string, checklistID: string, itemID: string): Observable<any>{
    return this.http.delete(`${environment.backendURL}/api/boards/${boardID}/lists/${listID}/cards/${cardID}/checklists/${checklistID}/items/${itemID}`);
  }
}
