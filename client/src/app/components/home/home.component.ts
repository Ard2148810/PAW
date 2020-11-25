import { Component, OnInit } from '@angular/core';
import { BoardService } from '../../services/board.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})

export class HomeComponent implements OnInit {

  boardItems: BoardItems;
  creatingBoard: boolean;
  boardName: string;

  constructor(private http: BoardService) {
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
}

export interface BoardItems extends Array<BoardItem> {}
