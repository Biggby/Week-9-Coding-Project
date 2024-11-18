// tests.js
const chai = require("chai");
const Suits = require('./Suits.cjs');
const { Card, Faces } = require('./Card.cjs');
const Deck = require('./Deck.cjs');
const Player = require('./Player.cjs');



// Now write your tests here
const { expect, assert } = chai;

describe('Suits', () => {
  describe('#array', () => {
    it('should contain four values', (done) => {
      expect(Suits.length).to.equal(4);
      done();
    });
  });

 describe('Faces', () => {
    describe('#array', () => {
        it('should contain thirteen values', (done) => {
            expect(Faces.length).to.equal(13);
            done();
        });
    }); 
  }); 
});

// Other describe blocks for Card, Deck, Player, etc.
