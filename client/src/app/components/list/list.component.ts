import { Component, Input, OnInit, Output } from '@angular/core';
import { Card } from '../../entities/card';
import { EventEmitter } from '@angular/core';
import { ListService } from '../../services/list.service';
import { ActivatedRoute } from '@angular/router';
import { List } from '../../entities/list';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.sass'],
})
export class ListComponent implements OnInit {

  constructor(private listService: ListService,
              private route: ActivatedRoute) { }

  static startCard: Card = null;
  static startList: List = null;

  @Input() title: string;
  @Input() id: string;
  @Input() wildcard = false;
  @Input() cards: Card[];
  @Output() cardClicked = new EventEmitter();
  @Output() cardAdded = new EventEmitter();
  @Output() listAdded = new EventEmitter();
  @Output() contentUpdated = new EventEmitter();
  @Input() data: List;

  ownerBoardId: string;
  iconCancel = faTimes;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.ownerBoardId = params.id;
    });
  }

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
    this.listService.updateListName(this.ownerBoardId, this.id, newName).subscribe(data => {
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

  dragOver(event: DragEvent): void {
    this.dragOverHandle(event);
  }

  dragStart(card: Card, list: List): void {
    this.dragStartHandle(card, list);
  }

  drop(targetCard: Card, targetList: List): void {
    this.dropHandle(targetCard, targetList, this.ownerBoardId);
    /*event.preventDefault();
    console.log({
      msg: 'card drop',
      start: { card, list },
      target: { card: this.listService.getDragStartCard(), listId: this.listService.getDragStartList() }
    });
    const dragStartCard = this.listService.getDragStartCard();

    const newStartList = {...this.listService.getDragStartList()};
    newStartList.cards = newStartList.cards.filter(item => item.id !== dragStartCard.id);

    const newTargetList = {...list};
    newTargetList.cards.push(this.listService.getDragStartCard());

    this.listService.updateList(this.ownerBoardId, newStartList.id, newStartList).subscribe(() => {
      this.listService.updateList(this.ownerBoardId, list.id, newTargetList).subscribe(() => {
        this.contentUpdated.emit();
      });
    });*/
  }

  dragStartHandle(card: Card, list: List): void {
    console.log({
      msg: 'dragStart',
      card,
      list
    });
    ListComponent.startCard = card;
    ListComponent.startList = list;
  }

  dragOverHandle(event: DragEvent): void {
    event.preventDefault();
  }

  dropHandle(targetCard: Card, targetList: List, boardId: string): void {
    console.log({
      msg: 'drop',
      start: {
        card: ListComponent.startCard,
        list: ListComponent.startList
      },
      target: {
        card: targetCard,
        list: targetList
      }
    });
    if (ListComponent.startCard && targetList) {
      const newStartList = {...ListComponent.startList};
      newStartList.cards = newStartList.cards.filter(card => card.id !== ListComponent.startCard.id);
      const newTargetList = {...targetList};
      if(ListComponent.startList.id === targetList.id) {
        console.log('Dropped to the same list');
      } else {
        newTargetList.cards = [...newTargetList.cards, ListComponent.startCard];

        this.listService.updateList(boardId, ListComponent.startList.id, newStartList).subscribe(() => {
          this.listService.updateList(boardId, targetList.id, newTargetList).subscribe(() => {
            this.handleContentUpdated();
          });
        });
      }
    } else if (!ListComponent.startCard && targetList && ListComponent.startList) {
      const newStartList = {...ListComponent.startList, position: targetList.position};
      const newTargetList = {...targetList, position: ListComponent.startList.position};

      this.listService.updateList(boardId, ListComponent.startList.id, newStartList).subscribe(() => {
        this.listService.updateList(boardId, targetList.id, newTargetList).subscribe(() => {
          this.handleContentUpdated();
        });
      });
    }
    return null;
  }

  handleListDeleteClicked(list: List): void {
    this.listService.deleteList(this.ownerBoardId, list.id)
      .subscribe(() => this.handleContentUpdated());
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
