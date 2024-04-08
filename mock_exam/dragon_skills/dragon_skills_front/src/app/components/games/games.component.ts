import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GameService } from '../../services/games/game.service';
import { Game } from '../../models/game';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Ng2BootstrapModule } from 'ng-bootstrap';
import { log } from 'console';

@Component({
  selector: 'app-games',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './games.component.html',
  styleUrl: './games.component.scss',
})
export class GamesComponent implements OnInit {
  @ViewChild('closeUpdateGameModalButton') closeUpdateGameModal!: ElementRef;
  @ViewChild('closeNewGameModalButton') closeNewGameModal!: ElementRef;

  games: Game[] = [];
  currentGame: Game = {
    id: '',
    name: '',
    description: '',
    width: 0,
    height: 0,
    minNumPlayers: 0,
    maxNumPlayers: 0,
  };
  newGame: Game = {
    id: '',
    name: '',
    description: '',
    width: 0,
    height: 0,
    minNumPlayers: 0,
    maxNumPlayers: 0,
  };

  numPlayersError = false;

  constructor(private gamesService: GameService) {}

  ngOnInit(): void {
    this.games = this.gamesService.getAllGames();
  }

  setCurrentGame(id: string) {
    const findedGame = this.games.find((game) => game.id === id);
    if (findedGame) {
      this.currentGame = findedGame;
      return;
    }
  }

  updateGame() {
    this.isNumPlayersError();
    if (this.numPlayersError) return;
    this.gamesService.updateGame(this.currentGame);
    this.closeUpdateGameModal.nativeElement.click();
    this.games = this.gamesService.getAllGames();
  }

  createGame() {
    this.isNumPlayersError();
    if (this.numPlayersError) return;
    this.newGame.id = Math.floor(Math.random() * 1000).toString();
    this.gamesService.createGame(this.newGame);
    this.closeNewGameModal.nativeElement.click();
    this.games = this.gamesService.getAllGames();
  }

  isNumPlayersError() {
    if (this.newGame.minNumPlayers <= this.newGame.maxNumPlayers) {
      this.numPlayersError = false;
      return;
    }

    this.numPlayersError = true;
  }
}
