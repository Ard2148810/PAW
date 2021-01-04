import { List } from './list';
import {Label} from './label';

export interface Board {
  id: string;
  name: string;
  description: string;
  owner: string;
  lists: List[];
  teamMembers: string[];
  isPublic: boolean;
  labels: Label[];
}
