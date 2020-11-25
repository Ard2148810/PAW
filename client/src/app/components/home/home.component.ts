import { Component, OnInit } from '@angular/core';
import { BoardService } from '../../services/board.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})

export class HomeComponent implements OnInit {

  boardItems: BoardItems;

  constructor(private http: BoardService) { }

  ngOnInit(): void {
    this.http.getContent().subscribe(data => {
      this.boardItems = data;
      console.log(this.boardItems);
    });
  }

}

export interface BoardItem {
  name: string;
}

export interface BoardItems extends Array<BoardItem> {}
