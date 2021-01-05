import { Injectable } from '@angular/core';
import {Label} from '../entities/label';
import {Observable} from 'rxjs';
import {Card} from '../entities/card';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LabelService {

  activeBoardID: string;
  labelsData: Label[];

  constructor(private http: HttpClient) { }

  newBoardActivated(boardId: string, labelData: Label[]): void {  // Called whenever a board is activated (on init)
    this.activeBoardID = boardId;
    this.labelsData = labelData;
  }

  getLabelDataById(labelId: string): Label {
    return this.labelsData.find(label => label.id === labelId);
  }

  addLabel(boardID: string, labelName: string, labelColor: string): Observable<any>{
    const body = {
      name: labelName,
      color: labelColor
    };
    return this.http.post(`${environment.backendURL}/api/boards/{board}/labels`, body);
  }

  updateLabel(boardID: string, labelID: string, label: Label): Observable<any>{
    return this.http.put(`${environment.backendURL}/api/boards/${boardID}/labels/${labelID}`, label);
  }

  getBoardLabels(boardID: string): Observable<any>{
    return this.http.get(`${environment.backendURL}/api/boards/${boardID}/labels`);
  }

  getLabel(boardID: string, labelID: string): Observable<any>{
    return this.http.get(`${environment.backendURL}/api/boards/${boardID}/labels/${labelID}`);
  }

  deleteLabel(boardID: string, labelID: string): Observable<any>{
    return this.http.delete(`${environment.backendURL}/api/boards/${boardID}/labels/${labelID}`);
  }
}
