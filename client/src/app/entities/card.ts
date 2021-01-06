import { Checklist } from './checklist';
import { Comment } from './comment';

export interface Card {
  id: string;
  name: string;
  description: string;
  members: string[];
  date: string;
  labels: string[]; // IDs
  checklists: Checklist[];
  comments: Comment[];
}
