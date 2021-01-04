import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Card } from '../../entities/card';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.sass']
})
export class CardComponent implements OnInit {
  @Input() wildcard = false;
  @Output() cardAdded = new EventEmitter();
  @Input() data: Card;

  constructor() { }

  ngOnInit(): void {
  }

  handleCardAdded(name: string): void {
    this.cardAdded.emit(name);
  }
}

