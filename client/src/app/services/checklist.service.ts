import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Checklist} from '../entities/checklist';

@Injectable({
  providedIn: 'root'
})
export class ChecklistService {

  constructor(private http: HttpClient) { }

  addChecklist(boardID: string, listID: string, cardID: string, checklistDescription: string): Observable<any>{
    const body = {description: checklistDescription};
    return this.http.post(`${environment.backendURL}/api/boards/${boardID}/lists/${listID}/cards/${cardID}/checklists`, body);
  }

  getCardChecklists(boardID: string, listID: string, cardID: string): Observable<any>{
    return this.http.get(`${environment.backendURL}/api/boards/${boardID}/lists/${listID}/cards/${cardID}/checklists`);
  }

  updateChecklist(boardID: string, listID: string, cardID: string, checklistID: string, checklist: Checklist): Observable<any>{
    return this.http.post(`${environment.backendURL}/api/boards/${boardID}/lists/${listID}/cards/${cardID}/checklists/${checklistID}`,
      checklist);
  }

  updateChecklistDescription(boardID: string,
                             listID: string, cardID: string, checklistID: string, checklistDescription: string): Observable<any>{
    const body = {description: checklistDescription};
    return this.http.post(`${environment.backendURL}/api/boards/${boardID}/lists/${listID}/cards/${cardID}/checklists/${checklistID}`,
      body);
  }

  deleteChecklist(boardID: string, listID: string, cardID: string, checklistID: string): Observable<any>{
    return this.http.delete(`${environment.backendURL}/api/boards/${boardID}/lists/${listID}/cards/${cardID}/checklists/${checklistID}`);
  }


}
