import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs';
import { Board } from '../entities/board';

@Injectable({
  providedIn: 'root'
})

export class BoardService {

  private readonly boards: BehaviorSubject<Array<Board>>;

  constructor(private http: HttpClient) {
    this.boards = new BehaviorSubject<Array<Board>>([]);
  }

  public getBoardsObservable(): BehaviorSubject<Array<Board>> {
    return this.boards;
  }

  public getBoardsValue(): Array<Board> {
    return this.boards.value;
  }

  refreshBoards(): any {
    return this.http.get<Board[]>(`${environment.backendURL}/api/boards`).subscribe(data => {
      this.boards.next(data);
      console.log(this.boards.value);
    });
  }

  createBoard(name: string, description: string): any {
    const body = {
      name,
      description
    };
    return this.http.post(`${environment.backendURL}/api/boards`, body);
  }

  getBoard(id: string): any {
    return this.http.get(`${environment.backendURL}/api/boards/${id}`);
  }

  async getPublicBoardHash(id: string): Promise<string> {
    return this.http.get(`${environment.backendURL}/api/boards/${id}/link`, { responseType: 'text'}).toPromise();
  }

  getPublicBoard(hash: string): any{
    return this.http.get(`${environment.backendURL}/api/boards/${hash}/public`);
  }

  updateBoard(id: string, name: string, description: string, isPublic: boolean): any {
    const body = {
      name,
      description,
      isPublic
    };
    return this.http.put(`${environment.backendURL}/api/boards/${id}`, body, { responseType: 'text'});
  }

  async updateBoardAsync(id: string, name: string, description: string, isPublic: boolean): Promise<any> {
    const body = {
      name,
      description,
      isPublic
    };
    return this.http.put(`${environment.backendURL}/api/boards/${id}`, body, { responseType: 'text'}).toPromise();
  }

  addUserToBoard(id: string, username: string): any {
    const body = {
      username
    };
    return this.http.put(`${environment.backendURL}/api/boards/${id}/assignment`, body);
  }

  deleteUserFromBoard(id: string, username: string): any {
    const body = {
      username
    };
    // return this.http.delete(`${environment.backendURL}/api/boards/${id}/assignment`, body);
    return this.http.request('delete', `${environment.backendURL}/api/boards/${id}/assignment`, { body });
  }

  deleteBoard(id: string): any {
    return this.http.delete(`${environment.backendURL}/api/boards/${id}`);
  }
}
