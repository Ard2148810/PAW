import { Component, OnInit } from '@angular/core';
import { BoardService } from '../../services/board.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})

export class HomeComponent implements OnInit {

  boardItems: BoardItems;
  creatingBoard: boolean;
  boardName: string;

  constructor(private http: BoardService,
              private router: Router) {
    this.creatingBoard = false;
  }

  ngOnInit(): void {
    this.updateBoardList();
  }

  updateBoardList(): void {
    this.http.getContent().subscribe(data => {
      this.boardItems = data;
      console.log(this.boardItems);
    });
  }

  openBoard(id: string): void {
    this.router.navigate(['board', id])
      .catch(console.log);
  }

  setCreatingBoard(): void {
    this.creatingBoard = true;
  }

  createBoard(name: string): void {
    this.http.createBoard(name).subscribe(data => {
      this.updateBoardList();
    });
  }

  setBoardName(name: string): void {
    this.boardName = name;
  }

  handleCreateBoardClick(): void {
    if (this.creatingBoard) {
      if (this.boardName.length > 0) {
        this.createBoard(this.boardName);
      }
    } else {
      this.setCreatingBoard();
    }
  }
}

export interface BoardItem {
  name: string;
  _id: string;
}

export interface BoardItems extends Array<BoardItem> {}
