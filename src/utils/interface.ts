export interface ICard {
  level: 0 | 1 | 2 | 3 | 4 | 5;
  name: string;
  entanglement: string[];
  star: 1 | 2 | 3;
  img?: string;
  avatar?: string;
}
