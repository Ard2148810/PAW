import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BoardService} from '../../services/board.service';
import {BoardItem} from '../home/home.component';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.sass']
})

export class BoardComponent implements OnInit {
  id: string;
  data: BoardItem;
  renamingBoard: boolean;
  boardName: string;

  constructor(private boardService: BoardService,
              private route: ActivatedRoute,
              private router: Router) {
    route.params.subscribe(params => this.id = params.id);
    this.renamingBoard = false;
  }

  ngOnInit(): void {
    this.boardService.getBoard(this.id).subscribe(data => {
      this.data = data;
    });
  }

  navigateBack(): void {
    this.router.navigate(['..'])
      .catch(console.log);
  }

  updateBoard(): void {
    // this.boardService.getContent().subscribe(data => {
    //   this.boardItems = data;
    //   console.log(this.boardItems);
    // });
    // TODO
  }

  renameBoard(name: string): void {
    // this.boardService.renameBoard()
    // this.updateBoard()
    // TODO
  }

  setBoardName(name: string): void {
    this.boardName = name;
  }

  setRenamingBoard(): void {
    this.renamingBoard = true;
  }

  handleCreateBoardClick(): void {
    if (this.renamingBoard) {
      if (this.boardName.length > 0) {
        this.renameBoard(this.boardName);
      }
    } else {
      this.setRenamingBoard();
    }
  }

  deleteBoard(): void{
    this.boardService.deleteBoard(this.data._id)
      .pipe(first())
      .subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(error);
      });

    this.navigateBack();
  }

  handleDeleteBoardClick(): void{
    this.deleteBoard();
  }
}
