import { Component, OnInit } from '@angular/core';
import {Board} from '../../entities/board';
import {BoardService} from '../../services/board.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-public-board',
  templateUrl: './public-board.component.html',
  styleUrls: ['./public-board.component.sass']
})
export class PublicBoardComponent implements OnInit {

  id: string;
  id2: string;
  data: Board;


  boardReady: boolean;

  error: boolean;
  errorMessage: string;

  constructor(private boardService: BoardService,
              private route: ActivatedRoute,
              private router: Router) {
    route.params.subscribe(params => this.id = params.id);
    route.params.subscribe(params => this.id2 = params.id2);
    this.boardReady = false;
    this.error = false;
  }

  ngOnInit(): void {
    const hash = this.id + '/' + this.id2;
    // const hash = this.id2;

    console.log(hash);

    this.boardService.getPublicBoard(hash)
      .subscribe(
        response => {
          this.data = response;
          this.boardReady = true;
          console.log(this.data);
        },
        error => {
          console.log(error);
          // this.displayError(error);
        });
  }

  getBoardDisplayName(): string {
    return this.data ? this.data.name : 'Loading...';
  }

  navigateBack(): void {
    this.router.navigate(['..'])
      .catch(console.log);
  }

  toggleErrorModal(): void{
    this.error = !this.error;
  }

  displayError(message: string): void{
    this.errorMessage = 'ERROR: ' + message;
    console.log(this.errorMessage);
    this.error = true;
  }

}
