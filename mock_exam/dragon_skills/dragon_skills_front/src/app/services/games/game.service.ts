import { Injectable } from '@angular/core';
import { Game } from '../../models/game';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  constructor() {}

  getAllGames() {
    return this.games;
  }

  updateGame(gameToUpdate: Game) {
    const index = this.games.findIndex((game) => game.id === gameToUpdate.id);
    this.games[index] = { ...gameToUpdate };
  }

  games: Game[] = [
    {
      id: Math.floor(Math.random() * 100).toString(),
      name: 'Monopoly',
      description:
        'A classic board game where players buy and trade properties to build wealth.',
      width: 20,
      height: 20,
      minNumPlayers: 2,
      maxNumPlayers: 8,
    },
    {
      id: Math.floor(Math.random() * 100).toString(),
      name: 'Chess',
      description:
        "A strategic game where two players compete to checkmate the opponent's king.",
      width: 0,
      height: 0,
      minNumPlayers: 2,
      maxNumPlayers: 2,
    },
    {
      id: Math.floor(Math.random() * 100).toString(),
      name: 'Scrabble',
      description:
        'A word game where players score points by placing tiles with letters onto a grid.',
      width: 15,
      height: 15,
      minNumPlayers: 2,
      maxNumPlayers: 4,
    },
    {
      id: Math.floor(Math.random() * 100).toString(),
      name: 'Catan',
      description:
        'A game where players collect and trade resources to build settlements, cities, and roads.',
      width: 0,
      height: 0,
      minNumPlayers: 3,
      maxNumPlayers: 4,
    },
    {
      id: Math.floor(Math.random() * 100).toString(),
      name: 'Poker',
      description:
        'A card game where players bet on the strength of their hand.',
      width: 0,
      height: 0,
      minNumPlayers: 2,
      maxNumPlayers: 10,
    },
    {
      id: Math.floor(Math.random() * 100).toString(),
      name: 'Jenga',
      description:
        'A game where players take turns removing one block at a time from a tower and balance it on top.',
      width: 0,
      height: 0,
      minNumPlayers: 1,
      maxNumPlayers: 0,
    },
    {
      id: Math.floor(Math.random() * 100).toString(),
      name: 'Checkers',
      description:
        "A strategy game where two players compete to capture all of the opponent's pieces.",
      width: 0,
      height: 0,
      minNumPlayers: 2,
      maxNumPlayers: 2,
    },
    {
      id: Math.floor(Math.random() * 100).toString(),
      name: 'Twister',
      description:
        'A physical game where players place their hands and feet on colored spots on a mat.',
      width: 0,
      height: 0,
      minNumPlayers: 2,
      maxNumPlayers: 0,
    },
    {
      id: Math.floor(Math.random() * 100).toString(),
      name: 'Risk',
      description:
        'A game where players aim to conquer territories and eliminate opponents.',
      width: 0,
      height: 0,
      minNumPlayers: 2,
      maxNumPlayers: 6,
    },
    {
      id: Math.floor(Math.random() * 100).toString(),
      name: 'Battleship',
      description:
        "A game where players try to sink each other's ships by guessing the coordinates of their opponent's fleet.",
      width: 10,
      height: 10,
      minNumPlayers: 2,
      maxNumPlayers: 2,
    },
    {
      id: Math.floor(Math.random() * 100).toString(),
      name: 'Trivial Pursuit',
      description:
        'A trivia game where players answer questions to earn wedges and move closer to the center of the board.',
      width: 0,
      height: 0,
      minNumPlayers: 2,
      maxNumPlayers: 6,
    },
    {
      id: Math.floor(Math.random() * 100).toString(),
      name: 'Backgammon',
      description:
        'A game where players move their pieces around a board based on the roll of two dice.',
      width: 0,
      height: 0,
      minNumPlayers: 2,
      maxNumPlayers: 2,
    },
    {
      id: Math.floor(Math.random() * 100).toString(),
      name: 'Pictionary',
      description:
        'A game where players draw pictures to guess words or phrases.',
      width: 0,
      height: 0,
      minNumPlayers: 3,
      maxNumPlayers: 0,
    },
    {
      id: Math.floor(Math.random() * 100).toString(),
      name: 'Uno',
      description:
        'A card game where players match cards by color or number to be the first to get rid of all their cards.',
      width: 0,
      height: 0,
      minNumPlayers: 2,
      maxNumPlayers: 10,
    },
    {
      id: Math.floor(Math.random() * 100).toString(),
      name: 'Connect Four',
      description:
        'A game where players take turns dropping colored discs into a grid to connect four of their own color.',
      width: 7,
      height: 6,
      minNumPlayers: 2,
      maxNumPlayers: 2,
    },
    {
      id: Math.floor(Math.random() * 100).toString(),
      name: 'Dominoes',
      description:
        'A game where players take turns placing tiles with matching numbers to create a chain.',
      width: 0,
      height: 0,
      minNumPlayers: 2,
      maxNumPlayers: 4,
    },
    {
      id: Math.floor(Math.random() * 100).toString(),
      name: 'Guess Who?',
      description:
        "A game where players ask yes or no questions to guess the character on their opponent's card.",
      width: 0,
      height: 0,
      minNumPlayers: 2,
      maxNumPlayers: 2,
    },
    {
      id: Math.floor(Math.random() * 100).toString(),
      name: 'Mahjong',
      description:
        'A game where players match tiles to remove them from a board.',
      width: 0,
      height: 0,
      minNumPlayers: 3,
      maxNumPlayers: 4,
    },
    {
      id: Math.floor(Math.random() * 100).toString(),
      name: 'Clue',
      description:
        'A murder mystery game where players move around the board to collect clues and solve the crime.',
      width: 0,
      height: 0,
      minNumPlayers: 3,
      maxNumPlayers: 6,
    },
    {
      id: Math.floor(Math.random() * 100).toString(),
      name: 'Boggle',
      description:
        'A word game where players try to find as many words as possible in a grid of letters.',
      width: 4,
      height: 4,
      minNumPlayers: 1,
      maxNumPlayers: 0,
    },
    {
      id: Math.floor(Math.random() * 100).toString(),
      name: 'Tic Tac Toe',
      description:
        'A game where players take turns marking X or O in a 3x3 grid to get three in a row.',
      width: 3,
      height: 3,
      minNumPlayers: 2,
      maxNumPlayers: 2,
    },
    {
      id: Math.floor(Math.random() * 100).toString(),
      name: 'Yahtzee',
      description:
        'A dice game where players score points by rolling combinations and filling in a scorecard.',
      width: 0,
      height: 0,
      minNumPlayers: 1,
      maxNumPlayers: 0,
    },
    {
      id: Math.floor(Math.random() * 100).toString(),
      name: 'Rummy',
      description:
        'A card game where players aim to form sets or runs of cards.',
      width: 0,
      height: 0,
      minNumPlayers: 2,
      maxNumPlayers: 6,
    },
    {
      id: Math.floor(Math.random() * 100).toString(),
      name: 'Carcassonne',
      description:
        'A game where players build the area surrounding a medieval city.',
      width: 0,
      height: 0,
      minNumPlayers: 2,
      maxNumPlayers: 5,
    },
    {
      id: Math.floor(Math.random() * 100).toString(),
      name: 'Skip-Bo',
      description:
        'A card game where players use skill and strategy to create sequential stacks of cards.',
      width: 0,
      height: 0,
      minNumPlayers: 2,
      maxNumPlayers: 6,
    },
    {
      id: Math.floor(Math.random() * 100).toString(),
      name: 'Mancala',
      description: 'A family of board games played around the world.',
      width: 0,
      height: 0,
      minNumPlayers: 2,
      maxNumPlayers: 2,
    },
    {
      id: Math.floor(Math.random() * 100).toString(),
      name: 'Sequence',
      description:
        'A game where players take turns placing chips on a board to create a sequence of five.',
      width: 0,
      height: 0,
      minNumPlayers: 2,
      maxNumPlayers: 12,
    },
    {
      id: Math.floor(Math.random() * 100).toString(),
      name: 'Bananagrams',
      description:
        'A fast and fun word game that requires no pencil, paper, or board.',
      width: 0,
      height: 0,
      minNumPlayers: 1,
      maxNumPlayers: 0,
    },
    {
      id: Math.floor(Math.random() * 100).toString(),
      name: 'Mastermind',
      description:
        'A code-breaking game where players try to guess the pattern in a limited number of attempts.',
      width: 0,
      height: 0,
      minNumPlayers: 2,
      maxNumPlayers: 2,
    },
    {
      id: Math.floor(Math.random() * 100).toString(),
      name: 'Othello',
      description:
        "A strategy game where players take turns placing their colored discs to capture the opponent's discs.",
      width: 0,
      height: 0,
      minNumPlayers: 2,
      maxNumPlayers: 2,
    },
    {
      id: Math.floor(Math.random() * 100).toString(),
      name: 'Pandemic',
      description:
        'A cooperative board game where players work together to stop the spread of diseases.',
      width: 0,
      height: 0,
      minNumPlayers: 2,
      maxNumPlayers: 4,
    },
    {
      id: Math.floor(Math.random() * 100).toString(),
      name: 'Sorry!',
      description:
        "A game where players try to travel around the board with their pieces and send opponents' pieces back to the start.",
      width: 0,
      height: 0,
      minNumPlayers: 2,
      maxNumPlayers: 4,
    },
    {
      id: Math.floor(Math.random() * 100).toString(),
      name: 'Codenames',
      description:
        'A social word game where two teams compete to see who can make contact with all of their agents first.',
      width: 0,
      height: 0,
      minNumPlayers: 4,
      maxNumPlayers: 0,
    },
    {
      id: Math.floor(Math.random() * 100).toString(),
      name: 'Crazy Eights',
      description:
        'A shedding-type card game where players try to be the first to get rid of all their cards.',
      width: 0,
      height: 0,
      minNumPlayers: 2,
      maxNumPlayers: 0,
    },
    {
      id: Math.floor(Math.random() * 100).toString(),
      name: 'Operation',
      description:
        'A dexterity game where players perform surgeries on a patient without setting off a buzzer.',
      width: 0,
      height: 0,
      minNumPlayers: 1,
      maxNumPlayers: 0,
    },
    {
      id: Math.floor(Math.random() * 100).toString(),
      name: 'Boggle',
      description:
        'A word game where players try to find as many words as possible in a grid of letters.',
      width: 0,
      height: 0,
      minNumPlayers: 1,
      maxNumPlayers: 0,
    },
    {
      id: Math.floor(Math.random() * 100).toString(),
      name: 'Tic Tac Toe',
      description:
        'A game where players take turns marking X or O in a 3x3 grid to get three in a row.',
      width: 0,
      height: 0,
      minNumPlayers: 2,
      maxNumPlayers: 2,
    },
    {
      id: Math.floor(Math.random() * 100).toString(),
      name: 'Yahtzee',
      description:
        'A dice game where players score points by rolling combinations and filling in a scorecard.',
      width: 0,
      height: 0,
      minNumPlayers: 1,
      maxNumPlayers: 0,
    },
    {
      id: Math.floor(Math.random() * 100).toString(),
      name: 'Rummy',
      description:
        'A card game where players aim to form sets or runs of cards.',
      width: 0,
      height: 0,
      minNumPlayers: 2,
      maxNumPlayers: 6,
    },
    {
      id: Math.floor(Math.random() * 100).toString(),
      name: 'Carcassonne',
      description:
        'A game where players build the area surrounding a medieval city.',
      width: 0,
      height: 0,
      minNumPlayers: 2,
      maxNumPlayers: 5,
    },
    {
      id: Math.floor(Math.random() * 100).toString(),
      name: 'Skip-Bo',
      description:
        'A card game where players use skill and strategy to create sequential stacks of cards.',
      width: 0,
      height: 0,
      minNumPlayers: 2,
      maxNumPlayers: 6,
    },
    {
      id: Math.floor(Math.random() * 100).toString(),
      name: 'Mancala',
      description: 'A family of board games played around the world.',
      width: 0,
      height: 0,
      minNumPlayers: 2,
      maxNumPlayers: 2,
    },
    {
      id: Math.floor(Math.random() * 100).toString(),
      name: 'Sequence',
      description:
        'A game where players take turns placing chips on a board to create a sequence of five.',
      width: 0,
      height: 0,
      minNumPlayers: 2,
      maxNumPlayers: 12,
    },
  ];
}
