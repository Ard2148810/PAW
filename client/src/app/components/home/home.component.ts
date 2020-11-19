import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})

export class HomeComponent implements OnInit {

  content: ContentItems;

  constructor(private http: MovieService) { }

  ngOnInit(): void {
    this.http.getContent().subscribe(data => {
      this.content = data.results;
      console.log(this.content);
    });
  }

}

export interface ContentItem {
  title: string;
  episode_id: number;
  release_date: string;
}

export interface ContentItems extends Array<ContentItem> {}
