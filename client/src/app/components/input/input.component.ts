import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.sass']
})
export class InputComponent implements OnInit {
  isFocused = false;

  @Input() label = 'Input';
  @Input() type = 'text';
  @Input() formControlName: string;

  constructor() { }

  ngOnInit(): void {
  }

  setFocused(value: boolean): void {
    this.isFocused = value;
  }

}
