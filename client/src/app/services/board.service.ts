import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class BoardService {

  constructor(private http: HttpClient) { }

  getContent(): any {
    return this.http.get(`${environment.backendURL}/api/boards`);
  }

  createBoard(name: string): any {
    const body = {
      board: { name }
    };
    return this.http.post(`${environment.backendURL}/api/boards`, body);
  }

  getBoard(id: string): any {
    return this.http.get(`${environment.backendURL}/api/boards/${id}`);
  }

  renameBoard(id: string, name: string): any {
    // TODO
  }

  deleteBoard(id: string): any {
    return this.http.delete(`${environment.backendURL}/api/boards/${id}`);
  }
}
