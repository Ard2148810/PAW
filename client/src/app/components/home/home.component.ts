import { Component, OnInit } from '@angular/core';
import { BoardService } from '../../services/board.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Board } from '../../entities/board';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})

export class HomeComponent implements OnInit {

  boards: BehaviorSubject<Array<Board>>;

  creatingBoard: boolean;
  boardName: string;

  constructor(private boardService: BoardService,
              private router: Router) {
    this.creatingBoard = false;
    this.boardName = '';
  }

  ngOnInit(): void {
    this.boards = this.boardService.getBoardsObservable();
    this.updateBoardList();
  }

  updateBoardList(): void {
    this.boardService.refreshBoards();
  }

  openBoard(id: string): void {
    this.router.navigate(['board', id])
      .catch(console.log);
  }

  createBoard(name: string): void {
    this.boardService.createBoard(name).subscribe(data => {
      this.updateBoardList();
    });
  }

  handleCreateBoardClick(): void {
    if (this.creatingBoard) {
      if (this.boardName.length > 0) {
        this.createBoard(this.boardName);
        this.creatingBoard = false;
        this.boardName = '';
      }
    } else {
      this.creatingBoard = true;
    }
  }

  cancelCreateBoard(): void {
    this.creatingBoard = false;
  }

  setBoardName(name: string): void {
    this.boardName = name;
  }
}
