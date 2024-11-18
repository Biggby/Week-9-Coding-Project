const chai = require("chai");
const assert = chai.assert;
const expect = chai.expect;
const Suits = require('./Suits.js');
const exp = require("constants");
const { error } = require("console");
const Faces = [ 'A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K' ];

// Card {
//   property suit;
//   property face;  
//
//   ctor(suit, face);
// 
//   function getValue();
//   function toString();
// }


describe('Card', () => {
  describe('#constructor', () => {
    it ('should take a suit and value', (done) => {
      /* Arrange */
      let expectedSuit = '♠';
      let expectedFace = 'A';

      /* Act */
      let card = new Card(expectedSuit, expectedFace);

      /* Assert */
      expect(card.suit).to.equal(expectedSuit);
      expect(card.face).to.equal(expectedFace);

      done();
    });

    it ('should throw Error if no parameters provided', (done) => {

      /* Arrange & Act */
      expect(() => {
        let card = new Card();
      }).to.throw(Error);

      done();

    });

    it ('should throw Error if suit is not valid', (done) => {
      /* Arrange */
    
      expect(() => {
        /* Act / Invoke */
        let card = new Card('B', 'K');
      
      /* Assert */
    }).to.throw(Error);
    
      done();
    });

    it('should throw Error if face is not valid', (done) => {
      /* Arrange */
      expect(() => {
          /* Act / Invoke */
          new Card('B', 'G');
      }).to.throw(Error);
      
      done();
   });
  });
  describe('#toString', () => {
    it('should return suit and card face', (done) => {
      /* Arrange */
      let suit = '♠';
      let face = 'A';
      let card = new Card(suit, face);
      let expectedString = '♠A';

      /* Act / Invoke */
      let result = card.toString();

      /* Assert */
      expect(result).to.equal(expectedString);

      done();
    });
  });

  describe('#getValue', () => {
    it('with ♠A should return 1', (done) => {
      /* Arrange */
      let card = new Card('♠', 'A');

      /* Act / Invoke */
      let value = card.getValue();

      /* Assert */
      expect(value).to.equal(1);

      done();
    });

    it('with ♠Q should return 10', (done) => {
      /* Arrange */
      let card = new Card('♠', 'Q');

      /* Act / Invoke */
      let value = card.getValue();

      /* Assert */
      expect(value).to.equal(10);

      done();
    });

    it('with ♠K should return 10', (done) => {
      /* Arrange */
      let card = new Card('♠', 'K');

      /* Act / Invoke */
      let value = card.getValue();

      /* Assert */
      expect(value).to.equal(10);

      done();
    });

    it('with ♠10 should return 10', (done) => {
      /* Arrange */
      let card = new Card('♠', '10');

      /* Act / Invoke */
      let value = card.getValue();

      /* Assert */
      expect(value).to.equal(10);

      done();
    });

    it('with ♠2 should return 2', (done) => {
      /* Arrange */
      let card = new Card('♠', '2');

      /* Act / Invoke */
      let value = card.getValue();

      /* Assert */
      expect(value).to.equal(2);

      done();
    });

    it('with ♠7 should return 7', (done) => {
      /* Arrange */
      let card = new Card('♠', '7');

      /* Act / Invoke */
      let value = card.getValue();

      /* Assert */
      expect(value).to.equal(7);

      done();
    });
  });
});

/**
 * Represents a standard playing card.
 */
class Card {
  /**
   * Creates a new player card.
   * @param {String} suit The suit of the card. Accepted values: '♠', '♥', '♣', '♦'
   * @param {String} face The face or value of the card. Accepted values: 'A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'
   */
  constructor(suit, face) {
    if (Suits.indexOf(suit) < 0) {
      throw new Error(`Invalid suit specified. Valid values are: ${Suits.join(', ')} `);
    }
    if ((typeof face === "undefined") || !face) {
      throw new Error(`Invalid face specified. Valid values are: ${Faces.join(', ')} `);
    }
    this.suit = suit;
    this.face = face;
  }

  /**
   * Calculates the value of the specified card.
   * @returns {Number} The numeric value of the card.
   */
  getValue() {
    if (this.face === 'A') return 1;
    if (['K', 'Q', 'J', '10'].includes(this.face)) return 10;
    return parseInt(this.face);
  }

  /**
   * Returns the string representation of the object.
   * @returns {String} The string representation of the object (e.g., '♠A' for the Ace of Spades)
   */
  toString() {
    return `${this.suit}${this.face}`;
  }
}

module.exports = {
  Card : Card,
  Faces : Faces
};