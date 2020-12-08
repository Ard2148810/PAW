import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.sass'],
})
export class ListComponent implements OnInit {
  @Input() title: string;
  @Input() id: string;

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
}
