import chai from "chai";
const { assert, expect } = chai;
import Suits from "./Suits.js";
import Faces from "./Card.js";
import Card from "./Card.js";
import Deck from "./Deck.js"
import exp from "constants";
import { error } from "console";

 
// Player {
//   ctor(name, hand);
// 
//   function flip();
//   function add();
//   function drawCardFromDeck();
// 
//   function hand();
//   function toString();
// }

describe('Player', () => {
  describe('#constructor', () => {
    it ('with empty constructor will throw Error', (done) => {
       // Expect constructor without a name to throw an error
       expect(() => new Player()).to.throw(Error, "Player must have a name");
       done();
    });

    it ('with name sets name property', (done) => {
       // Create a player with a name and expect the name property to be set
       const player = new Player("Player 1");
       /* Act / Invoke */
       expect(player.name).to.equal("Player 1");
       /* Assert */
       expect(player.getHand()).to.deep.equal([]); // Expect hand to be initialized as an empty array
       done();
    });

    it ('with cards will initialize hand', (done) => {
       // Arrange an initial hand and expect the player’s hand to match after initialization
       const hand = [new Card('♠', 'A'), new Card('♠', '2')];
       /* Act / Invoke */
       const player = new Player("Bob", hand);
       /* Assert */
       expect(player.name).to.equal("Bob"); // Expects a player's name to be set
       expect(player.getHand()).to.deep.equal(hand); // Expect hand to match the standard hand array ()
       done();
    });
  });

  describe('#flip', () => {
    it ('with empty hand should return null', (done) => {
      // Flip method should return null when hand is empty
      /* Arrange */
      const player = new Player("Player 1");
      /* Act / Invoke */
      const flippedCard = player.flip();
      /* Assert */
      expect(flippedCard).to.equal(null); // Expect null because the hand is empty
      done();
    });

    it('should return first card from the player\'s hand', (done) => {
      // Flip should return the first card from the hand and remove it
      /* Arrange */
      const card1 = new Card('♠', 'A');
      const card2 = new Card('♥', 'K');
      const player = new Player("Player 1", [card1, card2]); // creates a player w/ cards
    
      /* Act / Invoke */
      const flippedCard = player.flip();
    
      /* Assert */
      expect(flippedCard).to.deep.equal(card1); // Deals/Shows first card
      done();
    });

    it ('should remove card from players hand', (done) => {
      /* Arrange */
      const card1 = new Card('♠', 'A');
      const card2 = new Card('♥', 'K');
      const player = new Player("Player 1", [card1, card2]); // Initialize with cards in hand
    
      /* Act / Invoke */
      const flippedCard = player.flip();
    
      /* Assert */
      expect(flippedCard).to.deep.equal(card1); 
      expect(player.getHand()).to.not.include(card1); // Expects player's hand to not have card 1
      expect(player.getHand()).to.deep.equal([card2]); // expects players hand to not have card 2
      done();
    });
  });
  describe('#add', () => {
    it('with null card returns existing hand count', (done) => {
      /* Arrange */
      const card1 = new Card('♠', 'Faces');
      const card2 = new Card('♥', 'Faces');
      const player = new Player("Player 1", [card1, card2]);
      const startHandCount = player.getHand().length;
      
      /* Act / Invoke */
      const handCount = player.add(null);  //pass null
      
      /* Assert */
      expect(handCount).to.equal(startHandCount);  // should be null // Zero
      
      done();
    });
  
    it('with valid card adds card to hand', (done) => {
      /* Arrange */
      const card1 = new Card('♠', 'A');
      const card2 = new Card('♥', 'K');
      const card3 = new Card('♣', 'Q');
      const player = new Player("Player 1", [card1, card2]);
      const startHandCount = player.getHand().length;
      
      /* Act / Invoke */
      const handCount = player.add(card3);  // Adds a valid card
      
      /* Assert */
      expect(handCount).to.equal(startHandCount + 1);  // Hand count should increase by 1
      expect(player.getHand()).to.deep.equal([card1, card2, card3]);  // Hand should include the new card that was dealt
      
      done();
    });
  
    it('with empty hand adds card to hand', (done) => {
      /* Arrange */
      const card1 = new Card('♠', 'A');
      const player = new Player("Player 1", []);  // Start with empty hand
      
      /* Act / Invoke */
      const handCount = player.add(card1);  // Add a card to the empty hand
      
      /* Assert */
      expect(handCount).to.equal(1);  // Hand count should be 1
      expect(player.getHand()).to.deep.equal([card1]);  // Hand should contain the added card
      
      done();
    });
  
    it('with non-Card object/instance doesn\'t add card to hand', (done) => {
      /* Arrange */
      const nonCard = {};  // Create a non-Card object
      const card1 = new Card('♠', 'A');
      const player = new Player("Player 1", [card1]);
  
      /* Act / Invoke */
      const handCount = player.add(nonCard);  // Try to add a non-Card object
      
      /* Assert */
      expect(handCount).to.equal(1);  // Hand count should remain 1 (no card added)
      expect(player.getHand()).to.deep.equal([card1]);  // Hand should still contain the original card
      
      done();
    });
  });
  describe('#drawCardFromDeck', () => {
    it('with empty deck returns false', (done) => {
      /* Arrange */
      const emptyDeck = new Deck();
      emptyDeck.cards = []; // Make sure the deck is empty
      const player = new Player("Player 1");
  
      /* Act / Invoke */
      const playerDraw = player.drawCardFromDeck(emptyDeck);
  
      /* Assert */
      assert.equal(playerDraw, false);
  
      done();
    });
  
    it('with non-Deck object/instance returns false', (done) => {
      /* Arrange */
      const player = new Player("Player 1");
      const invalidObject = {};  // Not a Deck instance
  
      /* Act / Invoke */
      const playerDraw = player.drawCardFromDeck(invalidObject);
  
      /* Assert */
      assert.equal(playerDraw, false);
  
      done();
    });
  
    it('with valid deck and empty hand adds drawn card to player\'s hand', (done) => {
      /* Arrange */
      const deck = new Deck();
      deck.cards = [new Card('♠', 'A')]; // Deck with one card
      const player = new Player("Player 1");
  
      /* Act / Invoke */
      const playerDraw = player.drawCardFromDeck(deck);
  
      /* Assert */
      assert.strictEqual(playerDraw, true);  // Check that draw was successful
      expect(player.getHand()).to.deep.equal([new Card('♠', 'A')]);  // Player's hand should contain the drawn card
  
      done();
    });
  
    it('with valid deck and existing hand adds drawn card to player\'s hand', (done) => {
      /* Arrange */
      const card1 = new Card('♦', 'Q');  // Card to be drawn
      const card2 = new Card('♥', 'K');  // Card to remain in the deck
      const card3 = new Card('♠', 'A');  // Existing card in player's hand
      const deck = new Deck();
      deck.cards = [card1, card2];       // Deck is initialized with two cards
      const player = new Player("Player 1", [card3]);  // Player starts with one card in hand (card3)

      /* Act / Invoke */
      const playerDrawSuccess = player.drawCardFromDeck(deck);

      /* Assert */
      expect(playerDrawSuccess).to.equal(true);              
      expect(deck.cards.length).to.equal(1);                 
      expect(deck.cards[0]).to.deep.equal(card2);            
      expect(player.getHand()).to.deep.equal([card3, card1]);

      done();
  });
});
  
});

/**
 * Represents a card player.
 */
class Player {
  constructor(name, hand = []) {
    if (!name) {
      throw new Error("Player must have a name");
    }
    this.name = name;
    this.hand = hand; // Initialize hand if provided, or default to an empty array
  }

  /**
   * Returns the cards currently in the player's hand.
   * @returns {Card[]} The cards currently in the player's hand.
   */
  getHand() {
    return this.hand;
  }

  /**
   * Returns the first card in the player's hand. Once flipped, the card is removed from the player's hand.
   * @returns {Card|null} The card that was at the top of the hand, or null if the hand is empty.
   */
  flip() {
    return this.hand.length > 0 ? this.hand.shift() : null;
  }

  /**
   * Adds the specified card to the player's hand.
   * @param {Card} card - The card to add.
   * @returns {Number} The number of cards in the player's hand after adding the card.
   */
  add(card) {
    if (card === null) {
      return this.hand.length;  // Return the current hand length if null is passed
    }

    if (card instanceof Card) {
      this.hand.push(card);  // Only add Card instances
    }

    return this.hand.length;  // Return the updated hand count
  }

  /**
   * Draws a card from the deck and adds it to the player's hand.
   * @param {Deck} deck - The deck to draw the card from.
   * @returns {Boolean} True if a card was drawn and added, false if the deck was empty.
   */
  drawCardFromDeck(deck) {
    if (!(deck instanceof Deck) || deck.cards.length === 0) {
      return false;
    }
  
    // Draw the first card from the deck
    const drawnCard = deck.cards.shift();
    this.hand.push(drawnCard);
    return true;
  }
  

  /**
   * Returns the string representation of the object.
   * @returns {String} The string representation of the object
   */
  toString() {
    return `${this.name} has ${this.hand.length} cards in hand.`;
  }
}


export default Player;