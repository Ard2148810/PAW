import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BoardService } from '../../services/board.service';
import { Board } from '../../entities/board';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.sass']
})

export class BoardComponent implements OnInit {
  id: string;
  data: Board;

  renamingBoard: boolean;
  addingUser: boolean;
  deletingUser: boolean;
  deletingBoard: boolean;

  constructor(private boardService: BoardService,
              private route: ActivatedRoute,
              private router: Router) {
    route.params.subscribe(params => this.id = params.id);
    this.renamingBoard = false;
    this.addingUser = false;
    this.deletingUser = false;
    this.deletingBoard = false;
  }

  ngOnInit(): void {
    this.boardService.getBoard(this.id).subscribe(data => {
      this.data = data;
      console.log(this.data);
    });
  }

  getBoardDisplayName(): string {
    return this.data ? this.data.name : 'Loading...';
  }

  navigateBack(): void {
    this.router.navigate(['..'])
      .catch(console.log);
  }

  handleRenameBoard(name: string): void { // TODO
    console.log(`New board name: ${name}`);
  }

  toggleDeletingBoardModal(): void{
    this.deletingBoard = !this.deletingBoard;
  }

  toggleRenamingBoardModal(): void{
    this.renamingBoard = !this.renamingBoard;
  }

  toggleAddingUserModal(): void{
    this.addingUser = !this.addingUser;
  }

  toggleDeletingUserModal(): void{
    this.deletingUser = !this.deletingUser;
  }

  renameBoard(newBoardName: string): void {
    // this.boardService.renameBoard(this.data._id, newBoardName)
    // this.updateBoardName()
    // TODO
    this.renamingBoard = false;
  }

  addUserToBoard(username: string): void{
    this.boardService.addUserToBoard(this.data.id, username)
    .subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log('ERROR', error);
      });

    this.addingUser = false;
  }

  deleteUserFromBoard(username: string): void{
    this.boardService.deleteUserFromBoard(this.data.id, username)
    .subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log('ERROR', error);
      });
    this.deletingUser = false;
  }

  deleteBoard(): void{
    if (!this.data.id){
      this.navigateBack();
      return;
    }

    this.boardService.deleteBoard(this.data.id)
      .pipe(first())
      .subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.log(error);
        });

    this.boardService.refreshBoards();
    this.navigateBack();
  }

}
