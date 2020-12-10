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
    this.boardService.createBoard(name, '').subscribe(data => {
      this.updateBoardList();
    });
  }

  toggleCreatingBoard(): void {
    this.creatingBoard = !this.creatingBoard;
  }

  setBoardName(event: KeyboardEvent): void {
    this.boardName = (event.target as HTMLInputElement).value;
  }

  handleSubmitCreateBoard(): void {
    this.toggleCreatingBoard();
    this.createBoard(this.boardName);
  }
}
