import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { List } from '../entities/list';
import { Observable} from 'rxjs';

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

  updateListName(boardId: string, listId: string, listName: string): Observable<any> {
    const body = { name: listName };
    return this.http
      .put(`${environment.backendURL}/api/boards/${boardId}/lists/${listId}`, body);
  }

  updateList(boardID: string, listID: string, list: List): Observable<any> {
    return this.http.put(
      `${environment.backendURL}/api/boards/${boardID}/lists/${listID}`,
      list,
      { responseType: 'text' }
      );
  }

  deleteList(boardId: string, listId): Observable<any> {
    return this.http.delete(`${environment.backendURL}/api/boards/${boardId}/lists/${listId}`, { responseType: 'text' });
  }

}
