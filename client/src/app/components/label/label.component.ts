import {Component, Input, OnInit} from '@angular/core';
import { Label } from '../../entities/label';
import { LabelService } from '../../services/label.service';

@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.sass']
})
export class LabelComponent implements OnInit {
  @Input() id: string;
  @Input() wildcard: boolean;

  data: Label;

  constructor(private labelService: LabelService) { }

  ngOnInit(): void {
    this.data = this.labelService.getLabelDataById(this.id);
  }

  getElementStyleColor(): string {
    return `rgba(${this.data.color.r}, ${this.data.color.g}, ${this.data.color.b}, ${this.data.color.a})`;
  }

}

export interface RGBAColor {
  r: number;
  g: number;
  b: number;
  a: number;
}
