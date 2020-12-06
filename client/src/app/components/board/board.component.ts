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

  boardName: string;
  userToAdd: string;
  userToDelete: string;

  constructor(private boardService: BoardService,
              private route: ActivatedRoute,
              private router: Router) {
    route.params.subscribe(params => this.id = params.id);
    this.renamingBoard = false;
    this.addingUser = false;
    this.deletingUser = false;
    this.boardName = '';
    this.userToAdd = '';
    this.userToDelete = '';
  }

  ngOnInit(): void {
    this.boardService.getBoard(this.id).subscribe(data => {
      this.data = data;
    });
  }

  getBoardDisplayName(): string {
    return this.data ? this.data.name : 'Loading...';
  }

  navigateBack(): void {
    this.router.navigate(['..'])
      .catch(console.log);
  }

  setBoardName(name: string): void {
    this.boardName = name;
  }

  setUserToAdd(name: string): void {
    this.userToAdd = name;
  }

  setUserToDelete(name: string): void {
    this.userToDelete = name;
  }

  handleRenameBoard(name: string): void { // TODO
    console.log(`New board name: ${name}`);
  }

  handleRenameBoardClick(): void {
    if (this.renamingBoard) {
      if (this.boardName.length > 0) {
        this.renameBoard(this.boardName);
        this.renamingBoard = false;
        this.boardName = '';
      }
    } else {
      this.renamingBoard = true;
    }
  }

  handleAddUserClick(): void {
    if (this.addingUser) {
      if (this.userToAdd.length > 0) {
        this.addUserToBoard(this.userToAdd);
        this.addingUser = false;
        this.userToAdd = '';
      }
    } else {
      this.addingUser = true;
    }
  }

  handleDeleteUserClick(): void {
    if (this.deletingUser) {
      if (this.userToDelete.length > 0) {
        this.deleteUserFromBoard(this.userToDelete);
        this.deletingUser = false;
        this.userToDelete = '';
      }
    } else {
      this.deletingUser = true;
    }
  }

  handleDeleteBoardClick(): void {
    this.deleteBoard();
  }

  renameBoard(newBoardName: string): void {
    // this.boardService.renameBoard(this.data._id, newBoardName)
    // this.updateBoardName()
    // TODO
  }

  addUserToBoard(username: string): void{
    // this.boardService.addUserToBoard(this.data._id, username)
    // TODO
  }

  deleteUserFromBoard(username: string): void{
    // this.boardService.deleteUserFromBoard(this.data._id, username)
    // TODO
  }

  deleteBoard(): void{
    if (!this.data._id){
      this.navigateBack();
      return;
    }

    this.boardService.deleteBoard(this.data._id)
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
