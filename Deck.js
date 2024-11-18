const chai = require("chai");
const assert = chai.assert;
const expect = chai.expect;
const Suits = require('./Suits.cjs');
const Faces = require('./Card.cjs').Faces;
const Card = require('./Card.cjs').Card;

// Deck {
//   ctor(cards);
// 
//   function draw();
//   function shuffle();
// 
//   function peek();
//   function toString();
// }

describe('Deck', () => {
  describe('#constructor', () => {
    it('with empty constructor will create a deck with 52 cards', () => {
      const deck = new Deck();
      expect(deck.peek().length).to.equal(52);
    });

    it('with empty constructor should initialize a standard deck', () => {
      const deck = new Deck();
      const cards = deck.peek();
      const Suits = ['♠', '♥', '♣', '♦'];
      const Faces = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
      expect(cards.length).to.equal(52);
      Suits.forEach(suit => {
        Faces.forEach(face => {
          expect(cards.some(card => card.suit === suit && card.face === face)).to.be.true;
        });
      });
    });

    it('with array of cards, should initialize cards to provided values', () => {
      const customCards = [new Card('♠', 'A'), new Card('♠', '2')];
      const deck = new Deck(customCards);
      expect(deck.peek()).to.deep.equal(customCards);
    });
  });

  describe('#shuffle', () => {
    it('with empty deck should not throw error', () => {
      const emptyDeck = new Deck([]);
      expect(() => emptyDeck.shuffle()).to.not.throw();
    });

    it('with one card should remain unshuffled', () => {
      const singleCardDeck = new Deck([new Card('♠', 'A')]);
      singleCardDeck.shuffle();
      expect(singleCardDeck.peek()).to.deep.equal([new Card('♠', 'A')]);
    });

    it('should not remove or alter any existing cards in the deck', () => {
      const deck = new Deck();
      const originalDeck = deck.peek().slice();
      deck.shuffle();
      expect(deck.peek().sort()).to.deep.equal(originalDeck.sort());
    });

    it('with multiple cards should change position of at least one card', () => {
      const deck = new Deck();
      const originalDeck = deck.peek().slice();
      deck.shuffle();
      expect(deck.peek()).to.not.deep.equal(originalDeck);
    });
  });

  describe('#draw', () => {
    it('with empty deck should return null', () => {
      const emptyDeck = new Deck([]);
      expect(emptyDeck.draw()).to.be.null;
    });

    it('should return card at the top of the deck', () => {
      const deck = new Deck([new Card('♠', 'A'), new Card('♠', '2')]);
      const topCard = deck.draw();
      expect(topCard.suit).to.equal('♠');
      expect(topCard.face).to.equal('A');
    });

    it('should remove card from deck', () => {
      const deck = new Deck([new Card('♠', 'A'), new Card('♠', '2')]);
      deck.draw();
      expect(deck.peek().length).to.equal(1);
      expect(deck.peek()[0].face).to.equal('2');
    });
  });
});

/**
 * Represents a deck of cards that can be shuffled or drawn.
 */
class Deck {
  // Private variable to store the cards
  #cards = [];

  constructor(cards = null) {
    if (cards) {
      this.#cards = cards;
    } else {
      this.#cards = this.#create();
    }
  }

  // Private method to create a standard 52-card deck
#create() {
    const Suits = ['♠', '♥', '♣', '♦'];
    const Faces = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    const deck = [];
    
    for (const suit of Suits) {
      for (const face of Faces) {
        deck.push(new Card(suit, face));
      }
    }
    return deck;
  }

  shuffle() {
    for (let i = this.#cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.#cards[i], this.#cards[j]] = [this.#cards[j], this.#cards[i]];
    }
  }

  peek() {
    return [...this.#cards]; // Returns a copy of the cards
  }

  draw() {
    return this.#cards.length ? this.#cards.shift() : null;
  }

  toString() {
    return this.#cards.map(card => card.toString()).join(', ');
  }
}


module.exports = Deck;