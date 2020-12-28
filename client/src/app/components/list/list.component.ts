import { Component, Input, OnInit, Output } from '@angular/core';
import { Card } from '../../entities/card';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.sass'],
})
export class ListComponent implements OnInit {
  @Input() title: string;
  @Input() id: string;
  @Input() wildcard = false;
  @Input() cards: Card[];
  @Output() cardClicked = new EventEmitter();
  @Output() cardAdded = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  // TODO: Drag&drop
  /*drag(event: DragEvent): void {
    event.dataTransfer.setData('text', (event.target as HTMLElement).id);
  }

  allowDrop(event: DragEvent): void {
    event.preventDefault();
  }

  drop(event: DragEvent): void {
    event.preventDefault();
    const data = event.dataTransfer.getData('text');
    (event.target as HTMLElement).appendChild(document.getElementById(data));
  }*/

  handleCardClicked(cardId: string): void {
    this.cardClicked.emit({ listId: this.id, cardId });
  }

  handleCardAdded(cardName: string): void {
    this.cardAdded.emit({ listId: this.id, cardName });
  }
}

export interface CardClickedEvent {
  listId: string;
  cardId: string;
}

export interface CardAddedEvent {
  listId: string;
  cardName: string;
}
