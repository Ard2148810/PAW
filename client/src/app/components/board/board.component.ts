import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BoardService} from '../../services/board.service';
import {BoardItem} from '../home/home.component';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.sass']
})
export class BoardComponent implements OnInit {
  id: string;
  data: BoardItem;

  constructor(private boardService: BoardService,
              private route: ActivatedRoute,
              private router: Router) {
    route.params.subscribe(params => this.id = params.id);
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
}
