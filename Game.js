import Deck from './Deck.js';
import Player from './Player.js';

class Game {
  constructor() {
    const deck = new Deck();
    deck.shuffle();

    const [hand1, hand2] = deck.deal();
    this.player1 = new Player('Player 1', hand1);
    this.player2 = new Player('Player 2', hand2);
  }

  play() {
    console.log("Starting the game of War!");

    while (this.player1.hand.length > 0 && this.player2.hand.length > 0) {
      const card1 = this.player1.playCard();
      const card2 = this.player2.playCard();

      console.log(`${this.player1.name} plays ${card1}`);
      console.log(`${this.player2.name} plays ${card2}`);

      if (card1.value > card2.value) {
        this.player1.addPoint();
        console.log(`${this.player1.name} wins this round`);
      } else if (card1.value < card2.value) {
        this.player2.addPoint();
        console.log(`${this.player2.name} wins this round`);
      } else {
        console.log("This round is a tie!");
      }

      console.log(`Score => ${this.player1.toString()}, ${this.player2.toString()}`);
      console.log('');
    }

    console.log("Game over!");
    if (this.player1.score > this.player2.score) {
      console.log(`${this.player1.name} wins the game with ${this.player1.score} points!`);
    } else if (this.player1.score < this.player2.score) {
      console.log(`${this.player2.name} wins the game with ${this.player2.score} points!`);
    } else {
      console.log("The game is a tie!");
    }
  }
}

const game = new Game();
game.play();