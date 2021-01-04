import { Injectable } from '@angular/core';
import {Label} from '../entities/label';

@Injectable({
  providedIn: 'root'
})
export class LabelService {

  activeBoardID: string;
  labelsData: Label[];

  constructor() { }

  newBoardActivated(boardId: string, labelData: Label[]): void {  // Called whenever a board is activated (on init)
    this.activeBoardID = boardId;
    this.labelsData = labelData;
  }

  getLabelDataById(labelId: string): Label {
    return this.labelsData.find(label => label.id === labelId);
  }
}
