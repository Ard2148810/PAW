import {Item} from './item';

export interface Checklist {
  id: string;
  description: string;
  items: Item[];
}
