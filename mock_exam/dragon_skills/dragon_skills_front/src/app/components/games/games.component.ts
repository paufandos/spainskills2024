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
  @ViewChild('closeButton') closeUpdateModal!: ElementRef;
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
    this.gamesService.updateGame(this.currentGame);
    this.closeUpdateModal.nativeElement.click();
    this.games = this.gamesService.getAllGames();
  }
}
