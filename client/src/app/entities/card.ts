import {Checklist} from './checklist';

export interface Card {
  id: string;
  name: string;
  description: string;
  members: string[];
  date?: Date;
  labels: string[]; // IDs
  checklists: Checklist[];
}
