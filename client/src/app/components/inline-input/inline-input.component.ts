import { Component, Input, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-inline-input',
  templateUrl: './inline-input.component.html',
  styleUrls: ['./inline-input.component.sass']
})
export class InlineInputComponent implements OnInit {
  @ViewChild('valueContainer') valueContainer: ElementRef;
  @Input() value: string;
  @Output() valueChanged = new EventEmitter<string>();
  @Output() canceledChange = new EventEmitter<string>();
  isEditing = false;

  ngOnInit(): void {
  }

  setEditing(value: boolean): void {
    this.isEditing = value;
  }

  deactivate(): void {
    this.isEditing = false;
    this.valueContainer.nativeElement.blur();
  }

  handleEnter(event: KeyboardEvent): void {
    event.preventDefault();                                     // Prevent adding new line
    this.handleConfirm();
  }

  handleEscape(event: KeyboardEvent): void {
    this.handleCancel();
  }

  handleConfirm(): void {
    this.value = this.valueContainer.nativeElement.innerText;
    this.deactivate();
    this.valueChanged.emit(this.value);
  }

  handleCancel(): void {
    this.valueContainer.nativeElement.innerText = this.value;  // Reset value
    this.deactivate();
    this.canceledChange.emit(this.value);
  }

}
