export interface Player {
  id: 1 | 2;
  name: string;
  position: number;
  color: string;
}

export interface Challenge {
  type: 'truth' | 'dare';
  text: string;
  image?: string;
  level: 'mild' | 'spicy' | 'hot';
}

export interface Cell {
  id: number;
  type: 'normal' | 'truth' | 'dare' | 'sweet';
  challenge?: Challenge;
}
