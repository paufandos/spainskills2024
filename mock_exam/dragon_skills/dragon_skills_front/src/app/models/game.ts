export interface Game {
  id: string;
  name: string;
  description: string;
  width: number;
  height: number;
  minNumPlayers: number;
  maxNumPlayers: number;
  [key: string]: any;
}
