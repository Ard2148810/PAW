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

  createBoard(name: string): any {
    const body = {
      name
    };
    return this.http.post(`${environment.backendURL}/api/boards`, body);
  }

  getBoard(id: string): any {
    return this.http.get(`${environment.backendURL}/api/boards/${id}`);
  }

  renameBoard(boardId: string, newBoardName: string): any {
    // TODO
  }

  addUserToBoard(boardId: string, userId: string): any {
    // TODO
    // const body = {
    //   board: { name }
    // };
    // return this.http.post(`${environment.backendURL}/api/boards/${boardId}/assignment`, body);
  }

  deleteUserFromBoard(boardId: string, userId: string): any {
    // TODO
  }

  deleteBoard(id: string): any {
    return this.http.delete(`${environment.backendURL}/api/boards/${id}`);
  }
}
