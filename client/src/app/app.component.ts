import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'client';
  text = 'Test text';

  modalActive = false;

  toggleModal(): void {
    this.modalActive = !this.modalActive;
  }
}
