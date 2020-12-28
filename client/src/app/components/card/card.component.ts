import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.sass']
})
export class CardComponent implements OnInit {
  @Input() text: string;
  @Input() id: string;
  @Input() wildcard = false;
  @Output() cardAdded = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  handleCardAdded(name: string): void {
    this.cardAdded.emit(name);
  }
}

