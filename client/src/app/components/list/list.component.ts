import { Component, Input, OnInit, Output } from '@angular/core';
import { Card } from '../../entities/card';
import { EventEmitter } from '@angular/core';
import {ListService} from '../../services/list.service';
import {ActivatedRoute} from '@angular/router';

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
  @Output() listAdded = new EventEmitter();
  @Output() contentUpdated = new EventEmitter();

  ownerBoardId: string;

  constructor(private listService: ListService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.ownerBoardId = params.id;
    });
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

  handleListAdded(listName: string): void {
    this.listAdded.emit({ listName });
  }

  handleListRenamed(newName: string): void {
    this.listService.updateList(this.ownerBoardId, this.id, newName).subscribe(data => {
      this.handleContentUpdated();
    }, error => {
      if (error === 'OK') {
        this.handleContentUpdated();
      }
    });
  }

  handleContentUpdated(): void {
    this.contentUpdated.emit();
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

export interface ListAddedEvent {
  listName: string;
}
