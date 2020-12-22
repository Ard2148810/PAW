import { List } from './list';

export interface Board {
  id: string;
  name: string;
  description: string;
  owner: string;
  lists: List[];
  teamMembers: string[];
  isPublic: boolean;
}
