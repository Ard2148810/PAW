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

  boardReady: boolean;

  addingUser: boolean;
  makingPublic: boolean;
  deletingBoard: boolean;

  error: boolean;
  errorMessage: string;

  makingPublicMessage: string;
  publicLink: string;

  constructor(private boardService: BoardService,
              private route: ActivatedRoute,
              private router: Router) {
    route.params.subscribe(params => this.id = params.id);
    this.boardReady = false;
    this.addingUser = false;
    this.makingPublic = false;
    this.deletingBoard = false;
    this.error = false;
  }

  ngOnInit(): void {
    this.boardService.getBoard(this.id).subscribe(data => {
      this.data = data;
      this.boardReady = true;

      if (!this.data.isPublic){
        this.setPrivate();
      }
      else{
        this.setPublic();
      }

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

  toggleAddingUserModal(): void{
    this.addingUser = !this.addingUser;
  }

  toggleMakingPublicModal(): void{
    this.makingPublic = !this.makingPublic;
  }

  toggleDeletingBoardModal(): void{
    this.deletingBoard = !this.deletingBoard;
  }

  toggleErrorModal(): void{
    this.error = !this.error;
  }

  handleRenameBoard(name: string): void {
    this.boardService.updateBoard(this.data.id, name, this.data.description, this.data.isPublic).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(error);
        // this.displayError(error);
      });
  }

  addUserToBoard(username: string): void{
    this.boardService.addUserToBoard(this.data.id, username)
    .subscribe(
      response => {
        console.log(response);
        this.data.teamMembers = response;
      },
      error => {
        this.displayError(error);
      });

    this.addingUser = false;
  }

  deleteUserFromBoard(username: string): void{
    this.boardService.deleteUserFromBoard(this.data.id, username)
    .subscribe(
      response => {
        console.log(response);
        this.data.teamMembers = response;
      },
      error => {
        this.displayError(error);
      });
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
          this.displayError(error);
        });

    this.boardService.refreshBoards();
    this.navigateBack();
  }

  displayError(message: string): void{
    this.errorMessage = 'ERROR: ' + message;
    console.log(this.errorMessage);
    this.error = true;
  }

  setPublic(): any{
    this.data.isPublic = true;
    this.makingPublicMessage = 'THIS BOARD IS PUBLIC';
    this.getPublicLink();
  }

  setPrivate(): any{
    this.data.isPublic = false;
    this.makingPublicMessage = 'ARE YOU SURE YOU WANT TO MAKE THIS BOARD PUBLIC?';
    this.publicLink = 'None';
  }

  makePublic(): void{
    this.boardService.updateBoard(this.data.id, this.data.name, this.data.description, true).subscribe(
      response => {
        console.log(response);
      },
      error => {
        // this.displayError(error);
        if (error === 'OK'){
          this.setPublic();
        }
      });
  }

  getPublicLink(): any {
    this.boardService.getPublicLink(this.id).subscribe(
      response => {
        this.publicLink = 'https://' + response;
      },
      error => {
        console.log(error);
        this.publicLink = error;
      }
      );
  }

}
