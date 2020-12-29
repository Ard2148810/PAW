import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import {List} from '../entities/list';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(private http: HttpClient) { }

  addList(boardId: string, listName: string): Observable<any> {
    const body = { name: listName };
    return this.http
      .post(`${environment.backendURL}/api/boards/${boardId}/lists`, body);
  }

  sortListsByOrder(lists: List[]): List[] {
    return lists.sort(((a, b) => a.position - b.position));
  }
}
