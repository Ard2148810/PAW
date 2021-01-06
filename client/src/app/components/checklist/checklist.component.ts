import {Component, Input, OnInit, OnChanges, Output, EventEmitter, SimpleChanges} from '@angular/core';
import { Checklist } from '../../entities/checklist';
import { Item } from '../../entities/item';
import { ChecklistService } from '../../services/checklist.service';
import {ActivatedRoute} from '@angular/router';
import {ItemService} from '../../services/item.service';
import {faTimes} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.sass']
})
export class ChecklistComponent implements OnInit, OnChanges {

  @Input() data: Checklist;
  @Input() ownerListId: string;
  @Input() ownerCardId: string;
  @Output() contentUpdated = new EventEmitter();

  ownerBoardId: string;
  iconCancel = faTimes;

  constructor(
    private checklistService: ChecklistService,
    private route: ActivatedRoute,
    private itemService: ItemService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.ownerBoardId = params.id;
    });
    console.log('checklist init');
    console.log(this.data);
  }

  ngOnChanges(): void {
    this.ngOnInit();
  }

  handleNewChecklistItem(itemDescription: string): void {
    console.log(`Add new checklist item: ${itemDescription}`);
    this.itemService.addItem(
      this.ownerBoardId,
      this.ownerListId,
      this.ownerCardId,
      this.data.id,
      itemDescription).subscribe(() => {
        this.contentUpdated.emit();
    });
  }

  handleChecklistItemDeleted(removedItem: Item): void {
    this.data.items = this.data.items.filter(item => item.id !== removedItem.id);
    console.log(this.data.items);
    this.checklistService.updateChecklist(
      this.ownerBoardId,
      this.ownerListId,
      this.ownerCardId,
      this.data.id,
      this.data).subscribe((data) => {
        console.log({ msg: 'item deleted', data });
    });
  }

  handleChecklistItemUpdated(updatedItem): void {
    this.data.items[this.data.items.findIndex(item => item.id === updatedItem.id)] = updatedItem;
    this.checklistService.updateChecklist(
      this.ownerBoardId,
      this.ownerListId,
      this.ownerCardId,
      this.data.id,
      this.data).subscribe(() => {
        console.log('updated');
    });
  }

  handleChecklistUpdated(newDescription: string): void {
    this.data.description = newDescription;
    this.checklistService.updateChecklist(
      this.ownerBoardId,
      this.ownerListId,
      this.ownerCardId,
      this.data.id,
      this.data).subscribe(() => {
        console.log('checklist updated');
      });
  }

  handleDeleteChecklistClicked(checklist: Checklist): void {
    this.checklistService.deleteChecklist(
      this.ownerBoardId,
      this.ownerListId,
      this.ownerCardId,
      checklist.id
    ).subscribe(() => {
      this.contentUpdated.emit();
    });
  }
}
