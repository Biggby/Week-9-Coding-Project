// tests.js
const chai = require("chai");
const Suits = require('./Suits.js');
const { Card, Faces } = require('./Card.js');
const Deck = require('./Deck.js');
const Player = require('./Player.js');



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
