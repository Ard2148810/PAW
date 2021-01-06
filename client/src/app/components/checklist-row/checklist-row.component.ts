import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Item } from '../../entities/item';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-checklist-row',
  templateUrl: './checklist-row.component.html',
  styleUrls: ['./checklist-row.component.sass']
})
export class ChecklistRowComponent implements OnInit {

  @Input() data: Item;
  @Output() itemUpdated = new EventEmitter();
  @Output() itemDeleted = new EventEmitter();

  iconCancel = faTimes;

  constructor() { }

  ngOnInit(): void {
  }

  descriptionChanged(description: string): void {
    this.data.description = description;
  }

  handleDeleteClicked(data: Item): void {
    this.itemDeleted.emit(data);
  }

  handleItemUpdated(data: Item): void {
    this.itemUpdated.emit(data);
  }
}
