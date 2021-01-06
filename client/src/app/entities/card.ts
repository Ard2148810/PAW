import {Checklist} from './checklist';

export interface Card {
  id: string;
  name: string;
  description: string;
  members: string[];
  date: string;
  labels: string[]; // IDs
  checklists: Checklist[];
}
